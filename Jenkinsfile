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
    stage('Setup Service Dependencies') {
      steps {
        sh 'CI=true yarn run start-dependencies'
      }
    }
    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }
    stage('Test') {
      steps {
        sh 'yarn test'
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
