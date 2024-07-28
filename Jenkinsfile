pipeline {
    agent any

    environment {
        GOOGLE_APPLICATION_CREDENTIALS = 'gcr-credentials-file'  // GCP service account credentials
        PROJECT_ID = 'capstone-430018'
        REGION = 'us-central1'
        IMAGE_NAME = 'azmatpathan/capstone_frontend'
        CLOUD_RUN_SERVICE = 'frontend-service'
        DOCKER_HUB_CREDENTIALS = 'dockerhub-creds'  // Docker Hub credentials ID
        VPC_CONNECTOR = 'cloudrun-connector'  // VPC Connector name
    }

    stages {
        stage('Authenticate with GCP') {
            steps {
                script {
                    // Authenticate with Google Cloud
                    withCredentials([file(credentialsId: "${GOOGLE_APPLICATION_CREDENTIALS}", variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                        sh '''
                        gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                        gcloud config set project $PROJECT_ID
                        gcloud config set run/region $REGION
                        '''
                    }
                }
            }
        }

        stage('Pull Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_HUB_CREDENTIALS}") {
                        docker.image("${IMAGE_NAME}").pull()
                    }
                }
            }
        }

        stage('Deploy to Cloud Run') {
            steps {
                script {
                    sh '''
                    gcloud run deploy $CLOUD_RUN_SERVICE \
                        --image $IMAGE_NAME \
                        --platform managed \
                        --region $REGION \
                        --port 80 \
                        --allow-unauthenticated \
                        --vpc-connector $VPC_CONNECTOR
                    '''
                }
            }
        }
    }
}
