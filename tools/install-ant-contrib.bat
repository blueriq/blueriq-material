set OLDDIR=%CD%
cd %~dp0
if not exist "ant-contrib-0.6\ant-contrib-0.6.jar" call mvn dependency:copy -Dartifact=com.blueriq.tools:ant-contrib:0.6:jar -DoutputDirectory="ant-contrib-0.6"
cd %OLDDIR%