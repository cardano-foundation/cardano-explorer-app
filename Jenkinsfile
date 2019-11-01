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
    stage('S3 Deployment') {
      steps {
        script {
          if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'feature/continuous-delivery-s3') {
            sh "yarn deploy:byron:staging"
            sh "yarn deploy:byron:incentivized-testnet"
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
