pipeline {
  agent any
  stages {
    stage('Build and Push') {
      options {
          azureKeyVault([[envVariable: 'BBWCR_KEY', name: 'bbwcr', secretType: 'Secret']])
      }
      steps {
        sh '''
          echo "Build and Push"
          ACR=bbwcr.azurecr.io
          docker build -t $ACR/app:$BUILD_NUMBER $WORKSPACE/app
          docker login -u bbwcr -p $BBWCR_KEY $ACR
          docker push $ACR/app:$BUILD_NUMBER
        '''
      }
    }
  }
} //pipeline
