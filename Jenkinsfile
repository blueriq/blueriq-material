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
    def mvnHome = tool "apache-maven-3.2.5";
    env.PATH = "${env.JAVA_HOME}\\bin;${env.PATH};${mvnHome}\\bin;${env.NODEJS_PATH}\"";
    env.SASS_BINARY_PATH = env.SASS_BINDING_PATH

    stage('checkout') {
      checkout scm
    }

    stage('install') {
      bat 'node -v'
      bat 'yarn -v'
      bat 'yarn install'
    }

    stage('verify') {
      parallel(
        'test': {
          bat 'yarn ng test --watch false'
        },
        'lint': {
          bat 'yarn ng lint'
        }
      )
    }

    boolean shouldRelease = isMaster && params.isRelease
    if (shouldRelease) {
      stage('increment version') {
        bat "yarn release:version --yes --cd-version ${params.versionIncrement}"
        // bat "git push origin ${BRANCH_NAME} && git push origin --tags"
      }

      stage('build packages') {
        bat "yarn build"
        bat "yarn build:deploy"
      }
    }
// From red-cow:
//    if (shouldRelease) {
//      stage('publish release') {
//        bat "yarn release:publish"
//      }
//    }

  }catch(anyException) {
    echo "An error occured (${anyException}) marking build as failed."
    currentBuild.result = 'FAILURE'
  } finally {
    stage ("Publish results") {
      // TODO collect test and nglinting results
    }

    notifyBuildStatus()
    deleteDir()
  }
}// node

def notifyBuildStatus() {
  // notify the person who started the build and the persons who's commits broke the build
  step([$class: 'Mailer',
        notifyEveryUnstableBuild: true,
        recipients: emailextrecipients([
          [$class: 'CulpritsRecipientProvider'],
          [$class: 'RequesterRecipientProvider']
        ])
  ])

  step([$class: 'Mailer',
        notifyEveryUnstableBuild: true,
        sendToIndividuals: true
  ])
}
