#!groovy

boolean isMaster = BRANCH_NAME == 'master'
String triggerCron = isMaster ? "H 13 * * 7" : ""

if (isMaster)
    properties([
            [
                    $class  : 'BuildDiscarderProperty',
                    strategy: [$class: 'LogRotator', numToKeepStr: '5']
            ],
            pipelineTriggers([
                    cron(triggerCron)
            ]),
            parameters([
                    booleanParam(
                            name: 'isRelease',
                            defaultValue: false,
                            description: 'Select if you want to do a release build.'
                    ),
                    choice(
                            name: 'versionIncrement',
                            choices: 'major\nminor\npatch\npremajor\npreminor\nprepatch\nprerelease',
                            defaultValue: 'prerelease',
                            description: 'For a release, specify how the version number should be incremented'
                    ),
            ])
    ])

node {
    try {
        env.JAVA_HOME = tool 'jdk1.8.0_121';
        def mvnHome = tool "apache-maven-3.5.3";
        env.PATH = "${env.JAVA_HOME}\\bin;${env.PATH};${mvnHome}\\bin;${env.NODEJS_PATH}\"";
        env.SASS_BINARY_PATH = env.SASS_BINDING_PATH

        stage('checkout') {
            checkout scm
        }

        dir('frontend') {
            stage('install') {
                bat 'node -v'
                bat 'yarn -v'
                bat 'yarn install'
            }

            stage('verify') {
                parallel(
                        'test': {
                            bat 'yarn test --watch false --code-coverage'
                        },
                        'lint': {
                            bat 'yarn lint'
                        }
                )
            }
        } // dir frontend

        boolean shouldRelease = isMaster && params.isRelease
        if (shouldRelease) {

            stage('build packages') {
                dir('frontend') {
                    bat "yarn build"
                }
                dir("backend") {
                    bat "mvn clean deploy"
                }
            }
        } // end if

    } catch (anyException) {
        echo "An error occured (${anyException}) marking build as failed."
        currentBuild.result = 'FAILURE'
    } finally {
        stage("Publish results") {
            // TODO ng linting results
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: "frontend/coverage", reportFiles: 'index.html', reportName: "coverage", reportTitles: "coverage"]);
        }

        notifyBuildStatus()
        deleteDir()
    }
}// node

def notifyBuildStatus() {
    // notify the person who started the build and the persons who's commits broke the build
    step([$class                  : 'Mailer',
          notifyEveryUnstableBuild: true,
          recipients              : emailextrecipients([
                  [$class: 'CulpritsRecipientProvider'],
                  [$class: 'RequesterRecipientProvider']
          ])
    ])

    step([$class                  : 'Mailer',
          notifyEveryUnstableBuild: true,
          sendToIndividuals       : true
    ])
}
