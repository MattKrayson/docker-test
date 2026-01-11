# Image to Base64 Converter

A full-stack React + Express application that converts images to Base64 encoded strings. Built with Bootstrap styling and fully containerized with Docker.

## Features

- 📤 **Upload Images**: Support for JPG, PNG, GIF, WebP, SVG, and BMP formats
- 🔄 **Instant Conversion**: Convert images to Base64 encoded strings
- 👁️ **Live Preview**: See your image before conversion
- 📋 **Copy to Clipboard**: One-click copy functionality
- 🎨 **Bootstrap UI**: Modern, responsive design
- 🐳 **Fully Dockerized**: Easy deployment anywhere
- 📦 **Pull from Docker Hub**: Deploy without building

## Tech Stack

- **Frontend**: React 18, Bootstrap 5
- **Backend**: Express.js, Multer
- **Containerization**: Docker, Docker Compose

## Project Structure

```
docker-test/
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── ImageUploader.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server.js               # Express backend
├── package.json            # Server dependencies
├── Dockerfile              # Multi-stage build
├── docker-compose.yml      # Development compose
├── docker-compose.prod.yml # Production compose
└── README.md
```

## Quick Start (Development)

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Run with Docker Compose

```bash
git clone <your-repo-url>
cd docker-test
docker-compose up --build
```

Access the app at **http://localhost:5000**

## Deployment to Server

### Option 1: Pull from Docker Hub (Recommended)

1. **On your server, create `docker-compose.yml`:**

```yaml
services:
  web:
    image: mattkrayson/image-to-base64:latest
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

2. **Pull and run:**

```bash
docker-compose pull
docker-compose up -d
```

The app will be running at `http://YOUR_SERVER_IP:5000`

### Option 2: Build on Server

```bash
# Clone the repository
git clone <your-repo-url>
cd docker-test

# Build and run
docker-compose up -d --build
```

## Publishing to Docker Hub

If you want to push your own version:

```bash
# Login to Docker Hub
docker login

# Build the image
docker build -t YOUR_USERNAME/image-to-base64:latest .

# Push to Docker Hub
docker push YOUR_USERNAME/image-to-base64:latest
```

Then update `docker-compose.prod.yml` with your image name.

## Docker Commands

### Start the application
```bash
docker-compose up -d
```

### Stop the application
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
```

### Rebuild after changes
```bash
docker-compose up -d --build
```

## Local Development (without Docker)

### Backend

```bash
npm install
npm start
```

Server runs on http://localhost:5000

### Frontend

```bash
cd client
npm install
npm start
```

Development server runs on http://localhost:3000 (proxies to backend)

## API Endpoints

### POST /api/upload

Upload an image and receive Base64 encoded string.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `image` file field

**Response:**
```json
{
  "success": true,
  "base64": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "filename": "example.png",
  "size": 12345,
  "mimetype": "image/png"
}
```

## Configuration

- **Port**: Default is 5000 (change in `server.js` and docker-compose files)
- **File Size Limit**: 10MB (configurable in `server.js`)
- **Allowed Formats**: jpeg, jpg, png, gif, webp, svg, bmp

## Troubleshooting

**Port already in use:**
```yaml
# In docker-compose.yml, change:
ports:
  - "8080:5000"  # Use port 8080 on host
```

**Container won't start:**
```bash
docker-compose logs web
```

**Image too large:**
Increase the file size limit in `server.js`:
```javascript
limits: {
  fileSize: 20 * 1024 * 1024, // 20MB
}
```

## License

ISC
