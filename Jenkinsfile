pipeline {
  agent any
  tools {nodejs "Node 10"}

  stages {
    stage('Install') {
      steps {
        sh 'test yarn && echo "Yarn already installed" || npm i -g yarn'
        sh 'yarn i'
      }
    }
    stage('Validate Code Style') {
      steps {
        sh 'yarn lint'
      }
    }
    // Re-implement with DDW-689
    // stage('Build') {
    //   steps {
    //     sh 'yarn build'
    //   }
    // }
    stage('Unit/Integration Test') {
      steps {
        sh 'yarn test'
      }
    }
  }
}
