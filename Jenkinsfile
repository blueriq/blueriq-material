#!groovy

boolean isMaster = BRANCH_NAME == 'master'
String triggerCron = isMaster ? "H 13 * * 7" : ""

if (isMaster) {
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
      string(
        name: 'releaseVersion',
        defaultValue: '0.0.x',
        description: "In case of a release-build please provide the release version."
      ),
      string(
        name: 'developmentVersion',
        defaultValue: '0.0.x-SNAPSHOT',
        description: "In case of a release-build please provide the next development version."
      ),
    ])
  ])
} else {
  properties([
    parameters([
      booleanParam(
        name: 'deploySnapshot',
        defaultValue: false,
        description: 'Select if you want to deploy a snapshot to artifactory.'
      ),
    ])
  ])
}

node {
  try {
    env.JAVA_HOME = tool 'jdk1.8.0_121'
    def mvnHome = tool "apache-maven-3.5.3"
    env.PATH = "${env.JAVA_HOME}\\bin;${env.PATH};${mvnHome}\\bin;${env.NODEJS_PATH}\""
    env.SASS_BINARY_PATH = env.SASS_BINDING_PATH

    stage('checkout') {
      checkout scm
    }

    stage('install') {
      bat 'node -v'
      bat 'yarn -v'
      bat 'yarn install'
      bat 'yarn ng:version'
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

    stage('build') {
      bat "yarn build"
    }

    if (params.deploySnapshot) {
      stage('deploy snapshot') {
        bat "yarn deploy"
      }
    } else if (params.isRelease) {
      stage('release') {
        bat "mvn -B -DdevelopmentVersion=${params.developmentVersion} -DreleaseVersion=${params.releaseVersion} -Dresume=false release:prepare release:perform -Prelease"
      }
    } // end if

  } catch (anyException) {
    echo "An error occured (${anyException}) marking build as failed."
    currentBuild.result = 'FAILURE'
  } finally {
    stage("Publish results") {
      // TODO ng linting results
      publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: "coverage", reportFiles: 'index.html', reportName: "coverage", reportTitles: "coverage"])
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
