pipeline {
    agent {
        docker {
      image 'node:14'
      args '-u node:node'  // Run as non-root user
        }
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
          // Ensure correct permissions for .npm directory
          sh 'mkdir -p /home/node/.npm'
          sh 'chown -R node:node /home/node/.npm'

          // Run npm install
          sh 'npm install'
        }
      }
        }
        stage('Dockerize') {
      steps {
        script {
          // Build Docker image
          docker.build("gcr.io/your-project-id/your-image:${env.BUILD_ID}")
        }
      }
        }
        stage('Push to Artifact Registry') {
      steps {
        script {
          // Push Docker image to Artifact Registry
          docker.withRegistry('https://gcr.io', 'gcr-credentials') {
            docker.image("gcr.io/your-project-id/your-image:${env.BUILD_ID}").push('latest')
          }
        }
      }
        }
        stage('Deploy to Cloud Run') {
      steps {
        script {
          // Deploy Docker image to Cloud Run
          sh 'gcloud run deploy your-service --image gcr.io/your-project-id/your-image:${env.BUILD_ID} --platform managed --region your-region --allow-unauthenticated'
        }
      }
        }
    }
    post {
        success {
      echo 'Deployment succeeded!'
        }
        failure {
      echo 'Deployment failed!'
        }
    }
}
