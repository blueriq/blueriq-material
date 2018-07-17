@echo off
setlocal

cd "%~dp0\.."

set version=%1
set targetDir=\\bq-comm\ApiDocs\matherial\%version%

if "%version%"=="" (
  echo Error: Provide the version to release as first argument
  exit /b 1
)

if not exist "%targetDir%" (
  mkdir "%targetDir%\\core" "%targetDir%\\angular"
)

pushd dist\docs
xcopy /s/y core "%targetDir%\core"
xcopy /s/y angular "%targetDir%\angular"
popd
