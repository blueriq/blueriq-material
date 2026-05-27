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
        script {
          cvePods.node {
            cveCheck.yarn1(name: 'material-theme')
          }
        }
      }
    }
  }
}
