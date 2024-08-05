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

        // Define environment variables for backend, MySQL, and RabbitMQ services
        BACKEND_SERVICE_NAME = 'backend-service'
        MYSQL_SERVICE_NAME = 'mysql'
        RABBITMQ_SERVICE_NAME = 'rabbitmq'
        NAMESPACE = 'my-namespace'

        // Define custom domain
        CUSTOM_DOMAIN = 'telusitms.com'
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

        stage('Get Service IPs') {
            steps {
                script {
                    // Get the external IP address of the backend service
                    def backendExternalIP = sh(script: "kubectl get svc ${BACKEND_SERVICE_NAME} --namespace=${NAMESPACE} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'", returnStdout: true).trim()

                    // Get the internal IP addresses of the MySQL and RabbitMQ services
                    def mysqlIP = sh(script: "kubectl get svc ${MYSQL_SERVICE_NAME} --namespace=${NAMESPACE} -o jsonpath='{.spec.clusterIP}'", returnStdout: true).trim()
                    def rabbitmqIP = sh(script: "kubectl get svc ${RABBITMQ_SERVICE_NAME} --namespace=${NAMESPACE} -o jsonpath='{.spec.clusterIP}'", returnStdout: true).trim()

                    // Export environment variables
                    env.BACKEND_URL = "https://${backendExternalIP}"
                    env.MYSQL_CONNECTION_STRING = "mysql://${mysqlIP}:3306"
                    env.RABBITMQ_URL = "amqp://${rabbitmqIP}:5672"
                }
            }
        }

        stage('Deploy to Cloud Run') {
            steps {
                script {
                    sh '''
                    gcloud beta run deploy $CLOUD_RUN_SERVICE \
                        --image $IMAGE_NAME \
                        --platform managed \
                        --region $REGION \
                        --port 80 \
                        --allow-unauthenticated \
                        --vpc-connector $VPC_CONNECTOR \
                        --set-env-vars BACKEND_URL=$BACKEND_URL,MYSQL_CONNECTION_STRING=$MYSQL_CONNECTION_STRING,RABBITMQ_URL=$RABBITMQ_URL
                    '''
                }
            }
        }

        // stage('Add Custom Domain') {
        //     steps {
        //         script {
        //             sh '''
        //             gcloud beta run domain-mappings create \
        //                 --service $CLOUD_RUN_SERVICE \
        //                 --domain $CUSTOM_DOMAIN \
        //                 --platform managed
        //             '''
        //         }
        //     }
        // }
    }
}
