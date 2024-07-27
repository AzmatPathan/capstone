pipeline {
    agent {
        docker {
            image 'node:18' // Use an official Node.js Docker image
            args '-v /var/jenkins_home/.npm:/root/.npm' // Optional: cache npm modules
        }
    }
    environment {
        PROJECT_ID = 'capstone-430018'
        IMAGE_NAME = 'frontend'
        REGION = 'us-central1'
        ARTIFACT_REGISTRY = 'frontend-artifact-repo'
        CLOUD_RUN_SERVICE = 'frontend-service'
        GCP_CREDENTIALS = 'gcr-credentials-file' // Google Cloud credentials file
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
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
                    withCredentials([file(credentialsId: "${GCP_CREDENTIALS}", variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                        sh '''
                            gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                            gcloud run deploy $CLOUD_RUN_SERVICE \
                                --image=$REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REGISTRY/$IMAGE_NAME:latest \
                                --platform=managed \
                                --region=$REGION \
                                --allow-unauthenticated
                        '''
                    }
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
