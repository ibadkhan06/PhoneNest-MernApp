# PhoneNest MERN App CI/CD Pipeline Setup

This document provides instructions for setting up and using the CI/CD pipeline for the PhoneNest MERN application.

## Prerequisites

1. **GitHub Repository**: Push your code to a GitHub repository.
2. **AWS Account**: Sign up for an AWS account if you don't have one.
3. **Docker Hub Account**: For storing and managing Docker images.
4. **EC2 Instance**: An Amazon EC2 instance for running the backend.
5. **S3 Bucket**: An Amazon S3 bucket for hosting the frontend.

## Setup Instructions

### 1. GitHub Repository Setup

- Push your code to GitHub repository
- Ensure your repository has the `.github/workflows/docker-build.yml` file

### 2. Docker Hub Setup

1. **Create a Docker Hub account** if you don't have one at [Docker Hub](https://hub.docker.com/)
2. **Create a new repository** named `phonenest-backend`
3. **Create an access token**:
   - Go to Account Settings → Security
   - Create a new access token with read/write permissions

### 3. AWS Setup

#### S3 for Frontend

1. **Create an S3 bucket**:
   - Go to AWS S3 Console
   - Create a new bucket (e.g., `phonenest-frontend`)
   - Enable "Static website hosting" under Properties
   - Make the bucket public (Be careful with permissions!)
   - Configure the bucket policy to allow public access

2. **Set up CloudFront** (Optional but recommended):
   - Create a CloudFront distribution pointing to your S3 bucket
   - Set the default root object to `index.html`
   - Enable HTTPS

#### EC2 for Backend

1. **Launch an EC2 instance**:
   - Choose Amazon Linux 2 or Ubuntu as the operating system
   - Use at least a t2.micro instance type
   - Configure security group to allow inbound traffic on port 4000
   - Create or use an existing key pair for SSH access

2. **Set up the EC2 instance**:
   - SSH into the instance
   - Install Docker:
     ```bash
     sudo yum update -y
     sudo amazon-linux-extras install docker
     sudo systemctl start docker
     sudo systemctl enable docker
     sudo usermod -a -G docker ec2-user
     ```
   - Create a volume for persistent storage:
     ```bash
     docker volume create phonenest_uploads
     ```

### 4. GitHub Secrets Setup

Add the following secrets to your GitHub repository:

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS Access Key ID
   - `AWS_SECRET_ACCESS_KEY`: Your AWS Secret Access Key
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token
   - `S3_BUCKET_NAME`: Your S3 bucket name (e.g., `phonenest-frontend`)
   - `CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID (optional)
   - `EC2_HOST`: Your EC2 instance public IP or DNS
   - `EC2_USERNAME`: The username for your EC2 instance (e.g., `ec2-user`)
   - `EC2_SSH_KEY`: Your private SSH key for the EC2 instance
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key

## How the CI/CD Pipeline Works

The pipeline consists of three main stages:

### 1. Code Quality

- Installs dependencies for both frontend and backend
- Runs ESLint on frontend code
- Performs security audits on dependencies

### 2. Build and Test

- Builds Docker containers using docker-compose
- Runs tests in the backend container
- Verifies that services are running correctly

### 3. Deploy (Only on Main Branch)

- **Frontend Deployment**:
  - Builds the React application
  - Deploys the build files to S3
  - Invalidates CloudFront cache (if configured)

- **Backend Deployment**:
  - Builds and pushes the backend Docker image to Docker Hub
  - Connects to the EC2 instance via SSH
  - Pulls the latest image and starts a new container

## Triggering the Pipeline

The pipeline runs automatically on:
- Every push to the main branch (full pipeline including deployment)
- Every pull request to the main branch (only code quality and testing, no deployment)

## Monitoring Deployments

- Check the GitHub Actions tab in your repository to monitor pipeline runs
- Check your S3 bucket for frontend files
- SSH into your EC2 instance and run `docker ps` to verify the backend container is running

## Troubleshooting

Common issues:

1. **S3 Access Issues**: Verify your S3 bucket permissions and policy
2. **EC2 Connection Issues**: Ensure your EC2 security groups allow SSH access and port 4000
3. **Docker Hub Errors**: Verify your Docker Hub credentials
4. **Backend Container Not Starting**: Check Docker logs with `docker logs phonenest-backend`

## Security Considerations

- Keep your AWS credentials and SSH keys secure
- Consider using AWS IAM roles for EC2 instead of access keys
- Regularly rotate your AWS and MongoDB credentials
- Use HTTPS for your frontend (via CloudFront) and backend APIs
