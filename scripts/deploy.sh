#!/bin/bash

# Production Deployment Script
set -e

echo "🚀 Starting production deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create it from env.example"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build the application
echo "🔨 Building application..."
npm run build

# Run tests (if any)
echo "🧪 Running tests..."
npm test

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t graphql-api:latest .

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down || true

# Start new containers
echo "🚀 Starting new containers..."
docker-compose up -d

# Wait for health check
echo "⏳ Waiting for application to be healthy..."
sleep 10

# Check health
echo "🏥 Checking application health..."
if curl -f http://localhost:4000/healthz; then
    echo "✅ Application is healthy!"
else
    echo "❌ Application health check failed!"
    docker-compose logs
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo "📊 Application is running at: http://localhost:4000"
echo "🔍 GraphQL Playground: http://localhost:4000/graphql"
