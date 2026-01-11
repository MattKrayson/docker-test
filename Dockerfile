# Multi-stage build for React + Express app
# Stage 1: Build React frontend
FROM node:18-alpine AS client-build

WORKDIR /app/client

# Copy client package files
COPY client/package*.json ./

# Install client dependencies
RUN npm install

# Copy client source
COPY client/ ./

# Build React app
RUN npm run build

# Stage 2: Setup Express server
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy server package files
COPY package*.json ./

# Install server dependencies
RUN npm install --only=production

# Copy server source
COPY server.js ./

# Copy built React app from previous stage
COPY --from=client-build /app/client/build ./client/build

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
