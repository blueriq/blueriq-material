cd %~dp0..\..
del yarn.lock
call ant -f scripts\docker\build.xml build
cd %~dp0
PAUSE
