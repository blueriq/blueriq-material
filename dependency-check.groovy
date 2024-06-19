package jenkins

pipeline {
	agent {
		label 'master'
	}
	options {
		buildDiscarder(logRotator(numToKeepStr: '3'))
		disableConcurrentBuilds()
	}
	tools  {
        jdk 'jdk-21.0.1'
        nodejs 'nodejs-18.16.0'
	}
    environment { 
        CYPRESS_INSTALL_BINARY = '0'
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
                bat 'npx auditjs@4.0.36 ossi --prod -x > reports/scan_node_modules.xml'
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
			step([$class: 'Mailer',
				  sendToIndividuals: false,
				  recipients: emailextrecipients([culprits(), requestor()]) + " ${DEVELOPERS_EMAIL}  m.van.emmerik@everest.nl"
			])
			deleteDir()
		}
	}
}