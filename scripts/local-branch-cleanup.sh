#!/bin/bash

cleanup() {
    # Function to clean up and exit
    echo -e "\n\e[31mExiting script...\e[0m"  # Message in red indicating script exit
    exit 1
}

trap cleanup SIGINT  # Capture interrupt signal (Ctrl+C) to call cleanup function

current_branch=$(git rev-parse --abbrev-ref HEAD)  # Get the current branch

echo -e "\e[33mUpdating local repository...\e[0m"  # Message in yellow indicating updating local repository
git fetch --prune  # Update local repository and prune deleted branches

echo -e "\n\e[33mChecking for local branches not in remote repository...\e[0m"  # Message in yellow indicating checking for local branches not in remote repository

# Get a list of all local branches, removing leading whitespace
local_branches=$(git for-each-ref --format='%(refname:short)' refs/heads | sed 's|^heads/||' | grep -v "^$current_branch$")

# Loop through each local branch
while IFS= read -r branch; do
    if [ "$branch" != "$current_branch" ]; then  # Check if the branch is not the current branch
        if ! git show-ref --verify --quiet "refs/remotes/origin/$branch"; then
            # If local branch does not exist in remote repository
            echo -e "\n\e[33mRemoving local branch '$branch'...\e[0m"  # Message in yellow indicating removal of local branch
            git branch -D "$branch"  # Remove the local branch
        fi
    fi
done <<< "$local_branches"

echo -e "\n\e[32mLocal branch cleanup completed.\e[0m\n"  # Message in green indicating local branch cleanup completed
