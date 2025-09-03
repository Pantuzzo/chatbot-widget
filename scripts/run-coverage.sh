#!/bin/bash

set -e

ARG="$1" # Extract the passed argument

# Set the time zone to Brasilia (UTC-3)
export TZ=America/Sao_Paulo

# Set default branch to 'main' if not provided
BRANCH=${ARG:-main}

# Checks if the branch exists on the remote
if ! git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  printf "❌ A branch '$BRANCH' não existe no repositório remoto (origin).\n\n"
  exit 1
fi

printf "Comparando com a branch base: $BRANCH\n\n"

# Fetch latest changes from the base branch
git fetch origin "$BRANCH"

COVERAGE_THRESHOLD=80
MIN_LINES_CHANGED=7
MIN_TEST_UNITS_ADDED=7
TEST_UNITS_ADDED=0
REGISTRY_AUTH="@emcash-team:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=${NPM_TOKEN}"

# Base diff (difference between base branch and current branch, excluding uncommitted files)
BASE_DIFF=$(git diff --name-only origin/$BRANCH)

# Combine BASE_DIFF and LOCAL_DIFF
MODIFIED_ALL=$(echo -e "$BASE_DIFF" | sort | uniq | tr '\n' ' ')

# Function to count only relevant diff lines (ignores import blocks and empty lines)
count_relevant_diff_lines() {
  local file="$1"
  [ ! -f "$file" ] && echo 0 && return

  git diff -U1000 origin/"$BRANCH" -- "$file" \
    | awk '
      BEGIN {
        in_import_block = 0
        added = 0
        removed = 0
      }

      # Detect start of multiline import block
      /^[[:space:]]*import[[:space:]]*\{/ { in_import_block = 1 }

      # Detect end of multiline import block
      in_import_block && /\}[[:space:]]*from[[:space:]]*["'\''"]/ { in_import_block = 0; next }

      # Ignore empty lines added/removed
      /^[+-][[:space:]]*$/ { next }

      # Ignore lines inside multiline imports
      in_import_block && /^[+-]/ { next }

      # Ignore single-line imports
      /^[+-][[:space:]]*import[[:space:]].*from[[:space:]]*["'\''"]/ { next }

      # Count additions and removals
      /^\+/ { added++; next }
      /^\-/ { removed++; next }

      END {
        diff = added - removed
        if (diff < 0) diff = -diff
        print diff
      }
    '
}

printf "\nArquivos modificados:\n\n"
printf "$MODIFIED_ALL\n" | tr ' ' '\n' 

# Filter relevant modified files
INCLUDED=$(echo "$MODIFIED_ALL" | tr ' ' '\n' \
  | grep '^src/' \
  | grep -Ev '^src/(assets/|enums/|hooks/|icons/|styles/|test/|types/|utils/tests/)' \
  | grep -Ev '(\.stories\.tsx?$|\.style(s)?\.tsx?$|/Root\.tsx$)' \
  | grep -Ev '^src/[^/]+\.ts(x)?$' \
  | while read -r file; do
      [ ! -f "$file" ] && continue
      LINE_CHANGES=$(count_relevant_diff_lines "$file")
      if [ "$LINE_CHANGES" -ge "$MIN_LINES_CHANGED" ]; then
        echo "$file"
      fi
    done || true)

# Check if there is a corresponding test file and include it if the relevant file is modified
INCLUDED_WITH_TESTS=""

# INCLUDED_WITHOUT_TESTS: all included files excluding test files
INCLUDED_WITHOUT_TESTS=$(echo "$INCLUDED" | tr ' ' '\n' | grep -v '\.spec\.\(ts\|tsx\)$' | tr '\n' ' ')

# Adds the total number of changed lines in the INCLUDED_WITHOUT_TESTS files
TOTAL_LINES_CHANGED=0
for file in $INCLUDED_WITHOUT_TESTS; do
  # Counts lines added and removed in diff against base branch
  FILE_DIFF_LINES=$(count_relevant_diff_lines "$file")

  printf "📄 $file - Linhas modificadas: $FILE_DIFF_LINES\n"
  
  TOTAL_LINES_CHANGED=$((TOTAL_LINES_CHANGED + FILE_DIFF_LINES))
