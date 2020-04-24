#!/usr/bin/env bash

declare -a repos=(
    'git@github.com:bluehost/lambda-bluehost-generate-screenshot.git'
    'git@github.com:bluehost/lambda-bluehost-github-release-api.git'
    'git@github.com:bluehost/lambda-bluehost-plugin-zip.git'
    'git@github.com:bluehost/lambda-bluehost-screenshot-service.git'
);

basePath='content/mu-plugins'

RED='\033[0;31m'
GREEN='\033[0;32m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

for repo in "${repos[@]}"
do

    # Get package name
    [[ $repo =~ \/(.*)\.git$ ]]
    packageName="${BASH_REMATCH[1]}"

    # Find directory
    if [[ -d "${basePath}/${packageName}/.git" ]]
    then # If exists, skip
        echo -e "${GREEN}${repo}${NC}"
        echo -e "${GRAY}Already exists. Skipping...${NC}";
    else # If not, clone
        echo -e "${RED}${repo}${GRAY}"
        git clone $repo "${basePath}/${packageName}"
        echo -e "${NC}"
    fi
done
