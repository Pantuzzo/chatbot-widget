#!/bin/bash

# === Configuration ===
ALLOWED_USERS=("Igor Costa")  # List of users allowed to create major versions
CURRENT_USER=$(git config user.name)  # Get the current user from Git configuration
REPO_OWNER="emcash-team"  # GitHub repository owner
REPO_NAME="wealthui"  # GitHub repository name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)  # Get the current git branch
REMOTE_BRANCH="release"  # Remote branch name to pull from

# === Constants ===
RELEASE_BRANCH_PREFIX="release/v"
RELEASE_PR_PREFIX="Release v"
RELEASE_COMMIT_PREFIX="chore: increasing the version to"

# Trust the current directory to avoid "dubious ownership" errors
git config --global --add safe.directory "$(pwd)"

# Check if NPM_TOKEN is set, if not, try to get from .npmrc
if [ -z "$NPM_TOKEN" ]; then
  if [ -f ".npmrc" ]; then
    # Extract the auth token from .npmrc (looks for :_authToken=...)
    NPM_TOKEN=$(grep -oP '(?<=:_authToken=).*' .npmrc | head -n1)
    export NPM_TOKEN
  fi
fi

# === Interrupt (Ctrl+C) ===
cleanup_and_exit() {
  print_colored "43;30" "\n⏺ Restaurando arquivos ao estado original..."  # Print restoring message
  
  git reset --hard >/dev/null 2>&1  # Restore all tracked files
 [ -n "$TAG_CREATED" ] && { git tag -d "v$NEW_VERSION" >/dev/null 2>&1; git push origin ":refs/tags/v$NEW_VERSION" >/dev/null 2>&1; }  # Delete created tag if any

  # Return to the REMOTE BRANCH branch
  print_colored "44;97" "\nVoltando para a branch anterior: $CURRENT_BRANCH..."
  git checkout "$CURRENT_BRANCH" || { print_colored "41;97" "\nErro ao voltar para $CURRENT_BRANCH."; exit 1; }

  git rebase --abort >/dev/null 2>&1 || true  # Abort any ongoing rebase
  # Delete the created branch
  # print_colored "44;97" "\nExcluindo a branch local $NEW_BRANCH..."
  # git branch -D "$NEW_BRANCH" >/dev/null 2>&1 || { print_colored "41;97" "\nErro ao excluir a branch $NEW_BRANCH."; exit 1; }

  print_colored "41;97" "\nAlterações desfeitas."  # Print changes undone message
  exit 1
}

# === Functions ===

# Print colored text to the terminal
print_colored() {
  echo -e "\033[$1m$2\033[0m"
}

# Prompt user to select the version type (patch, minor, or major)
select_version() {
  PS3=$'\nEscolha uma opção [1-3]: '  # Prompt message
  COLUMNS=1
  options=("Patch (correção de bugs, alterações pequenas)"
           "Minor (novas funcionalidades, compatível com versões anteriores)"
           "Major (alterações incompatíveis com versões anteriores)")

  select opt in "${options[@]}"; do
      case $opt in
          "Patch (correção de bugs, alterações pequenas)")
              VERSION_TYPE="patch"  # Set version type to patch
              break ;;
          "Minor (novas funcionalidades, compatível com versões anteriores)")
              VERSION_TYPE="minor"  # Set version type to minor
              break ;;
          "Major (alterações incompatíveis com versões anteriores)")
              if [[ ! " ${ALLOWED_USERS[@]} " =~ " ${CURRENT_USER} " ]]; then  # Check if user is allowed to create major versions
                  print_colored "41;97" "\nVocê não tem permissão para criar versões major."
                  print_colored "41;97" "Usuário atual: $CURRENT_USER"
                  continue
              fi
              VERSION_TYPE="major"  # Set version type to major
              break ;;
          *) print_colored "41;97" "\nOpção inválida. Por favor, escolha uma opção válida." ;;
      esac
  done
}

