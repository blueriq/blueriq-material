
setlocal
set ROOT=%cd%
set SOFTWARE=%cd%\tools
set ANT=%SOFTWARE%\apache-ant-1.8.4
set ANT_HOME=%SOFTWARE%\apache-ant-1.8.4
set PATH=%ANT%\bin;%MAVEN%\bin;%PATH%;

set releaseVersion=%1
set communityHost=%2
set communityUser=%3
set communityPass=%4

call %SOFTWARE%\install-7zip-cli.bat
call %SOFTWARE%\install-ant.bat
call %SOFTWARE%\install-jsch.bat
 
CALL ant -buildfile build-documentation.xml deployDocumentation -DreleaseVersion=%releaseVersion% -DcommunityHost=%communityHost% -DcommunityUser=%communityUser% -DcommunityPass=%communityPass%