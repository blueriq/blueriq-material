#!groovy

int timeout_in_mins = 30
boolean isMaster = BRANCH_NAME == 'master'

properties([
  [
    $class  : 'BuildDiscarderProperty',
    strategy: [$class: 'LogRotator', numToKeepStr: '5']
  ],
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
    )
  ])
])

node {
  try {
    timeout(time: timeout_in_mins, unit: 'MINUTES') {
      env.JAVA_HOME = tool 'jdk-21'
      def mvnHome = tool "apache-maven-3.9.6"
      def nodeHome = tool 'node-22.14.0'
      env.PATH = "${env.JAVA_HOME}\\bin;${mvnHome}\\bin;${nodeHome};${env.PATH}"
      env.CHROME_BIN = env.CHROME_116_0_5845_97

      stage('checkout') {
        def scmVars = checkout scm
        env.GIT_COMMIT = scmVars.GIT_COMMIT
      }

      stage('install tools') {
        bat 'tools/_install-tools.bat'
        env.ANT_HOME = "${pwd()}\\tools\\apache-ant-1.10.14"
        env.PATH = "${env.ANT_HOME}\\bin;${env.PATH}"
      }

      stage('install') {
        bat 'node -v'
        bat 'yarn -v'
        bat 'yarn install --ignore-engines'
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
          'eslint': {
            // eslint
            bat 'yarn eslint --format checkstyle --output-file eslint_results_checkstyle.xml'
          },
          'stylelint': {
            // stylelint
            bat 'node_modules\\.bin\\stylelint --custom-formatter node_modules/stylelint-checkstyle-reporter/index.js src/**/*.scss -o stylelint_results_checkstyle.xml'
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
          bat "git commit -am \"chore: prepare release ${tag}\""
          bat "git tag ${tag}"

          // release
          bat "mvn -B deploy"
          bat "git push origin ${tag}"

          // update to next development version
          bat "mvn versions:set -DnewVersion=${params.developmentVersion} -DgenerateBackupPoms=false"
          bat "git commit -am \"chore: prepare for next development iteration ${params.developmentVersion}\""
          bat "git push origin HEAD"
        }

        stage('publish docs') {
          bat "yarn docs --silent --name \"@blueriq/material - ${params.releaseVersion}\""
          withCredentials([usernamePassword(credentialsId: 'bq-docs-publish-credentials', passwordVariable: 'docsPass', usernameVariable: 'docsUser'), string(credentialsId: 'bq-docs-publish-host', variable: 'docsHost')]) {
            bat "build-publish-docs.bat ${params.releaseVersion} $docsHost $docsUser $docsPass"
          }
        }
      } // end if
    }
  } catch (anyException) {
    echo "An error occured (${anyException}) marking build as failed."
    currentBuild.result = 'FAILURE'
  } finally {
    stage("Publish results") {
      archiveArtifacts artifacts: 'testresults/*.xml';
      // Test results
      junit 'testresults/*.xml'

      // coverage results
      recordCoverage(
          tools: [[parser: 'COBERTURA', pattern: 'coverage/cobertura-coverage.xml']],
          failOnError: true,
          qualityGates: [
          [criticality: 'FAILURE', integerThreshold: 80, metric: 'LINE', threshold: 80.0],
          [criticality: 'FAILURE', integerThreshold: 80, metric: 'PACKAGE', threshold: 80.0],
          [criticality: 'FAILURE', integerThreshold: 80, metric: 'CLASS', threshold: 80.0],
          [criticality: 'FAILURE', integerThreshold: 80, metric: 'METHOD', threshold: 80.0],
          [criticality: 'FAILURE', integerThreshold: 80, metric: 'FILE', threshold: 80.0],
          [criticality: 'FAILURE', integerThreshold: 80, metric: 'BRANCH', threshold: 80.0],
          ]
      )

      // lint results
      recordIssues skipBlames: true,
                  enabledForFailure: true,
                  name: 'Linting warnings',
                  tool: checkStyle(pattern: '*_results_checkstyle.xml'),
                  sourceCodeEncoding: 'UTF-8',
                  qualityGates: [
                          [threshold: 1, type: 'TOTAL', unstable: false],
                          [threshold: 1, type: 'TOTAL_HIGH', unstable: true],
                          [threshold: 1, type: 'TOTAL_NORMAL', unstable: true],
                          [threshold: 1, type: 'TOTAL_LOW', unstable: true]
                  ]
    }
    String currentStatus = currentBuild.result ?: 'SUCCESS'
    if (isMaster && currentStatus.equals('SUCCESS')) {
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
