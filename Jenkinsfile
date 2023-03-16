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
          AksLocation=eastus2
          az aks get-credentials -g $RGROUP -n $AKS 
          kubectl cluster-info
          mkdir -p $WORKSPACE/build
          helm upgrade app app/ --install --create-namespace -n qa -f $WORKSPACE/app/env/values-qa.yaml
        '''
      }
    }
    stage('Smoke Test') {
      steps {
        script {
           SVC_IP = sh (
                script: 'kubectl get svc --namespace qa app --template "{{ range (index .status.loadBalancer.ingress 0) }}{{.}}{{ end }}"',
                returnStdout: true
            ).trim()
            echo "svc ip: ${SVC_IP}"
            
            echo "Smoke Test"
            curl "https://${env.SVC_IP}:8080"

        }
      }
    }
  }
} //pipeline
