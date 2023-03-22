pipeline {
  agent any
  environment {
      ACR='bbwcr.azurecr.io'
      RGROUP='BBW-DEV'
      AKS='BBW-AKS-1'
      SERVICE='poc'
      TAG="${JOB_BASE_NAME}-${BUILD_NUMBER}"
  }
  stages {
    stage('Build and Push') {
      options {
          azureKeyVault([[envVariable: 'BBWCR_KEY', name: 'bbwcr', secretType: 'Secret']])
      }
      steps {
        sh '''
          echo "Build and Push"
          az aks get-credentials -g $RGROUP -n $AKS 
          docker build -t $ACR/$SERVICE:$TAG $WORKSPACE/$SERVICE --build-arg BUILD=$TAG --build-arg QA=$(kubectl get svc --namespace qa poc --template "{{ range (index .status.loadBalancer.ingress 0) }}{{.}}{{ end }}"):8080 --build-arg PROD=$(kubectl get svc --namespace prod poc --template "{{ range (index .status.loadBalancer.ingress 0) }}{{.}}{{ end }}"):8080
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
          helm upgrade $SERVICE $SERVICE/ --install --create-namespace -n qa -f $WORKSPACE/app/env/values-qa.yaml --set image.tag=$TAG --set image.pullPolicy=Always
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
