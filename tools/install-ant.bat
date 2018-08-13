set OLDDIR=%CD%
cd %~dp0
if not exist "apache-ant-1.8.4\bin\ant" call mvn dependency:unpack -Dartifact=com.blueriq.tools:ant:1.8.4:zip -DoutputDirectory="." -Dproject.basedir="apache-ant-1.8.4"
cd %OLDDIR%