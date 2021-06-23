setlocal

set SOFTWARE=%cd%\tools
set ANT_HOME=%SOFTWARE%\apache-ant-1.10.3
set PATH=%ANT_HOME%\bin;%MAVEN%\bin;%PATH%;

set releaseVersion=%1
set communityHost=%2
set communityUser=%3
set communityPass=%4

call %SOFTWARE%\install-7zip-cli.bat
call %SOFTWARE%\install-ant.bat

CALL ant -buildfile build-documentation.xml deployDocumentation -DreleaseVersion=%releaseVersion% -DcommunityHost=%communityHost% -DcommunityUser=%communityUser% -DcommunityPass=%communityPass%
