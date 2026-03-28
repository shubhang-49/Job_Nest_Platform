#!/bin/bash

echo "========================================"
echo "Job & Networking Portal Setup Checker"
echo "========================================"
echo ""

echo "Checking prerequisites..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "[1/5] Checking Node.js..."
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js found:${NC} $(node --version)"
else
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    echo "Download from: https://nodejs.org/"
fi
echo ""

# Check Go
echo "[2/5] Checking Go..."
if command -v go &> /dev/null; then
    echo -e "${GREEN}✅ Go found:${NC} $(go version)"
else
    echo -e "${RED}❌ Go not found. Please install Go 1.21+${NC}"
    echo "Download from: https://golang.org/dl/"
fi
echo ""

# Check Python
echo "[3/5] Checking Python..."
if command -v python3 &> /dev/null; then
    echo -e "${GREEN}✅ Python found:${NC} $(python3 --version)"
elif command -v python &> /dev/null; then
    echo -e "${GREEN}✅ Python found:${NC} $(python --version)"
else
    echo -e "${RED}❌ Python not found. Please install Python 3.9+${NC}"
    echo "Download from: https://python.org/"
fi
echo ""

# Check MongoDB
echo "[4/5] Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✅ MongoDB found${NC}"
else
    echo -e "${YELLOW}⚠️  MongoDB not found locally. You can use MongoDB Atlas instead.${NC}"
    echo "Sign up at: https://www.mongodb.com/cloud/atlas"
fi
echo ""

# Check Git
echo "[5/5] Checking Git..."
if command -v git &> /dev/null; then
    echo -e "${GREEN}✅ Git found:${NC} $(git --version)"
else
    echo -e "${RED}❌ Git not found. Please install Git${NC}"
    echo "Download from: https://git-scm.com/"
fi
echo ""

echo "========================================"
echo "Setup Recommendations:"
echo "========================================"
echo ""
echo "1. Install missing prerequisites"
echo "2. Install Phantom Wallet browser extension"
echo "3. Run: npm install (in frontend folder)"
echo "4. Run: go mod download (in backend folder)"
echo "5. Create Python venv: python -m venv venv (in ai folder)"
echo "6. Copy .env.example to .env in each folder"
echo "7. Update .env files with your configuration"
echo ""
echo "For detailed instructions, see QUICKSTART.md"
echo ""
