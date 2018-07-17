@echo off
setlocal

cd "%~dp0\..\.."

set version=%1
set targetDir=\\bq-comm\ApiDocs\material\%version%

if "%version%"=="" (
  echo Error: Provide the version to release as first argument
  exit /b 1
)

if not exist "%targetDir%" (
  mkdir "%targetDir%"
)

pushd dist\docs
xcopy /s/y ".\*" "%targetDir%"
popd
