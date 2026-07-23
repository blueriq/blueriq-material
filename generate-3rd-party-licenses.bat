call pnpm install --dir "%~dp0/scripts/license" --ignore-workspace --config.lockfile=false
call node %~dp0/scripts/license/extract.js
