pipeline {
  agent none
  stages {
    stage('Prep') {
      steps {
        sh 'printenv'
      }
    }
    stage('Test') {
      steps {
        parallel(
          "Unit": {
            sh '''
              echo "unit testing..."
            '''
          },
          "Lint": {
            sh '''
               echo "linting..."
            '''
          }
          ,
          "Functional": {
            sh '''
              echo "runing functional tests..."
            '''
          }
        )
      }
    }
    stage('Build') {
      steps {
        sh '''
          echo "compiling...  compiling..."
        '''
      }
    }
    stage('Deploy') {
      when {
        branch 'master'
      }
      steps {
        sh '''
          echo "deploying..."
        '''
      }
    }
  }
} //pipeline
