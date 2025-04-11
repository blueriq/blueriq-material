cd %~dp0..\..
del yarn.lock
call tools\_install-tools.bat
call ant -f scripts\docker\build.xml build
cd %~dp0
PAUSE
