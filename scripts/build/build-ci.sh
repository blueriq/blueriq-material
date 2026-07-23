#!/usr/bin/env bash
FORCE_COLOR=0 # disable colors in pnpm
mkdir -p dist
node -v
pnpm -v
pnpm run build --progress=false
