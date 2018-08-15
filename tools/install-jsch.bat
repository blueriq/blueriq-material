set OLDDIR=%CD%
cd %~dp0
if not exist "apache-ant-1.8.4\lib\jsch-0.1.54.jar" call mvn dependency:copy -Dartifact=com.jcraft:jsch:0.1.54:jar -DoutputDirectory="apache-ant-1.8.4\lib"
cd %OLDDIR%