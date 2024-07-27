pipeline {
    agent {
        docker {
      image 'node:14' // Use Node.js Docker image
      args '-v /root/.npm:/root/.npm' // Mount npm cache directory to avoid permission issues
        }
    }
    environment {
        PROJECT_ID = 'capstone-430018'
        IMAGE_NAME = 'frontend'
        REGION = 'us-central1'
        ARTIFACT_REGISTRY = 'frontend-artifact-repo'
        CLOUD_RUN_SERVICE = 'frontend-service'
        GCP_CREDENTIALS = 'gcr-credentials-file'
    }
    stages {
        stage('Checkout') {
      steps {
        checkout scm
      }
        }
    stage('Build') {
        steps {
          script {
            // Run commands to fix permissions before npm install
            sh 'mkdir -p /home/node/.npm'
            sh 'chown -R node:node /home/node/.npm'

            // Install dependencies
            sh 'npm install'
          }
        }
    }

        stage('Dockerize') {
      steps {
        script {
          sh '''
                        docker build -t gcr.io/$PROJECT_ID/$IMAGE_NAME:latest .
                    '''
        }
      }
        }
        stage('Push to Artifact Registry') {
      steps {
        script {
          withCredentials([file(credentialsId: "${GCP_CREDENTIALS}", variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
            sh '''
                            gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                            gcloud auth configure-docker
                            docker tag gcr.io/$PROJECT_ID/$IMAGE_NAME:latest $REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REGISTRY/$IMAGE_NAME:latest
                            docker push $REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REGISTRY/$IMAGE_NAME:latest
                        '''
          }
        }
      }
        }
        stage('Deploy to Cloud Run') {
      steps {
        script {
          sh '''
                        gcloud run deploy $CLOUD_RUN_SERVICE --image=$REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REGISTRY/$IMAGE_NAME:latest --platform=managed --region=$REGION --allow-unauthenticated
                    '''
        }
      }
        }
    }
    post {
        success {
      echo 'Deployment successful!'
        }
        failure {
      echo 'Deployment failed!'
        }
    }
}
