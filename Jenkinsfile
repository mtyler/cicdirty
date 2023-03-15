pipeline {
  agent any
  stages {
    stage('Build and Push') {
      steps {
        sh '''
          echo "Build and Push"
          docker build -t temp/app:{env.$BUILD_NUMBER} {env.$WORKSPACE}/app/Dockerfile
        '''
      }
    }
  }
} //pipeline
