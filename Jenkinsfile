#!groovy

boolean isMaster = BRANCH_NAME == 'master'
String triggerCron = isMaster ? "H 13 * * 7" : ""

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
      name: 'deploySnapshot',
      defaultValue: false,
      description: 'Select if you want to deploy a snapshot to artifactory.'
    ),
    booleanParam(
      name: 'isRelease',
      defaultValue: false,
      description: 'Select if you want to do a release build.'
    ),
    string(
      name: 'releaseVersion',
      defaultValue: '1.0.x',
      description: "In case of a release-build please provide the release version."
    ),
    string(
      name: 'developmentVersion',
      defaultValue: '1.0.x-SNAPSHOT',
      description: "In case of a release-build please provide the next development version."
    )
  ])
])

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

    stage('verify & build') {
      parallel(
        'test': {
          bat 'yarn verify'
        },
        'tslint': {
          // tslint
          bat 'node_modules\\.bin\\tslint -c src/tslint.json -t checkstyle -p src/tsconfig.app.json -p src/tsconfig.spec.json -o tslint_results_checkstyle.xml'
        },
		'sass-lint': {
		  // sass-lint
		  bat 'node_modules\\.bin\\sass-lint -f checkstyle --verbose --config sass-lint.yml src/**/*.scss -o sasslint_results_checkstyle.xml'
		},
		'build':{
		  if (!params.isRelease) { // maven release executes the yarn build also
			bat "yarn build"
		  }
		}
      )
    }

    if (params.deploySnapshot) {
      stage('deploy snapshot') {
        bat "mvn clean deploy"
      }
    } else if (params.isRelease) {
      stage('increment version for release') {
        bat "yarn version:increment ${params.releaseVersion}"
      }
      stage('release') {
        bat "mvn -B -DdevelopmentVersion=${params.developmentVersion} -DreleaseVersion=${params.releaseVersion} -Dresume=false release:prepare release:perform"
      }
    } // end if

  } catch (anyException) {
    echo "An error occured (${anyException}) marking build as failed."
    currentBuild.result = 'FAILURE'
  } finally {
    stage("Publish results") {
      // Test results
      step([$class: 'JUnitResultArchiver', testResults: 'testresults/*.xml'])

      // coverage results
      publishHTML(target: [
        allowMissing         : false,
        alwaysLinkToLastBuild: false,
        keepAll              : true,
        reportDir            : "coverage",
        reportFiles          : 'index.html',
        reportName           : "coverage",
        reportTitles         : "coverage"
      ])

      // lint results
	  step([$class: 'hudson.plugins.checkstyle.CheckStylePublisher',
				pattern: '*_results_checkstyle.xml',
				useStableBuildAsReference:true,
				unstableTotalAll:'1',
				shouldDetectModules:true,
				canRunOnFailed: true])
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
