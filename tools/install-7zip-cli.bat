set OLDDIR=%CD%
cd %~dp0
if not exist "7z.exe" call mvn dependency:unpack "-Dartifact=com.blueriq.tools:7-zip-command-line-version:16.4:zip" "-DoutputDirectory=." "-Dproject.basedir=."
cd %OLDDIR%