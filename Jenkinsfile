pipeline {
    agent any
    environment {
        PROJECT_ID = 'capstone-430018'
        IMAGE_NAME = 'frontend'
        REGION = 'us-central1'
        ARTIFACT_REGISTRY = 'frontend-artifact-repo'
        CLOUD_RUN_SERVICE = 'frontend-service'
        GCP_CREDENTIALS = 'gcr-credentials-file'
        VERSION = "${env.BUILD_ID}" // Use Jenkins build ID as version or set a different versioning strategy
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Create Artifact Registry Repository') {
            steps {
                script {
                    withCredentials([file(credentialsId: "${GCP_CREDENTIALS}", variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                        sh '''
                            gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                            gcloud config set project $PROJECT_ID
                            gcloud artifacts repositories describe $ARTIFACT_REGISTRY --location=$REGION || \
                            gcloud artifacts repositories create $ARTIFACT_REGISTRY \
                                --repository-format=docker \
                                --location=$REGION
                        '''
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Dockerize') {
            steps {
                script {
                    sh '''
                        docker build -t gcr.io/$PROJECT_ID/$IMAGE_NAME:$VERSION .
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
                            docker tag gcr.io/$PROJECT_ID/$IMAGE_NAME:$VERSION $REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REGISTRY/$IMAGE_NAME:$VERSION
                            docker push $REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REGISTRY/$IMAGE_NAME:$VERSION
                        '''
                    }
                }
            }
        }

        stage('Deploy to Cloud Run') {
            steps {
                script {
                    sh '''
                        gcloud run deploy $CLOUD_RUN_SERVICE --image=$REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REGISTRY/$IMAGE_NAME:$VERSION --platform=managed --region=$REGION --allow-unauthenticated
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
