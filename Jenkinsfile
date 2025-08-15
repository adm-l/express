pipeline {
    agent any
    environment {
        IMAGE_NAME = "expressapp"
        IMAGE_TAG = "latest"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/adm-l/express.git'
            }
        }
        stage('Install & Lint') {
            steps {
                sh 'npm ci'
                sh 'npm run lint'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME:$IMAGE_TAG ."
            }
        }
        stage('Security Scan') {
            steps {
                sh "trivy image $IMAGE_NAME:$IMAGE_TAG"
            }
        }
        stage('Deploy Locally') {
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up -d'
            }
        }
    }
}
