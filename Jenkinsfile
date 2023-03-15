pipeline {
  agent any
  stages {
    stage('Build and Push') {
      steps {
        sh '''
          echo "Build and Push"
          cd $WORKSPACE/app
          docker build -t temp/app:$BUILD_NUMBER Dockerfile
        '''
      }
    }
  }
} //pipeline
