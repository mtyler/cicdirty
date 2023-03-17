pipeline {
  agent any
  environment {
      ACR='bbwcr.azurecr.io'
      RGROUP='BBW-DEV'
      AKS='BBW-AKS-1'
      SERVICE='app'
      TAG="${GIT_BRANCH}-${BUILD_NUMBER}"
  }
  stages {
    stage('Build and Push') {
      options {
          azureKeyVault([[envVariable: 'BBWCR_KEY', name: 'bbwcr', secretType: 'Secret']])
      }
      steps {
        sh '''
          echo "Build and Push"
          printenv
          docker build -t $ACR/$SERVICE:$TAG $WORKSPACE/$SERVICE --build-arg BUILD=$BUILD_NUMBER
          docker login -u bbwcr -p $BBWCR_KEY $ACR
          docker push $ACR/$SERVICE:$TAG
        '''
      }
    }
    stage('Deploy') {
      steps {
        sh '''
          echo "Deploy"
          az aks get-credentials -g $RGROUP -n $AKS 
          kubectl cluster-info
          helm upgrade $SERVICE $SERVICE/ --install --create-namespace -n qa -f $WORKSPACE/app/env/values-qa.yaml --set image.tag=$TAG
        '''
      }
    }
    stage('Smoke Test') {
      steps {
        script {
          echo "Smoke Test"
          RESULT = sh (
                script: 'curl http://$(kubectl get svc --namespace qa $SERVICE --template "{{ range (index .status.loadBalancer.ingress 0) }}{{.}}{{ end }}"):8080',
                returnStdout: true
            ).trim()
          echo "test result: ${RESULT}"
        }
      }
    }
  }
} //pipeline
