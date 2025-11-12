#!/bin/bash

echo "🎶 Starting Music Library Organizer..."
echo

echo "Creating uploads directory..."
mkdir -p uploads/songs

echo "Starting Docker containers..."
docker-compose up --build -d

echo
echo "✅ Music Library Organizer is starting up!"
echo
echo "📱 Frontend: http://localhost"
echo "🔧 Backend API: http://localhost:8080"
echo "🗄️ Database: localhost:3306"
echo
echo "Wait a few moments for all services to start..."
echo