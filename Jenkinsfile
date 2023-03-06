pipeline {
  agent any
  stages {
    stage('Build and Push') {
      steps {
        sh '''
          echo "Build and Push"
          sudo docker build -t <dockerhubusername>/<dockerhubreponame>:$BUILD_NUMBER ./app/Dockerfile
        '''
      }
    }
  }
} //pipeline
