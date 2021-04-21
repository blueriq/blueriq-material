set ROOT=%cd%
set SOFTWARE=%cd%\tools
set ANT=%SOFTWARE%\apache-ant-1.10.3
set ANT_HOME=%SOFTWARE%\apache-ant-1.10.3
set PATH=%ANT%\bin;%PATH%;

call %SOFTWARE%\install-7zip-cli.bat
call %SOFTWARE%\install-ant.bat
call %SOFTWARE%\install-jsch.bat
call %SOFTWARE%\install-ant-contrib.bat
