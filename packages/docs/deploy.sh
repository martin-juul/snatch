#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn run build

# navigate into the build output directory
cd src/.vuepress/dist

git init
git add -A
git commit -m 'docs: deploy'

git push -f git@github.com:martin-juul/snatch.git master:gh-pages
