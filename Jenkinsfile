pipeline {
  agent any
  stages {
    stage('Build and Push') {
      steps {
        sh '''
          echo "Build and Push"
          docker build -t temp/app:$BUILD_NUMBER ./app/Dockerfile
        '''
      }
    }
  }
} //pipeline
