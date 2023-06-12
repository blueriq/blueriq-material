#!/usr/bin/env bash
FORCE_COLOR=0 # disable colors in yarn
mkdir -p dist
node -v
yarn -v
yarn build --progress=false
