# Quick Start Guide

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Go 1.21+ installed
- [ ] Python 3.9+ installed
- [ ] MongoDB installed or Atlas account
- [ ] Phantom Wallet extension installed
- [ ] Git installed

## 5-Minute Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Arpitkushwahaa/Job-Networking-Portal.git
cd Job-Networking-Portal

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
go mod download
cd ..

# Setup AI service
cd ai
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

### 2. Configure Environment

#### Backend (.env)
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

#### Frontend (.env)
```bash
cd frontend
cp .env.example .env
# Edit .env with your Solana admin wallet address
```

### 3. Start Services

#### Option A: Windows
```bash
start-dev.bat
```

#### Option B: Linux/Mac
```bash
chmod +x start-dev.sh
./start-dev.sh
```

#### Option C: Manual
```bash
# Terminal 1 - Backend
cd backend
go run cmd/main.go

# Terminal 2 - AI Service
cd ai
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py

# Terminal 3 - Frontend
cd frontend
npm start
```

### 4. Open Application

Visit `http://localhost:3000` in your browser

### 5. Get Devnet SOL

1. Install Phantom Wallet
2. Switch to Devnet in settings
3. Copy your wallet address
4. Visit https://faucet.solana.com/
5. Paste address and request SOL

## First Steps

1. **Register** a new account
2. **Connect** your Phantom wallet
3. **Complete** your profile (AI will extract skills from your bio!)
4. **Browse** available jobs
5. **Post** a job (requires 0.0001 SOL payment)
6. **Apply** to jobs and see your match scores

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running
- Check connection string in backend/.env
- Use MongoDB Atlas if local setup fails

### Phantom Not Connecting
- Ensure extension is installed
- Switch to Devnet in Phantom settings
- Refresh the page

### Port Already in Use
- Frontend: Change port in package.json
- Backend: Change PORT in .env
- AI Service: Change PORT in ai/.env

## Need Help?

- Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions
- See [API.md](API.md) for API documentation
- Open an issue on GitHub

## Next Steps

- [ ] Customize your profile
- [ ] Connect with other users
- [ ] Post or apply to jobs
- [ ] Explore AI-powered matching
- [ ] Test blockchain payments

---

**Built with ❤️ for RizeOS Core Team Internship**
