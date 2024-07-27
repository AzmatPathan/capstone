pipeline {
    agent any

    environment {
        GOOGLE_APPLICATION_CREDENTIALS = 'gcr-credentials-file'  // GCP service account credentials
        PROJECT_ID = 'capstone-430018'
        REGION = 'us-central1'
        IMAGE_NAME = 'frontend'
        ARTIFACT_REGISTRY = 'fronten-artifact-repo'
        CLOUD_RUN_SERVICE = 'frontend-service'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${ARTIFACT_REGISTRY}/${PROJECT_ID}/${IMAGE_NAME}:${env.BUILD_ID}")
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    dockerImage.inside {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://gcr.io', 'gcr-docker-credentials') {
                        dockerImage.push("${env.BUILD_ID}")  // Push with build ID tag
                        dockerImage.push('latest')  // Push with 'latest' tag
                    }
                }
            }
        }

        stage('Deploy to Cloud Run') {
            steps {
                script {
                    sh """
                    gcloud config set project ${PROJECT_ID}
                    gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
                    gcloud run deploy ${CLOUD_RUN_SERVICE} \
                        --image ${ARTIFACT_REGISTRY}/${PROJECT_ID}/${IMAGE_NAME}:latest \
                        --region ${REGION} \
                        --platform managed \
                        --allow-unauthenticated
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Frontend successfully deployed!'
        }
        failure {
            echo 'Frontend deployment failed.'
        }
    }
}