# Generate a template for the changelog if it doesn't exist
generate_changelog_template() {
    if [ ! -f CHANGELOG.md ]; then
        echo -e "# Changelog 📜\n\n> Project Description: This repository contains the components for the wealthui project, used in various applications. Here you can see the changes made over time.\n\n---\n\n## Versions\n" > CHANGELOG.md
    fi
}

# Format the list of contributors in the credits section
format_credits() {
  local -n usernames=$1
  local count=${#usernames[@]}

  if [ "$count" -eq 0 ]; then
    echo ""
  elif [ "$count" -eq 1 ]; then
    echo "@${usernames[0]}"
  elif [ "$count" -eq 2 ]; then
    echo "@${usernames[0]} and @${usernames[1]}"
  else
    local last="@${usernames[$((count-1))]}"
    local others=("${usernames[@]:0:$((count-1))}")
    local joined=""
    for user in "${others[@]}"; do
      joined+=$(printf "@%s, " "$user")
    done
    joined="${joined%, }"
    echo "$joined and $last"
  fi
}

# Get the list of contributors from commit history
get_usernames_from_commits() {
  local shas=$(git log "$LAST_TAG"..HEAD --pretty=format:"%H")
  local seen=()

  for sha in $shas; do
    response=$(curl -s -H "Authorization: token $NPM_TOKEN" \
      https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/commits/$sha)

    username=$(echo "$response" | jq -r '.author.login // empty')
    if [[ -n "$username" && ! " ${seen[*]} " =~ " $username " ]]; then
      seen+=("$username")
    fi
  done

  format_credits seen
}

# Get a list of merged pull requests
get_merged_prs() {
  local prs=$(curl -s -H "Authorization: token $NPM_TOKEN" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/pulls?state=closed&base=$REMOTE_BRANCH&per_page=100")

  local merged=()

  while IFS='|' read -r number title sha; do
    if [[ "$title" == $RELEASE_PR_PREFIX* ]]; then
      continue
    fi

    if git merge-base --is-ancestor "$sha" HEAD && \
       { [ -z "$LAST_TAG" ] || ! git merge-base --is-ancestor "$sha" "$LAST_TAG"; }; then
      merged+=("- $title [#${number}](https://github.com/$REPO_OWNER/$REPO_NAME/pull/$number)")
    fi
  done < <(echo "$prs" | jq -r '
    .[] |
    select(.merged_at != null and .merge_commit_sha != null) |
    "\(.number)|\(.title | gsub("[\n\r]"; " "))|\(.merge_commit_sha)"
  ')

  printf "%s\n" "${merged[@]}"
}

# Update the changelog with commits, pull requests, and credits
update_changelog() {
    if [ -z "$LAST_TAG" ]; then
        FULL_LOG=$(git log --pretty=format:"%s" --no-merges)
    else
        FULL_LOG=$(git log "$LAST_TAG"..HEAD --pretty=format:"%s" --no-merges)
    fi

    FILTERED_LOG=$(echo "$FULL_LOG" | grep -E '^(feat|fix|refactor|perf)' | grep -v "^$RELEASE_COMMIT_PREFIX" || echo "No relevant commits since last release")
    MARKDOWN_LOG=$(echo "$FILTERED_LOG" | sed 's/^/- /')

    RELEASE_COMMITS=$(git log "$LAST_TAG"..HEAD --pretty=format:"%s|%h|%H|%an" --no-merges | \
      grep -v "^$RELEASE_COMMIT_PREFIX" | \
      awk -v repo="$REPO_OWNER/$REPO_NAME" -F'|' '{ printf("- %s ([%s](https://github.com/%s/commit/%s) by %s)\n", $1, $2, repo, $3, $4) }')

    MERGED_PRS=$(get_merged_prs)
    CREDIT_LIST=$(get_usernames_from_commits)

    RELEASE_BODY=$'### Pull Requests\n'"$MERGED_PRS"$'\n\n### Commits\n'"$RELEASE_COMMITS"$'\n\n### Contributions\nThis version had contributions from: '"$CREDIT_LIST"$''

    CHANGELOG_ENTRY="### [v$NEW_VERSION] - $(date +%Y-%m-%d)\n\n$MARKDOWN_LOG\n"

    awk -v entry="$CHANGELOG_ENTRY" '
      BEGIN { added = 0 }
      /^## Versions/ {
        print; print ""; print entry; added = 1; next
      }
      { print }
      END {
        if (!added) {
          print entry
        }
      }
    ' CHANGELOG.md > CHANGELOG.tmp && mv CHANGELOG.tmp CHANGELOG.md

    echo "$RELEASE_BODY"
}

# Generate and update the changelog before creating the release
generate_and_update_changelog() {
    LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null)
    generate_changelog_template
    RELEASE_BODY=$(update_changelog)
}

# Remove local and remote release branches
cleanup_release_branches() {
  print_colored "44;97" "\nRemovendo branches locais com prefixo release/..."
  git branch --list "release/*" | while read -r branch; do
    print_colored "43;30" "  Excluindo branch local: $branch"
    git branch -D "$branch"
  done
}

# === Execution ===

sudo -v || { print_colored "\033[41;97m\nSenha do sudo não fornecida ou foi cancelada. Abortando.\033[0m"; exit 1; }

trap 'print_colored "43;30" "\nInterrompido pelo usuário."; cleanup_and_exit' SIGINT  # Handle interruption

# Change ownership of files to the current user (if necessary)
sudo chown -R "$USER":"$USER" .git . node_modules dist 2>/dev/null

# Give read/write permission to the user
chmod -R u+rwX .git . node_modules dist 2>/dev/null

# ⚡️ Store the hash of the script before execution
SCRIPT_HASH_BEFORE=$(sha256sum "$0" | awk '{print $1}')

# === Dependencies ===
if ! command -v jq &> /dev/null; then
  echo -e "\033[44;97m\nInstalando dependência 'jq'...\033[0m"
  if command -v apt &> /dev/null; then
    sudo apt update && sudo apt install -y jq
  elif command -v yum &> /dev/null; then
    sudo yum install -y jq
  elif command -v brew &> /dev/null; then
    brew install jq
  else
    echo -e "\033[41;97m\nErro: Não foi possível instalar 'jq' automaticamente. Instale manualmente e tente novamente.\033[0m"
    exit 1
  fi
fi

# === Validate NPM_TOKEN ===
if [ -n "$NPM_TOKEN" ]; then
  VALIDATION_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $NPM_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    https://api.github.com/user)

  if [ "$VALIDATION_RESPONSE" -ne 200 ]; then
    print_colored "41;97" "\nErro: NPM_TOKEN inválido ou expirado. Código HTTP: $VALIDATION_RESPONSE"
    exit 1
  fi
else
  print_colored "41;97" "\nErro: NPM_TOKEN não está definido."
  exit 1
fi

# Check if there are uncommitted changes in the working directory
if [[ -n $(git status --porcelain) ]]; then
  print_colored "41;97" "\nErro: o diretório Git contém mudanças não comitadas."
  exit 1
fi

cleanup_release_branches
# Checkout to the remote branch to ensure correct base
# print_colored "44;97" "\nAcessando a branch remota $REMOTE_BRANCH..."
print_colored "44;97" "\nVerificando se a branch remota $REMOTE_BRANCH existe..."

if git ls-remote --exit-code --heads origin "$REMOTE_BRANCH" >/dev/null 2>&1; then
  print_colored "42;97" "\nBranch remota $REMOTE_BRANCH encontrada."
  git fetch origin "$REMOTE_BRANCH" || cleanup_and_exit
  git fetch --prune origin "+refs/tags/*:refs/tags/*"
  git checkout -B "$REMOTE_BRANCH" origin/"$REMOTE_BRANCH" || cleanup_and_exit
else
  print_colored "43;97" "\nBranch remota $REMOTE_BRANCH não existe. Criando baseada na main..."
  git fetch origin main || cleanup_and_exit
  git checkout -B "$REMOTE_BRANCH" origin/main || cleanup_and_exit
  git push origin "$REMOTE_BRANCH" || cleanup_and_exit
  git fetch origin "$REMOTE_BRANCH"
  git checkout -B "$REMOTE_BRANCH" origin/"$REMOTE_BRANCH"
fi

printf '\n'

# Ask user to select the version type (patch, minor, or major)
select_version

# Fetch and pull the latest changes from the main branch
print_colored "44;97" "\nVerificando se seu branch está atualizado com main..."
if ! git fetch origin main || ! git pull --no-edit origin main; then
  print_colored "41;97" "\nErro ao realizar 'git pull'."
  cleanup_and_exit
fi

# Check if there were merge conflicts during the pull
if git ls-files -u | grep -q .; then
  print_colored "41;97" "\nHouve conflitos durante o 'git pull'."
  git merge --abort || git reset --hard HEAD
  cleanup_and_exit
fi

# Push the updated remote branch
print_colored "44;97" "\nAtualizando a branch remota $REMOTE_BRANCH..."
if ! git push origin "$REMOTE_BRANCH" --force-with-lease; then
  print_colored "41;97" "\nErro ao realizar 'git push'."
  exit 1
  cleanup_and_exit
fi

# Ensure the remote branch is checked out
print_colored "44;97" "\nGarantindo que a branch remota $REMOTE_BRANCH está atualizada..."
git fetch origin "$REMOTE_BRANCH" || cleanup_and_exit
git checkout -B "$REMOTE_BRANCH" origin/"$REMOTE_BRANCH" || cleanup_and_exit

# ⚡️ Store the hash of the script after execution
SCRIPT_HASH_AFTER=$(sha256sum "$0" | awk '{print $1}')

# Check if the script has been updated
if [[ "$SCRIPT_HASH_BEFORE" != "$SCRIPT_HASH_AFTER" ]]; then
  print_colored "43;97" "\nO script foi atualizado. Reexecutando a versão nova..."
  exec "$0" "$@"
fi

# Update dependencies
print_colored "44;97" "\nAtualizando dependências..."
sudo rm -rf node_modules
npm install

# Validate the build process
print_colored "44;97" "\nValidando build..."
npm run build
[ $? -ne 0 ] && print_colored "41;97" "\nErro no build." && cleanup_and_exit

# Increment the version based on the user's selection
print_colored "44;97" "\nIncrementando a versão ($VERSION_TYPE)..."
printf '\n'
npm version "$VERSION_TYPE" --no-git-tag-version || cleanup_and_exit

print_colored "42;97" "\nBranch atualizada com sucesso."

# Get the new version from package.json
NEW_VERSION=$(node -p "require('./package.json').version")

# Create a new release branch from the remote branch
# NEW_BRANCH="release/v$NEW_VERSION"
# NEW_BRANCH="stable/v$NEW_VERSION"

# print_colored "44;97" "\nCriando a nova branch $NEW_BRANCH a partir de $REMOTE_BRANCH..."
# git checkout -b "$NEW_BRANCH" || cleanup_and_exit

# Generate and update the changelog
generate_and_update_changelog

# Stage the changed files
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: increasing the version to $NEW_VERSION" || cleanup_and_exit

# Create the new git tag
print_colored "44;97" "\nCriando a tag no Git..."
if git tag "v$NEW_VERSION" 2>/dev/null; then
  TAG_CREATED=true
  git push origin "v$NEW_VERSION"
  print_colored "42;97" "\nTag v$NEW_VERSION criada com sucesso!"
else
  print_colored "41;97" "\nA tag v$NEW_VERSION já existe. Nenhuma nova tag foi criada."
fi

# Create a release on GitHub
if [ -z "$NPM_TOKEN" ]; then
  print_colored "43;97" "\nToken não encontrado. Release no GitHub não será criada."
else
  print_colored "44;97" "\nCriando release no GitHub..."

  # Determine the icon based on the version type
  case "$VERSION_TYPE" in
    "patch")
      ICON="⚡️"  # Icon for patch version
      ;;
    "minor")
      ICON="🔧"  # Icon for minor version
      ;;
    "major")
      ICON="🚀"  # Icon for major version
      ;;
    *)
      ICON="🔍"  # Default icon if version type is not recognized
      ;;
  esac

  # Create the release with the determined icon
  RELEASE_RESPONSE=$(curl -s -X POST \
    -H "Authorization: token $NPM_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases \
    -d "$(jq -n \
      --arg tag "v$NEW_VERSION" \
      --arg name "$ICON v$NEW_VERSION" \
      --arg body "$RELEASE_BODY" \
      '{ tag_name: $tag, name: $name, body: $body, draft: false, prerelease: false }')")
      
  RELEASE_URL="https://github.com/$REPO_OWNER/$REPO_NAME/releases/tag/v$NEW_VERSION"

  if echo "$RELEASE_RESPONSE" | grep -q '"id":'; then
    print_colored "42;97" "\nRelease criada com sucesso no GitHub!"
  else
    print_colored "43;97" "\nNão foi possível verificar a criação da release automaticamente."
  fi
fi

# Display the URL of the created release
echo -e "\033[44;97m\n🚀 Release publicada:\033[0m"
echo -e "\n\033[4;34m$RELEASE_URL\033[0m"

# # Push the new branch to the remote repository
# print_colored "44;97" "\nRealizando o push da branch $NEW_BRANCH para o repositório remoto..."
# git push --set-upstream origin "$NEW_BRANCH" || cleanup_and_exit

# # Create the pull request (PR)
# print_colored "44;97" "\nCriando Pull Request para $NEW_BRANCH..."

# # Assemble the PR body
# PR_BODY=$(cat <<EOF
# ## 📦 Atualização de Versão

# Este Pull Request foi gerado automaticamente para atualizar a versão do pacote, contendo as mudanças mais recentes da biblioteca.

# Para mais detalhes sobre esta versão, consulte a release completa:

# 🔗 [Clique aqui para visualizar a release](<$RELEASE_URL>)
# EOF
# )

# PR_RESPONSE=$(curl -s -X POST \
#   -H "Authorization: token $NPM_TOKEN" \
#   -H "Accept: application/vnd.github+json" \
#   "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/pulls" \
#   -d "$(jq -n \
#     --arg title "$RELEASE_PR_PREFIX$NEW_VERSION" \
#     --arg head "$NEW_BRANCH" \
#     --arg base "$REMOTE_BRANCH" \
#     --arg body "$PR_BODY" \
#     '{ title: $title, head: $head, base: $base, body: $body }')")

# # Display PR link if it exists, otherwise suggest creating one
# PR_URL=$(echo "$PR_RESPONSE" | jq -r '.html_url // empty')

# echo -e "\033[44;97m\n🔗 Pull Request:\033[0m"
# if [ -n "$PR_URL" ]; then
#   echo -e "\n\033[1;34m✔️  PR criada:\033[0m \033[4;34m$PR_URL\033[0m\n"
# fi

print_colored "44;97" "\nTestando publicação no npm..."

npm publish --dry-run || cleanup_and_exit

print_colored "44;97" "\nRealizando o push direto para $REMOTE_BRANCH..."
# git fetch origin "$REMOTE_BRANCH"
# git checkout "$REMOTE_BRANCH" || cleanup_and_exit
# git reset --hard origin/"$REMOTE_BRANCH"

# git merge --no-ff "$NEW_BRANCH" -m "chore: merging release v$NEW_VERSION" || cleanup_and_exit
print_colored "44;97" "\nAtualizando branch local com o remoto antes do push..."
if ! git pull --rebase origin "$REMOTE_BRANCH"; then
  print_colored "41;97" "\nErro ao atualizar branch local antes do push."
  cleanup_and_exit
fi

git push origin "$REMOTE_BRANCH" || cleanup_and_exit

print_colored "42;97" "\nMerge feito com sucesso diretamente para $REMOTE_BRANCH."

# Publish the package on npm
print_colored "44;97" "\nPublicando o pacote no npm..."
if ! npm publish; then
  print_colored "41;97" "\nFalha ao publicar o pacote no npm."
  cleanup_and_exit
fi

# Final success message
print_colored "42;97" "\nVersão aumentada, changelog atualizado, tag criada, release feita e pacote publicado com sucesso!"

# git checkout "$REMOTE_BRANCH"
git checkout main || cleanup_and_exit
