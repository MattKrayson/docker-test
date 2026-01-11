# Docker Express Web App

A simple Node.js web application using Express.js, containerized with Docker and orchestrated with Docker Compose.

## Features

- Displays "Hello, user!" greeting
- Shows the current date and time (dynamically generated on each request)
- Runs on port 3000
- Fully containerized with Docker

## Project Structure

```
docker-test/
├── server.js           # Express server application
├── package.json        # Node.js dependencies
├── Dockerfile          # Docker container configuration
├── docker-compose.yml  # Docker Compose orchestration
└── README.md          # This file
```

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your system

## Setup and Installation

### 1. Clone or navigate to the project directory

```bash
cd docker-test
```

### 2. Build and run the application using Docker Compose

```bash
docker-compose up --build
```

This command will:
- Build the Docker image from the Dockerfile
- Create and start the container
- Expose port 3000 to your host machine

### 3. Access the application

Open your web browser and navigate to:

```
http://localhost:3000
```

You should see the greeting message and the current date/time.

## Docker Compose Commands

### Start the application (foreground)
```bash
docker-compose up
```

### Start the application (background/detached mode)
```bash
docker-compose up -d
```

### Stop the application
```bash
docker-compose down
```

### Rebuild and restart the application
```bash
docker-compose up --build
```

### View logs
```bash
docker-compose logs
```

### View running containers
```bash
docker-compose ps
```

## Manual Docker Commands (without Docker Compose)

If you prefer to use Docker directly:

### Build the image
```bash
docker build -t express-app .
```

### Run the container
```bash
docker run -p 3000:3000 express-app
```

## Development

The application uses volume mounting in docker-compose.yml, which means changes to `server.js` will be reflected when you restart the container (though you'll need to restart for Node.js changes to take effect).

To restart after making changes:
```bash
docker-compose restart
```

## Troubleshooting

**Port already in use:**
If port 3000 is already in use, you can modify the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Maps host port 8080 to container port 3000
```

**Container won't start:**
Check the logs with:
```bash
docker-compose logs web
```

## Deployment to a Server

### Step 1: Build and Push Image to Docker Hub

1. **Login to Docker Hub:**
```bash
docker login
```

2. **Build the image with your Docker Hub username:**
```bash
docker build -t YOUR_DOCKERHUB_USERNAME/docker-express-app:latest .
```

3. **Push to Docker Hub:**
```bash
docker push YOUR_DOCKERHUB_USERNAME/docker-express-app:latest
```

### Step 2: Deploy on Your Server

1. **On your server, create a directory:**
```bash
mkdir docker-express-app && cd docker-express-app
```

2. **Create or download the production docker-compose file:**
```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/docker-compose.prod.yml
```

Or manually create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  web:
    image: YOUR_DOCKERHUB_USERNAME/docker-express-app:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

3. **Pull and run the container:**
```bash
docker-compose pull
docker-compose up -d
```

The application will now be running on your server at `http://YOUR_SERVER_IP:3000`

### Updating the Deployment

When you make changes:
1. Rebuild and push the image from your development machine
2. On the server, pull and restart:
```bash
docker-compose pull
docker-compose up -d
```

## License

ISC
