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
  }
  post {
    always {
      cleanWs()
    }
  }
}
