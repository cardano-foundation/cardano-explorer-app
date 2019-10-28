pipeline {
  agent any
  tools {nodejs "Node 10"}

   // Lock concurrent builds due to the docker dependency
    options {
      lock resource: 'DockerJob'
      disableConcurrentBuilds()
    }

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
    stage('Instantiate Test Services') {
      steps {
        sh 'docker-compose up -d'
      }
    }
    stage('Unit/Integration Test') {
      steps {
        sh 'yarn test'
      }
      post {
        always {
          sh 'docker-compose down'
        }
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}
