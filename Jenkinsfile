pipeline {
  agent any
  stages {
    stage('Build and Push') {
      steps {
        sh '''
          echo "Build and Push"
          docker build ./app/Dockerfile
        '''
      }
    }
  }
} //pipeline
