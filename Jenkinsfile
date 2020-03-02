pipeline {
  agent any
  tools {nodejs "Node 10"}

  environment {
    AWS_ACCESS_KEY_ID = credentials('jenkins-aws-secret-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
  }

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
        sh 'yarn static:build'
      }
    }
    stage('Setup Service Dependencies') {
      steps {
        sh 'docker-compose up -d'
      }
    }
    stage('Test') {
      steps {
        sh 'yarn test'
        sh 'npx serve -p 4000 &'
        sh 'yarn test:e2e'
      }
      post {
        always {
          sh 'yarn stop-dependencies'
        }
      }
    }
    stage('S3 Deployment') {
      steps {
        script {
          if (env.BRANCH_NAME == 'develop') {
            sh "yarn deploy:byron:mainnet"
            sh "yarn deploy:byron:testnet"
          }
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
