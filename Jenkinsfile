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
      description: 'In case of a release-build please provide the release version.'
    ),
    string(
      name: 'developmentVersion',
      defaultValue: '1.0.x-SNAPSHOT',
      description: 'In case of a release-build please provide the next development version.'
    ),
	string(
	  name: 'communityHost',
	  defaultValue: '',
	  description: 'In case of a release-build please provide the hostname of the server where to publish the community documentation to.'
	),
	string(
	  name: 'communityUser',
	  defaultValue: '',
	  description: 'In case of a release-build please provide the username for the server where to publish the community documentation to.'
	),
	string(
	  name: 'communityPass',
	  defaultValue: '',
	  description: 'In case of a release-build please provide the password for the server where to publish the community documentation to.'
	)
  ])
])

node {
  try {
    env.JAVA_HOME = tool 'jdk-11.0.1'
    def mvnHome = tool "apache-maven-3.5.4"
    def nodeHome = tool 'node-12.18.1'
    env.PATH = "${env.JAVA_HOME}\\bin;${mvnHome}\\bin;${nodeHome};${env.PATH}"
    env.CHROME_BIN = env.CHROME_80_0_3987_132

    stage('checkout') {
      def scmVars = checkout scm
      env.GIT_COMMIT = scmVars.GIT_COMMIT
    }

    stage('install tools') {
      bat 'tools/_install-tools.bat'
      env.ANT_HOME = "${pwd()}\\tools\\apache-ant-1.10.3"
      env.PATH = "${env.ANT_HOME}\\bin;${env.PATH}"
    }

    stage('install') {
      bat 'node -v'
      bat 'yarn -v'
      bat 'yarn install --ignore-engines'
      bat 'yarn ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points --no-async'
      bat 'yarn ng:version'
    }

    stage('verify & build') {
      parallel(
        'test': {
          def result = bat([returnStdout: true, script: "yarn verify"]);
          println result;

          // Unfortunatly it is needed to check if the coverage is not met because the coverage-reporter always exits with error_level=0
          // so we need to make the build unstable manually. you can check the coverage html result to see where it is failing
          if (result.contains('ERROR [reporter.coverage-istanbul]:') || result.contains('WARN [reporter.coverage-istanbul]:')) {
            println 'Unit tests do not meet coverage thresholds, setting the build to unstable';
            currentBuild.result = 'UNSTABLE';
          }
        },
        'tslint': {
          // tslint
          bat 'node_modules\\.bin\\tslint -c src/tslint.json -t checkstyle -p src/tsconfig.app.json -p src/tsconfig.spec.json -o tslint_results_checkstyle.xml'
        },
        'sass-lint': {
          // sass-lint
          bat 'node_modules\\.bin\\sass-lint -f checkstyle --verbose --config sass-lint.yml src/**/*.scss -o sasslint_results_checkstyle.xml'
        },
        'build': {
          withCredentials([file(credentialsId: 'npmrc_file', variable: 'npmrc_file')]) {
            bat "ant -f scripts/docker/build.xml build " +
              "-Ddocker.host=bq-build-lin.blueriq.local " +
              "-Dcommit=${env.GIT_COMMIT} " +
              "-DisRelease=${params.isRelease} " +
              "-DnpmrcFileLocation=${npmrc_file}"
          }
        }
      );
    }
    if (params.deploySnapshot) {
      stage('deploy snapshot') {
        bat "mvn clean deploy"
      }
    } else if (params.isRelease) {
      stage('release') {
        // update versions and tag
        def tag = "blueriq-material-theme-${params.releaseVersion}"

        bat "mvn versions:set -DnewVersion=${params.releaseVersion} -DgenerateBackupPoms=false"
        bat "git add ."
        bat "git commit -m \"prepare release ${tag}\""
        bat "git tag ${tag}"

        // release
        bat "mvn -B deploy"

        // update to next development version
        bat "mvn versions:set -DnewVersion=${params.developmentVersion} -DgenerateBackupPoms=false"
        bat "git add ."
        bat "git commit -m \"prepare for next development iteration ${params.developmentVersion}\""

        // push commits and tag
        bat "git push origin HEAD"
        bat "git push origin ${tag}"
      }

      stage('publish docs') {
        bat "yarn docs --silent --name \"@blueriq/material - ${params.releaseVersion}\""
        bat "build-publish-docs.bat ${params.releaseVersion} ${params.communityHost} ${params.communityUser} ${params.communityPass}"
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
      step([$class                    : 'hudson.plugins.cobertura.CoberturaPublisher',
            coberturaReportFile       : 'coverage/cobertura-coverage.xml',
            onlyStable                : false,
            failUnhealthy             : true,
            failUnstable              : true,
            autoUpdateHealth          : false,
            autoUpdateStability       : false,
            zoomCoverageChart         : false,
            failNoReports             : true,
            //                          healthy, unhealthy, failing
            lineCoverageTargets       : '80.0, 80.0, 80.0',
            packageCoverageTargets    : '80.0, 80.0, 80.0',
            fileCoverageTargets       : '80.0, 80.0, 80.0',
            classCoverageTargets      : '80.0, 80.0, 80.0',
            methodCoverageTargets     : '80.0, 80.0, 80.0',
            conditionalCoverageTargets: '80.0, 80.0, 80.0'
      ])

      // lint results
      step([$class                   : 'hudson.plugins.checkstyle.CheckStylePublisher',
            pattern                  : '*_results_checkstyle.xml',
            useStableBuildAsReference: true,
            unstableTotalAll         : '1',
            shouldDetectModules      : true,
            canRunOnFailed           : true])
    }

	if (isMaster && currentBuild.result.equals('SUCCESS')) {
      stage('push to Github') {
        withCredentials([usernamePassword(credentialsId: 'blueriq-material_github.com', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
          // We want the tags now that where not fetched in the 'checkout' stage
          bat "git fetch --tags"
          bat "git remote add upstream \"https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/blueriq/blueriq-material.git\" "
          // Push only the master branch and all tags to Github
          bat "git push upstream master"
          bat "git push upstream --tags"
        }
      }
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
