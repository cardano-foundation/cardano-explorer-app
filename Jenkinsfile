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
        sh 'npm run start-dependencies -- -d'
      }
    }
    stage('Test') {
      steps {
        sh 'yarn test'
      }
      post {
        always {
          sh 'npm run stop-dependencies'
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
