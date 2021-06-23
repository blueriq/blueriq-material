setlocal

set OLD_DIR=%CD%
set ANT_VERSION=1.10.3
set ANT_DIR=apache-ant-%ANT_VERSION%

cd %~dp0

if not exist "%ANT_DIR%\bin\ant" call mvn dependency:unpack -Dartifact=com.blueriq.tools:ant:%ANT_VERSION%:zip -DoutputDirectory="." -Dproject.basedir="%ANT_DIR%"
if not exist "%ANT_DIR%\lib\jsch-0.1.54.jar" call mvn dependency:copy -Dartifact=com.jcraft:jsch:0.1.54:jar -DoutputDirectory="%ANT_DIR%\lib"
if not exist "ant-contrib-0.6\ant-contrib-0.6.jar" call mvn dependency:copy -Dartifact=com.blueriq.tools:ant-contrib:0.6:jar -DoutputDirectory="ant-contrib-0.6"

cd %OLD_DIR%
