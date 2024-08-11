pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = 'dockerhub-creds'  // Docker Hub credentials ID in Jenkins
        DOCKERHUB_USERNAME = 'azmatpathan'
        GCP_CREDENTIALS = 'gcp-credentials'
        GCP_PROJECT_ID = 'my-first-project-431720'
        CLOUD_RUN_SERVICE_NAME = 'frontend-service'  // Cloud Run Service Name
        CLOUD_RUN_REGION = 'us-central1'
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/frontend"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Authenticate with GCP') {
            steps {
                script {
                    withCredentials([file(credentialsId: "${GCP_CREDENTIALS}", variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                        sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                        sh "gcloud config set project ${GCP_PROJECT_ID}"
                        sh "gcloud config set run/region ${CLOUD_RUN_REGION}"
                    }
                }
            }
        }
        stage('Deploy to Cloud Run') {
            steps {
                script {
                    // Deploy to Cloud Run using the image from Docker Hub
                    sh '''
                    gcloud run deploy $CLOUD_RUN_SERVICE_NAME \
                        --image ${FRONTEND_IMAGE}:latest \
                        --platform managed \
                        --region $CLOUD_RUN_REGION \
                        --allow-unauthenticated
                        --port 80
                    '''
                }
            }
        }
        stage('Verify Deployment') {
            steps {
                script {
                    sh "gcloud run services describe $CLOUD_RUN_SERVICE_NAME --region $CLOUD_RUN_REGION --platform managed"
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment to Cloud Run succeeded!'
        }
        failure {
            echo 'Deployment failed!'
            // Optional: Add cleanup or rollback steps if needed
        }
    }
}
