set SOFTWARE=%~dp0
set ANT=%SOFTWARE%\apache-ant-1.10.14
set ANT_HOME=%SOFTWARE%\apache-ant-1.10.14
set PATH=%ANT%\bin;%PATH%;

call %SOFTWARE%\install-7zip-cli.bat
call %SOFTWARE%\install-ant.bat
