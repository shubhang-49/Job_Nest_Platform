# Deployment Instructions

## Prerequisites
- Node.js 18+ and npm
- Go 1.21+
- MongoDB (local or Atlas)
- Python 3.9+
- Phantom Wallet browser extension

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Arpitkushwahaa/Job-Networking-Portal.git
cd Job-Networking-Portal
```

### 2. Setup Backend

```bash
cd backend

# Install Go dependencies
go mod download

# Create .env file
cp .env.example .env

# Edit .env with your configuration:
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: A strong secret key
# - SOLANA_ADMIN_WALLET: Your Solana devnet wallet address

# Run the backend
go run cmd/main.go
```

The backend will start on `http://localhost:8080`

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with:
# - REACT_APP_API_URL=http://localhost:8080
# - REACT_APP_ADMIN_WALLET=<your-admin-wallet>
# - REACT_APP_PLATFORM_FEE=0.0001

# Start development server
npm start
```

The frontend will start on `http://localhost:3000`

### 4. Setup AI Service

```bash
cd ai

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run AI service
python app.py
```

The AI service will start on `http://localhost:5000`

## Deployment

### Frontend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel --prod
```

3. Set environment variables in Vercel dashboard:
   - `REACT_APP_API_URL`
   - `REACT_APP_ADMIN_WALLET`
   - `REACT_APP_PLATFORM_FEE`
   - `REACT_APP_SOLANA_NETWORK`

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `cd backend && go build -o app cmd/main.go`
   - **Start Command**: `cd backend && ./app`
   - **Environment**: Go
4. Add environment variables in Render dashboard

### AI Service Deployment (Render)

1. Create a new Web Service on Render
2. Configure:
   - **Build Command**: `cd ai && pip install -r requirements.txt`
   - **Start Command**: `cd ai && gunicorn app:app`
   - **Environment**: Python 3
3. Add `gunicorn` to requirements.txt

### Database (MongoDB Atlas)

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Add to backend environment variables

## Environment Variables

### Backend (.env)
```env
PORT=8080
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-portal
JWT_SECRET=your-super-secret-jwt-key
SOLANA_ADMIN_WALLET=YOUR_SOLANA_WALLET_ADDRESS
SOLANA_NETWORK=devnet
AI_SERVICE_URL=https://your-ai-service.onrender.com
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend.onrender.com
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_ADMIN_WALLET=YOUR_ADMIN_WALLET_ADDRESS
REACT_APP_PLATFORM_FEE=0.0001
REACT_APP_AI_SERVICE_URL=https://your-ai-service.onrender.com
```

### AI Service (.env)
```env
PORT=5000
FLASK_ENV=production
```

## Testing the Application

1. **Register a new account** on the frontend
2. **Connect Phantom wallet** (make sure you're on Solana devnet)
3. **Create your profile** and let AI extract skills from your bio
4. **Browse jobs** and see match scores
5. **Post a job** by paying the platform fee in SOL
6. **Apply to jobs** and track applications

## Solana Devnet Setup

1. Install Phantom Wallet extension
2. Create a new wallet or import existing
3. Switch to Devnet in Phantom settings
4. Get test SOL from [Solana Faucet](https://faucet.solana.com/)

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure all environment variables are set
- Check if port 8080 is available

### Frontend can't connect to backend
- Verify REACT_APP_API_URL is correct
- Check CORS configuration in backend
- Ensure backend is running

### Phantom wallet connection fails
- Make sure Phantom extension is installed
- Check if you're on the correct network (devnet)
- Refresh the page and try again

### Payment fails
- Ensure you have enough SOL in your wallet
- Check admin wallet address is correct
- Verify you're on devnet network

## Production Checklist

- [ ] Update JWT_SECRET to a strong random value
- [ ] Use production MongoDB cluster
- [ ] Enable HTTPS for all services
- [ ] Set up proper CORS origins
- [ ] Add rate limiting
- [ ] Enable logging and monitoring
- [ ] Set up backup for database
- [ ] Test all payment flows on mainnet
- [ ] Add error tracking (Sentry)
- [ ] Enable API authentication
- [ ] Add input validation
- [ ] Secure environment variables

## Support

For issues or questions, please open an issue on GitHub or contact the development team.
