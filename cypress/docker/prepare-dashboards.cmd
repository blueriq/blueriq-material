:: Init
set location="./cypress/docker/preparations"
set checkoutDir=".\runtime-clone"
set overrideVersion=false
set skipBuild=false
set composeOnly=false
set runtimeBranch="master"
set runtimeUrl="git@bq-gitlab.everest.nl:blueriq/blueriq.git"
set runtimeVersion="15.10.0.839"
set cdsVersion="4.1.5"
set dcmVersion="2.2.7"
set dashboardVersion="0.1.0"
set gatewayVersion="0.1.0"


@echo off
call :read_params %*
@echo on

if %composeOnly% == false (
  :: Clean up preparations
  if exist %location% call rmdir /s /q %location%
  :: Wars
  if %overrideVersion% == true (
    call :build_runtime || exit /b
  ) else (
    call :download_runtime || exit /b
  )
  call :download_services || exit /b

  :: Copy
  call xcopy /I dist cypress\docker\preparations\dist /Y
)


:: Docker build and start
call docker-compose --file ./cypress/docker/dashboards/docker-compose.yml up -d --build
exit %ERROR_LEVEL%

:read_params
if not %1/==/ (
    if not "%__var%"=="" (
        if not "%__var:~0,1%"=="-" (
            endlocal
            goto read_params
        )
        endlocal & set %__var:~1%=%~1
    ) else (
        setlocal & set __var=%~1
    )
    shift
    goto read_params
)
exit /B

:build_runtime
if %skipBuild% == false (
  if exist %checkoutDir% call rmdir /s /q %checkoutDir%
  call git clone --depth 1 --single-branch --branch %runtimeBranch% %runtimeUrl% %checkoutDir% || exit /b
)
cd %checkoutDir%\Runtime
if %skipBuild% == false (
  call mvn -B clean package -DskipTests -P!quality -am -pl runtime/blueriq-runtime-application || exit /b
)

call :get_version com.blueriq.customerdata.api.version cdsVersion
call :get_version com.blueriq.dcm.lists.api.version dcmVersion
call xcopy /I runtime\blueriq-runtime-application\target\*.war  ..\..\cypress\docker\preparations
cd ..\..\
exit /B

:download_runtime
call mvn -B  dependency:copy "-Dartifact=com.blueriq:blueriq-runtime-application:%runtimeVersion%:war" "-DoutputDirectory=%location%" "-Dproject.basedir=%location%"
exit /B

:download_services
call mvn -B  dependency:copy "-Dartifact=com.blueriq:blueriq-customerdata-sql-store-standalone:%cdsVersion%:jar" "-DoutputDirectory=%location%" || exit /b
call mvn -B  dependency:copy "-Dartifact=com.blueriq:blueriq-dcm-lists-standalone:%dcmVersion%:jar" "-DoutputDirectory=%location%" || exit /b
call mvn -B  dependency:copy "-Dartifact=com.blueriq:blueriq-dcm-dashboard-service-standalone:%dashboardVersion%:jar" "-DoutputDirectory=%location%" || exit /b
call mvn -B  dependency:copy "-Dartifact=com.blueriq:blueriq-gateway-service:%gatewayVersion%:jar" "-DoutputDirectory=%location%" || exit /b
exit /B


:get_version
set expression=%~1
set storeVar=%~2
call mvn -B help:evaluate -Dexpression=%expression% -q -DforceStdout > tempVersion.txt
call set /p %storeVar%=<tempVersion.txt
call DEL /F /Q tempVersion.txt
exit /B
