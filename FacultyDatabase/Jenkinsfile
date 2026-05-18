pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/Mehnazzb/FacultyDatabase.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t facultydb .'
            }
        }
    }
}