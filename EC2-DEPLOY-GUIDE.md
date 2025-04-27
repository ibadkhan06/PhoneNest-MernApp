# EC2 Deployment Guide for CI/CD Pipeline

This guide provides instructions for setting up your EC2 instance for CI/CD deployment, including alternatives to SSH key authentication.

## Option 1: Password Authentication Setup

If you're having issues with SSH key authentication, you can use password authentication as a fallback:

1. **Enable password authentication on your EC2 instance**:
   ```bash
   # Edit the SSH config file
   sudo nano /etc/ssh/sshd_config
   
   # Set these values
   PasswordAuthentication yes
   
   # Save and exit, then restart SSH service
   sudo service sshd restart
   ```

2. **Set a password for your user**:
   ```bash
   # For the ec2-user
   sudo passwd ec2-user
   ```

3. **Add the password to GitHub secrets**:
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `EC2_PASSWORD`
   - Value: The password you set
   - Click "Add secret"

## Option 2: Fix SSH Key Issues

If you prefer using SSH keys (more secure):

1. **Generate a new key on your local machine**:
   ```bash
   ssh-keygen -t rsa -b 4096 -f ec2_deploy_key -m PEM
   ```

2. **Copy the public key to your EC2 instance**:
   ```bash
   # If you can SSH into your instance with your current key:
   ssh-copy-id -i ec2_deploy_key.pub ec2-user@your-ec2-ip
   
   # Or manually add to authorized_keys:
   cat ec2_deploy_key.pub
   # Copy the output and add it to ~/.ssh/authorized_keys on your EC2 instance
   ```

3. **Add the private key to GitHub secrets**:
   - The content of the `ec2_deploy_key` file (not the .pub file)
   - Make sure to copy the entire key including BEGIN and END lines

## Docker Setup on EC2

Ensure Docker is properly set up on your EC2 instance:

```bash
# Install Docker
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start
sudo systemctl enable docker

# Add your user to docker group
sudo usermod -a -G docker ec2-user

# Create volume for persistent storage
docker volume create phonenest_uploads
```

## Testing Deployment Locally

Before relying on the CI/CD pipeline, you can test deployment commands locally:

```bash
# Pull and run the backend image
docker pull yourusername/phonenest-backend:latest
docker run -d --name phonenest-backend --restart always -p 4000:4000 -v phonenest_uploads:/app/uploads yourusername/phonenest-backend:latest
```

## Common Issues and Solutions

1. **Permission denied**: Ensure your EC2 user has sudo privileges and belongs to the docker group
2. **Docker command not found**: Make sure Docker is installed and your path is correct
3. **Connection refused**: Check that your security groups allow SSH (port 22) and your backend port (4000) 