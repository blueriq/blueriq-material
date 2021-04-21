set OLDDIR=%CD%
setlocal
set ANT_VERISON=1.10.3
cd %~dp0
if not exist "apache-ant-%ANT_VERISON%\bin\ant" call mvn dependency:unpack -Dartifact=com.blueriq.tools:ant:%ANT_VERISON%:zip -DoutputDirectory="." -Dproject.basedir="apache-ant-%ANT_VERISON%"
cd %OLDDIR%
