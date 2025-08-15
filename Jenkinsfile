pipeline {
    agent any
    environment {
        IMAGE_NAME = "localhost:5000/cicd-demo:${BUILD_NUMBER}"
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm ci || npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'node test.js'
            }
        }
        stage('Docker Build & Push') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
                sh 'docker push $IMAGE_NAME'
            }
        }
        stage('Deploy to Minikube') {
            steps {
                sh 'kubectl set image deployment/cicd-demo cicd-demo=$IMAGE_NAME --record || kubectl apply -f deployment.yaml'
            }
        }
    }
}
