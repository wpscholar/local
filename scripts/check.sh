#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

# Recursively find all Git repositories and show any that have uncommitted changes.
for DIR in $(find . -type d -name '.git' | sort) ; do
    cd $DIR/../
    if [ -n "$(git status --porcelain)" ]
    then
        echo -e "${RED}$(pwd)${NC} - ${GREEN}$(git rev-parse --abbrev-ref HEAD)${NC}"
        echo -e "${GRAY}$(git status -s)${NC}"
    fi
    cd -  > /dev/null 2>&1
done
