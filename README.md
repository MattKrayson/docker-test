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
  - "7070:3000"  # Maps host port 8080 to container port 3000
```

**Container won't start:**
Check the logs with:
```bash
docker-compose logs web
```

## Deployment to a Server

### Option 1: Build Directly on the Server (Recommended if no local Docker)

1. **Push your code to GitHub** (see instructions above)

2. **On your server, clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

3. **Build and run with docker-compose:**
```bash
docker-compose up -d --build
```

That's it! The server will build and run the image locally.

### Option 2: Build and Push from Docker Hub

If Docker is installed on your development machine:

1. **Login to Docker Hub:**
```bash
docker login
```

2. **Build the image:**
```bash
docker build -t mattkrayson/docker-express-app:latest .
```

3. **Push to Docker Hub:**
```bash
docker push mattkrayson/docker-express-app:latest
```

4. **On your server, create `docker-compose.yml`:**
```yaml
services:
  web:
    image: mattkrayson/docker-express-app:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

5. **Pull and run:**
```bash
docker-compose pull
docker-compose up -d
```

### Updating the Deployment

**Option 1 (Git-based):**
```bash
git pull
docker-compose up -d --build
```

**Option 2 (Docker Hub):**
1. Rebuild and push from development machine
2. On server:
```bash
docker-compose pull
docker-compose up -d
```

## License

ISC
