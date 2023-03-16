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
    stage('Deploy') {
      steps {
        sh '''
          echo "Deploy"
          RGROUP=BBW-DEV
          AKS=BBW-AKS-1
          az aks get-credentials -g $RGROUP -n $AKS 
          kubectl cluster-info
          mkdir -p $WORKSPACE/build
          helm upgrade app app/ --install --create-namespace -n qa -f $WORKSPACE/app/env/values-qa.yaml --set image.tag=$BUILD_NUMBER
        '''
      }
    }
    stage('Smoke Test') {
      steps {
        script {
          echo "Smoke Test"
          RESULT = sh (
                script: 'curl http://$(kubectl get svc --namespace qa app --template "{{ range (index .status.loadBalancer.ingress 0) }}{{.}}{{ end }}"):8080',
                returnStdout: true
            ).trim()
          echo "test result: ${RESULT}"
        }
      }
    }
  }
} //pipeline
