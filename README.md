# PhoneNest - MERN Application

A full-stack application for phone e-commerce, built with the MERN stack (MongoDB, Express, React, Node.js).

## Containerization Instructions

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your system
- Git for version control

### Environment Setup
The application is configured to use MongoDB Atlas. The connection string and JWT secret are already set in the docker-compose.yml file.

If you need to modify these values, update the environment variables in the docker-compose.yml file:
```yaml
environment:
  - MONGO="your_mongodb_atlas_connection_string"
  - JWT_SECRET="your_jwt_secret"
```

### Running with Docker Compose

1. Open a terminal in the project root directory
2. Build and start the containers:
   ```bash
   docker-compose up -d --build
   ```
3. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:4000

### Stopping the Containers

```bash
docker-compose down
```

To remove volumes when stopping:
```bash
docker-compose down -v
```

## Container Structure

- **Frontend**: React application served via Nginx
- **Backend**: Node.js Express API
- **Database**: MongoDB Atlas (cloud-hosted)

## Volumes

- **backend-uploads**: Persists uploaded files

## Next Steps

After containerization, we'll set up CI/CD pipelines and deploy to a cloud environment.

## Features

- **Developed** a full-stack website for buying mobile phones using the MERN stack.
- **Utilized** Redux for efficient state management.
- **Styled** with Tailwind CSS for a modern, responsive design.
- **Implemented** JWT for secure authentication.
- **Added** real-time chat for seamless buyer-seller communication.
- **Includes** product management, shopping cart, checkout, and reviews.

## Screenshots

![Screenshot 7](https://github.com/user-attachments/assets/c782c126-99b6-42ce-b0e2-7efbdcea1363) //1
![Screenshot 6](https://github.com/user-attachments/assets/501caae1-12cc-49a4-84d5-e712a144d803) //2
![Screenshot 8](https://github.com/user-attachments/assets/56b0aa75-3c06-46f4-9b9e-c8da46b36b74) //3
![Screenshot 9](https://github.com/user-attachments/assets/cb8a1c2b-d49a-4bc1-bebd-2b938f93fb1e) //4
![Screenshot 5](https://github.com/user-attachments/assets/0cb36d4c-28d1-4229-b4ad-ffb54784b97b) //5
![Screenshot 4](https://github.com/user-attachments/assets/67460519-00b1-45e5-8f0d-ff12eb79deee) //6
![Screenshot 3](https://github.com/user-attachments/assets/110d581f-fd12-4fd8-992a-8feb9fb5b86e) //7
![Screenshot 2](https://github.com/user-attachments/assets/f4be999d-df3b-4cfd-a23a-44e00b536c45) //8
![Screenshot 1](https://github.com/user-attachments/assets/8d4c8a7f-42f3-45f0-87c4-48b1cb1830aa) //9
![Screenshot 10](https://github.com/user-attachments/assets/0d786374-a69d-4f49-b80c-a3fff0e00a5a) //10

