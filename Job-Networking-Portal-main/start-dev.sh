#!/bin/bash

echo "🚀 Starting Job & Networking Portal Development Environment..."

# Start MongoDB (if installed locally)
if command -v mongod &> /dev/null
then
    echo "📦 Starting MongoDB..."
    mongod --dbpath ./data/db &
fi

# Start Backend
echo "🔧 Starting Backend..."
cd backend
go run cmd/main.go &
BACKEND_PID=$!
cd ..

# Start AI Service
echo "🤖 Starting AI Service..."
cd ai
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null
python app.py &
AI_PID=$!
cd ..

# Start Frontend
echo "⚛️ Starting Frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ All services started!"
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend: http://localhost:8080"
echo "📍 AI Service: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $AI_PID $FRONTEND_PID; exit" INT
wait
