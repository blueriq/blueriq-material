package jenkins

pipeline {
  agent {
    label 'master'
  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '3'))
    disableConcurrentBuilds()
  }
  tools {
    nodejs 'nodejs-22.14.0'
  }
  environment {
    CYPRESS_INSTALL_BINARY = '0'
    OSSINDEX_USERNAME = 'support@blueriq.com'
    OSSINDEX_TOKEN = credentials('ossindex-sonatype-api-key')
  }
  stages {
    stage('Checkout SCM') {
      steps {
        script {
          def scmVars = checkout scm
          env.GIT_COMMIT = scmVars.GIT_COMMIT
        }
      }
    }
    stage('Install Packages') {
      steps {
        bat 'call yarn install'
      }
    }
    stage('Analyze') {
      steps {
        bat 'md reports'
        bat 'yarn --silent auditjs ossi --prod -x --user "%OSSINDEX_USERNAME%" --password "%OSSINDEX_TOKEN%" --whitelist auditjs-suppressions.json > reports/scan_node_modules.xml'
      }
      post {
        always {
          archiveArtifacts '**/reports/*.xml'
          junit testResults: 'reports/scan_node_modules.xml'
        }
      }
    }
  }
  post {
    always {
      step([$class           : 'Mailer',
            sendToIndividuals: false,
            recipients       : emailextrecipients([culprits(), requestor()]) + " ${DEVELOPERS_EMAIL}  m.van.emmerik@everest.nl"
      ])
      deleteDir()
    }
  }
}
