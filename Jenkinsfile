#!groovy
// TODO: this is a copy from the red cow jenkins file, rework this!
boolean canRelease = BRANCH_NAME == 'master'

if (canRelease) properties([
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
  env.PATH = "${env.PATH};${env.NODEJS_PATH}"
  env.SASS_BINARY_PATH = env.SASS_BINDING_PATH

  boolean shouldRelease = canRelease && params.isRelease

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

  if (shouldRelease) {
    stage('increment version') {
      bat "yarn release:version --yes --cd-version ${params.versionIncrement}"
      bat "git push origin ${BRANCH_NAME} && git push origin --tags"
    }
  }

  stage('build packages') {
    bat 'yarn build:packages'

    archive 'dist\\*.tgz'
  }

  if (shouldRelease) {
    stage('publish release') {
      bat "yarn release:publish"
    }
  }
}
