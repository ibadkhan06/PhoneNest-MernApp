# Emergency Fix for Backend Container Restart Loop

Follow these steps to fix your restarting backend container:

## Step 1: Check the container logs

```bash
# See why the container is crashing
docker logs phonenest-backend
```

## Step 2: Stop and remove the restarting container

```bash
# Stop the container
docker stop phonenest-backend

# Remove it 
docker rm phonenest-backend
```

## Step 3: Run with proper environment variables directly

```bash
# Create .env file with proper formatting
echo 'MONGO="your_mongodb_connection_string"' > .env
echo 'JWT_SECRET="your_secret_key"' >> .env

# Run the container with environment variables passed directly
docker run -d \
  --name phonenest-backend \
  --restart always \
  -p 4000:4000 \
  -e MONGO="your_mongodb_connection_string" \
  -e JWT_SECRET="your_secret_key" \
  -v phonenest_uploads:/app/uploads \
  ibadkhan06/phonenest-backend:latest
```

Replace `your_mongodb_connection_string` and `your_secret_key` with your actual MongoDB connection string and JWT secret.

## Step 4: Verify the container is running correctly

```bash
# Check container status
docker ps

# Check logs to make sure there are no errors
docker logs phonenest-backend
```

## Step 5: Test your API endpoints

```bash
# Test that the API is responding
curl http://localhost:4000/api/products/top
```

## Common issues and solutions:

1. **MongoDB connection errors**: Make sure your MongoDB connection string is correct and accessible from your EC2 instance.

2. **Quote escaping issues**: If your connection string contains special characters, ensure they're properly escaped.

3. **Port already in use**: Make sure nothing else is using port 4000.

4. **Socket.io configuration**: Check your socket.io server configuration to ensure it's binding to the correct address.

## Security Group reminder

Make sure your EC2 security group allows:
- Inbound traffic on port 4000 from 0.0.0.0/0 (or your frontend's IP range) 