done

# Proportional calculation (e.g. 1 additional test for every 30 modified lines)
MIN_TEST_UNITS_ADDED=$((MIN_TEST_UNITS_ADDED + (TOTAL_LINES_CHANGED / 30)))

printf "\n📐 Linhas modificadas (sem testes): $TOTAL_LINES_CHANGED\n"
printf "\n📌 Mínimo dinâmico de testes ajustado para: $MIN_TEST_UNITS_ADDED\n\n"

PROJECT_ROOT=$(git rev-parse --show-toplevel)

for file in $INCLUDED; do
  if [[ "$file" =~ ^src/.*\.(tsx?|ts)$ && ! "$file" =~ \.spec\.tsx?$ ]]; then
    dir=$(dirname "$file")
    base=$(basename "$file" .tsx)
    base=$(basename "$base" .ts)
    test_file_tsx="$dir/${base}.spec.tsx"
    test_file_ts="$dir/${base}.spec.ts"

      if [ -f "$PROJECT_ROOT/$test_file_tsx" ]; then
        INCLUDED_WITH_TESTS="$INCLUDED_WITH_TESTS $test_file_tsx"
        printf "🔍 Incluindo teste correspondente: $test_file_tsx\n"
        continue
      elif [ -f "$PROJECT_ROOT/$test_file_ts" ]; then
        INCLUDED_WITH_TESTS="$INCLUDED_WITH_TESTS $test_file_ts"
        printf "🔍 Incluindo teste correspondente: $test_file_ts\n"
        continue
      fi

    # Case: INSIDE 'primitive' folder
    if [[ "$dir" == *"/primitive"* ]]; then
      # Look for any .spec file one level above the 'primitive' folder
      parent_dir=$(dirname "$dir")
      spec_files=$(find "$PROJECT_ROOT/$parent_dir" -maxdepth 1 -type f \( -name '*.spec.tsx' -o -name '*.spec.ts' \))
      for test_file in $spec_files; do
        rel_path=${test_file#$PROJECT_ROOT/}
        INCLUDED_WITH_TESTS="$INCLUDED_WITH_TESTS $rel_path"
        printf "🔍 Incluindo teste alternativo fora de 'primitive': $rel_path\n"
      done
    fi
  fi
done

MODIFIED_RELEVANT=$(echo "$INCLUDED_WITHOUT_TESTS $INCLUDED_WITH_TESTS" | tr ' ' '\n' | sort | uniq)

# Get list of test files (*.spec.ts / *.spec.tsx) from the INCLUDED list
TEST_FILES=$(echo "$INCLUDED" | tr ' ' '\n' | grep '\.spec\.\(ts\|tsx\)$' || true)

printf "\n🔎 Analisando testes adicionados em arquivos:\n"

# Loop through each test file
for test_file in $TEST_FILES; do
  [ ! -f "$test_file" ] && continue
  printf "📄 $test_file\n"

  # Get diffs for committed, staged, and unstaged changes
  FILE_DIFF=$(git diff origin/"$BRANCH" -- "$test_file")
  FILE_DIFF_STAGED=$(git diff --cached -- "$test_file")
  FILE_DIFF_UNSTAGED=$(git diff -- "$test_file")

  # Combine all diffs into one variable
  FILE_DIFF="$FILE_DIFF
  $FILE_DIFF_STAGED
  $FILE_DIFF_UNSTAGED"

  # Skip if no diff found
  if [ -z "$FILE_DIFF" ]; then
    printf "⚠️  Nenhuma alteração detectada neste arquivo\n"
    continue
  fi

  # Save diff to temporary file for debugging if needed
  echo "$FILE_DIFF" > /tmp/diff_temp.txt
  LINE_COUNT=$(echo "$FILE_DIFF" | wc -l)
  printf "   🧾 Diff tem %d linhas\n" "$LINE_COUNT"
  printf "   ✅ Iniciando processamento de blocos...\n"

  # Handle case where the file is new
  if echo "$FILE_DIFF" | grep -q '^--- /dev/null'; then
    NEW_TESTS=$(echo "$FILE_DIFF" | grep -E '^\+\s*it\(' | wc -l)
    TEST_UNITS_ADDED=$((TEST_UNITS_ADDED + NEW_TESTS))
    printf "   🆕 Arquivo novo! ➕ %d testes adicionados\n" "$NEW_TESTS"
    continue
  fi

  # Extract line numbers where diff blocks start (identified by @@)
  IFS=$'\n' readarray -t BLOCKS < <(echo "$FILE_DIFF" | awk '/^@@/{print NR}')
  TOTAL_LINES=$(echo "$FILE_DIFF" | wc -l)
  BLOCKS+=("$TOTAL_LINES") # Add end marker for final block

  START=1

  # Iterate over each diff block
  for ((i = 0; i < ${#BLOCKS[@]} - 1; i++)); do
    END=${BLOCKS[$((i + 1))]}
    BLOCK=$(echo "$FILE_DIFF" | sed -n "${START},$((END - 1))p")

    # Count removed and added test cases (lines starting with `it(`)
    OLD_COUNT=$(echo "$BLOCK" | grep '^-' | sed 's/^-//' | grep -E '^\s*it\(' | wc -l)
    NEW_COUNT=$(echo "$BLOCK" | grep '^+' | sed 's/^+//' | grep -E '^\s*it\(' | wc -l)

    # Calculate difference (new tests added)
    DIFF=$((NEW_COUNT - OLD_COUNT))
    if [ "$DIFF" -gt 0 ]; then
      TEST_UNITS_ADDED=$((TEST_UNITS_ADDED + DIFF))
      printf "   ➕ +%d novos testes neste bloco\n" "$DIFF"
    fi

    START=$((END))
  done
done

# If no relevant test files, exit the script
if [ -z "$MODIFIED_RELEVANT" ]; then
  printf "\n🚫 Nenhum arquivo relevante para cobertura foi modificado.\n\n"
  exit 0
fi

# Set up registry authentication for npm
echo -e "$REGISTRY_AUTH" >> ~/.npmrc

# Check if there are any test files
TEST_FILES=$(echo "$MODIFIED_RELEVANT" | tr ' ' '\n' | grep '\.spec\.\(ts\|tsx\)$' || true)

if [ -z "$TEST_FILES" ]; then
  printf "\n🚫 Nenhum arquivo de teste encontrado para os arquivos modificados."
  printf "\n📈 Cobertura total da PR: %d%%\n" 0
  if [ "$COVERAGE_THRESHOLD" -gt 0 ]; then
    printf "\n❌ Cobertura abaixo de ${COVERAGE_THRESHOLD}%%\n\n"
    exit 1
  fi
  exit 0
fi

printf "\n🧪 Executando testes com cobertura nos arquivos:\n\n"
echo "$TEST_FILES"
npx vitest run --coverage

LCOV_FILE=coverage/lcov.info
if [ ! -f "$LCOV_FILE" ]; then
  printf "\n❌ Arquivo de cobertura LCOV não encontrado!\n\n"
  exit 1
fi

# Initialize counters for total and covered items
total_items=0
total_covered=0
printf "\n📊 Cobertura por arquivo:\n\n"

# Process each file and calculate coverage
while IFS= read -r FILE; do
  ESCAPED_PATH=$(echo "$FILE" | sed 's/[^a-zA-Z0-9]/\\&/g')
  FILE_LCOV=$(awk "/^SF:$ESCAPED_PATH\$/ {flag=1; next} /^SF:/ {flag=0} flag" "$LCOV_FILE")
  if [ -z "$FILE_LCOV" ]; then
    echo "⚠️  Arquivo ($FILE) não encontrado no lcov. Pulando."
    continue
  fi
  lines_total=0; lines_covered=0
  branches_total=0; branches_covered=0
  functions_total=0; functions_covered=0
  while IFS= read -r LINE; do
    case "$LINE" in
      DA:*)
        lines_total=$((lines_total + 1))
        hits=$(echo "$LINE" | cut -d',' -f2)
        [ "$hits" -gt 0 ] && lines_covered=$((lines_covered + 1))
        ;;
      BRDA:*)
        parts=$(echo "$LINE" | cut -d':' -f2)
        taken=$(echo "$parts" | cut -d',' -f4)
        [ "$taken" != "-" ] && branches_total=$((branches_total + 1))
        [ "$taken" != "-" ] && [ "$taken" -gt 0 ] && branches_covered=$((branches_covered + 1))
        ;;
      FNDA:*)
        hits=$(echo "$LINE" | cut -d',' -f1 | cut -d':' -f2)
        functions_total=$((functions_total + 1))
        [ "$hits" -gt 0 ] && functions_covered=$((functions_covered + 1))
        ;;
    esac
  done <<< "$FILE_LCOV"
  lines_pct=$([ "$lines_total" -eq 0 ] && echo 100 || echo $((100 * lines_covered / lines_total)))
  branches_pct=$([ "$branches_total" -eq 0 ] && echo 100 || echo $((100 * branches_covered / branches_total)))
  functions_pct=$([ "$functions_total" -eq 0 ] && echo 100 || echo $((100 * functions_covered / functions_total)))
  file_total_items=$((lines_total + branches_total + functions_total))
  file_covered_items=$((lines_covered + branches_covered + functions_covered))
  if [ "$file_total_items" -eq 0 ]; then
    file_avg=100
  else
    file_avg=$((100 * file_covered_items / file_total_items))
  fi
  
  printf "• %-60s | 🧪 Média: %3s%% | 🧪 Lines(%d): %3s%% | 🔁 Branches(%d): %3s%% | 🔧 Functions(%d): %3s%%\n" \
  "$FILE" "$file_avg" "$lines_total" "$lines_pct" "$branches_total" "$branches_pct" "$functions_total" "$functions_pct"

  file_total_items=$((lines_total + branches_total + functions_total))
  file_covered_items=$((lines_covered + branches_covered + functions_covered))
  total_items=$((total_items + file_total_items))
  total_covered=$((total_covered + file_covered_items))
done <<< "$(echo "$INCLUDED" | grep -v '\.spec\.tsx\?$')"

# If no analyzable lines found in modified files, exit
if [ "$total_items" -eq 0 ]; then
  printf "\n🚫 Nenhuma linha analisável encontrada nos arquivos modificados.\n\n"
  exit 0
fi

current_branch=$(git rev-parse --abbrev-ref HEAD)
current_date=$(date '+%d/%m/%Y - %H:%M')

printf "\n⌛ Teste realizado em: %s - Entre as branches: %s ... %s\n" "$current_date" "$BRANCH" "$current_branch"

total_percent=$((100 * total_covered / total_items))
printf "\n📈 Cobertura total da PR: ${total_percent}%% (mínimo: ${COVERAGE_THRESHOLD}%%)\n"

# Print total number of test cases added
printf "\n📌 Mínimo de testes para aprovação direta: $MIN_TEST_UNITS_ADDED\n"

printf "\n🧾 Total de novos testes adicionados: $TEST_UNITS_ADDED"

# Optional threshold check
if [ "$TEST_UNITS_ADDED" -ge "$MIN_TEST_UNITS_ADDED" ]; then
  printf "\n\n✅ Quantidade mínima de testes unitários foi atingida.\n\n"
  exit 0
fi

# Check if total coverage is above the threshold
if [ "$total_percent" -lt "$COVERAGE_THRESHOLD" ]; then
  printf "\n\n❌ Cobertura abaixo de ${COVERAGE_THRESHOLD}%%\n\n"
  exit 1
fi

printf "\n\n✅ Cobertura OK\n\n"
