pipeline {
  agent {
    kubernetes {}
  }
  options {
    disableConcurrentBuilds()
    skipDefaultCheckout(true)
    timeout(time: 5, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '10'))
    ansiColor('xterm')
    gitLabConnection gitLabConnection: 'Blueriq-Gitlab'
  }
  parameters {
    string(name: 'cveChecksBranch', description: 'Use different cve-checks branch')
  }
  stages {
    stage('Load library') {
      steps {
        library params.cveChecksBranch ? "cve-checks@${params.cveChecksBranch}" : 'cve-checks'
      }
    }
    stage('Audit') {
      steps {
        updateGitlabCommitStatus name: 'Dependency check', state: 'running'
        script {
          cvePods.node {
            cveCheck.pnpm(name: 'material-theme')
          }
        }
      }
      post {
        always {
          script {
            updateGitlabCommitStatus name: 'Dependency check',
              state: currentBuild.currentResult == 'SUCCESS' ? 'success' : 'failed'
          }
        }
      }
    }
  }
  post {
    always {
      // notify the person who started the build and the persons who's commits broke the build
      step([$class                  : 'Mailer',
            notifyEveryUnstableBuild: true,
            sendToIndividuals       : false,
            recipients              : emailextrecipients([culprits(), requestor()]) + " ${DEVELOPERS_EMAIL}"
      ])
    }
  }
}
