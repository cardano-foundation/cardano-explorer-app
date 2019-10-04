pipeline {
  agent any
  tools {nodejs "Node 10"}

  stages {
    stage('Install') {
      steps {
        sh 'yarn install'
      }
    }
    stage('Validate Code Style') {
      steps {
        sh 'yarn lint'
      }
    }
    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }
    stage('Unit/Integration Test') {
      steps {
        sh 'yarn test'
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}
