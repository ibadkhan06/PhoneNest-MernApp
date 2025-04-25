#!/bin/bash

# Update system packages
sudo yum update -y || sudo apt-get update -y

# Install Docker based on the OS
if [ -f /etc/amazon-linux-release ]; then
    # Amazon Linux 2
    sudo amazon-linux-extras install docker -y
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -a -G docker $USER
elif [ -f /etc/lsb-release ]; then
    # Ubuntu
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt-get update -y
    sudo apt-get install -y docker-ce
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -a -G docker $USER
else
    echo "Unsupported OS"
    exit 1
fi

# Create a Docker volume for uploads
docker volume create phonenest_uploads

# Create .env file template
cat > .env << EOL
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EOL

echo "EC2 instance setup complete!"
echo "Update the .env file with your actual values."
echo "Logout and login again or run 'newgrp docker' to use Docker without sudo." 