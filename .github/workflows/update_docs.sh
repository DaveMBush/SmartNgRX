#!/bin/bash

# Save the current branch name
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Switch to the gh-pages branch
git checkout gh-pages
if [ $? -ne 0 ]; then
    echo "Failed to switch to gh-pages branch. Aborting."
    exit 1
fi

# Pull the latest changes
git pull origin gh-pages
if [ $? -ne 0 ]; then
    echo "Failed to pull from gh-pages branch. Aborting."
    git checkout $current_branch
    exit 1
fi

# Remove the contents of the /docs folder and copy the contents of the /documentation folder into it
rm -r docs/*
if [ $? -ne 0 ]; then
    echo "Failed to remove contents of /docs. Aborting."
    git checkout $current_branch
    exit 1
fi

cp -r documentation/* docs/
if [ $? -ne 0 ]; then
    echo "Failed to copy contents from /documentation to /docs. Aborting."
    git checkout $current_branch
    exit 1
fi

# Check if there are changes to commit
if ! git diff-index --quiet HEAD --; then
    git add docs/*
    git commit -m "Update docs from documentation folder"
    if [ $? -ne 0 ]; then
        echo "Failed to commit changes. Aborting."
        git checkout $current_branch
        exit 1
    fi
else
    echo "No changes to commit."
fi

# Switch back to the original branch
git checkout $current_branch
if [ $? -ne 0 ]; then
    echo "Failed to switch back to the original branch."
    exit 1
fi

echo "Process completed successfully."
