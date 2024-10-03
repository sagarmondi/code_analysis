pipeline {
    agent any
	environment {
        PRODUCTION_IP_ADDRESS = '172.31.16.34'
    }
    
    tools {
        nodejs "nodejs"
    }

    stages {
        stage('Install Packages') {
            steps {
                script {
                    sh 'yarn install'
                }
            }
        }

        stage('Run the App') {
            steps {
                script {
                    sh 'yarn start:pm2'
                    sleep 5
                }
            }
        }

        stage('Test the app') {
            steps {
                script {
                    sh 'curl http://localhost:3000/health'
                }
            }
        }

        stage('Stop the App') {
            steps {
                script {
                    sh 'pm2 stop todos-app'
                }
            }
        }  
		
		stage('Debug Environment Variable') {
            steps {
                script {
                    echo "PRODUCTION_IP_ADDRESS: $PRODUCTION_IP_ADDRESS"
                }
            }
        }

        stage('Add Host to known_hosts') {
            steps {
                script {
                    sh '''
                        mkdir -p /var/lib/jenkins/.ssh
                        ssh-keyscan -H $PRODUCTION_IP_ADDRESS >> /var/lib/jenkins/.ssh/known_hosts
                    '''
                }
            }
        }

        stage('Deploy') {
            environment {
                DEPLOY_SSH_KEY = credentials('AWS_INSTANCE_SSH')
            }

            steps {
                script {
                    sh '''
                        chmod 600 $DEPLOY_SSH_KEY
                        ssh -v -i $DEPLOY_SSH_KEY ubuntu@$PRODUCTION_IP_ADDRESS '
                            if [ ! -d "todos-app" ]; then
                                git clone https://github.com/sagarmondi/code_analysis.git code_analysis
                                cd code_analysis
                            else
                                cd code_analysis
                                git pull
                            fi

                            yarn install

                            if pm2 describe code_analysis > /dev/null ; then
                                pm2 restart code_analysis
                            else
                                yarn start:pm2
                            fi
                        '
                    '''
                }
            }
        }
    }
}
