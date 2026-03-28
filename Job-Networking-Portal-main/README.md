# Job & Networking Portal 🚀

> **Built for RizeOS Core Team Internship Assessment**

A full-stack Web3-enabled job and networking platform inspired by LinkedIn, Upwork, and AngelList, featuring AI-powered job matching, blockchain payments, and social networking capabilities.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Go](https://img.shields.io/badge/Go-1.21-blue)](https://golang.org/)
[![Python](https://img.shields.io/badge/Python-3.9-blue)](https://python.org/)
[![Solana](https://img.shields.io/badge/Blockchain-Solana-purple)](https://solana.com/)

[🚀 Quick Start](QUICKSTART.md) | [📚 API Docs](API.md) | [🔧 Deployment](DEPLOYMENT.md) | [🤝 Contributing](CONTRIBUTING.md)

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure JWT-based authentication system
- **Profile Management**: Create and manage professional profiles with AI-powered skill extraction
- **Job Posting & Feed**: Post jobs, share updates, and browse opportunities
- **Advanced Search**: Filter jobs by skills, location, and tags
- **Blockchain Integration**: Web3 wallet connection with Solana/Phantom for payment processing
- **AI-Powered Matching**: Intelligent job-to-candidate matching using NLP
- **Skill Extraction**: Automatic skill parsing from resumes and bios

### Web3 Features
- **Wallet Integration**: Connect with Phantom (Solana) or MetaMask (Ethereum/Polygon)
- **Blockchain Payments**: Pay platform fees in SOL/ETH/MATIC before posting jobs
- **Transaction Verification**: On-chain payment confirmation before job posting

### AI/ML Features
- **Job Matching**: NLP-based similarity scoring between jobs and candidates
- **Skill Extraction**: Automatic skill identification from text
- **Smart Recommendations**: Personalized job and connection suggestions

## 🛠️ Tech Stack

### Frontend
- React.js 18
- Tailwind CSS
- Web3.js / @solana/web3.js
- Axios for API calls
- React Router for navigation

### Backend
- Golang (Go 1.21+)
- Gin Web Framework
- JWT for authentication
- MongoDB/PostgreSQL driver

### Database
- MongoDB

### Blockchain
- Solana Devnet
- Phantom Wallet

### AI/ML
- Natural Language Processing for skill extraction
- Cosine similarity for job matching

## 📁 Project Structure

```
Job-Networking-Portal/
├── frontend/                 # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API and Web3 services
│   │   ├── utils/           # Helper functions
│   │   ├── contexts/        # React contexts
│   │   └── App.js
│   └── package.json
│
├── backend/                  # Golang backend
│   ├── cmd/                 # Application entry points
│   ├── internal/
│   │   ├── handlers/        # HTTP request handlers
│   │   ├── models/          # Data models
│   │   ├── middleware/      # Middleware functions
│   │   ├── services/        # Business logic
│   │   └── database/        # Database connection
│   ├── pkg/                 # Public packages
│   ├── go.mod
│   └── go.sum
│
├── ai/                       # AI/ML components
│   ├── skill_extraction.py
│   ├── job_matching.py
│   └── requirements.txt
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Go 1.21+
- MongoDB (local or Atlas)
- Python 3.9+ (for AI features)
- Phantom Wallet browser extension

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/Arpitkushwahaa/Job-Networking-Portal.git
cd Job-Networking-Portal
```

#### 2. Setup Backend
```bash
cd backend
go mod download
cp .env.example .env
# Edit .env with your configuration
go run cmd/main.go
```

#### 3. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

#### 4. Setup AI Components
```bash
cd ai
pip install -r requirements.txt
python app.py
```

## 🔧 Configuration

### Backend Environment Variables (.env)
```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/job-portal
JWT_SECRET=your-secret-key
SOLANA_ADMIN_WALLET=your-admin-wallet-address
SOLANA_NETWORK=devnet
AI_SERVICE_URL=http://localhost:5000
```

### Frontend Environment Variables (.env)
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_ADMIN_WALLET=your-admin-wallet-address
REACT_APP_PLATFORM_FEE=0.0001
```

## 💳 Blockchain Integration

### Payment Flow
1. User connects Phantom wallet
2. Before posting a job, user pays platform fee (0.0001 SOL)
3. Transaction is signed and confirmed on Solana devnet
4. Job post is enabled only after successful payment
5. Payment is logged in database and on-chain

### Admin Wallet (Devnet)
```
Address: [Your devnet wallet address]
```

## 🤖 AI Features

### Skill Extraction
- Parses resumes and bios using NLP
- Extracts top skills automatically
- Updates user profile with identified skills

### Job Matching
- Calculates match score between job descriptions and candidate profiles
- Uses TF-IDF vectorization and cosine similarity
- Provides percentage match with detailed breakdown

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Profiles
- `GET /api/profiles/:id` - Get user profile
- `PUT /api/profiles/:id` - Update profile
- `POST /api/profiles/extract-skills` - AI skill extraction

### Jobs
- `GET /api/jobs` - List all jobs (with filters)
- `POST /api/jobs` - Create job posting
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs/:id/apply` - Apply to job

### Payments
- `POST /api/payments/verify` - Verify blockchain payment
- `GET /api/payments/history` - Payment history

### AI
- `POST /api/ai/match` - Calculate job match score
- `POST /api/ai/extract-skills` - Extract skills from text
- `GET /api/ai/recommendations` - Get personalized recommendations

## 🎨 UI/UX Features

- Modern, responsive design with Tailwind CSS
- Dark/Light mode support
- Smooth animations and transitions
- Mobile-first approach
- Accessible components (WCAG 2.1)

## 🧪 Testing

### Backend Tests
```bash
cd backend
go test ./...
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Render)
```bash
# Connect your GitHub repo to Render
# Set environment variables in Render dashboard
```

## 🎥 Demo Video

[Link to demo video - 15-20 minutes walkthrough]

## 👥 Contributing

This is an assessment project for RizeOS Core Team Internship.

## 📄 License

MIT License

## 🙏 Acknowledgments

- Inspired by LinkedIn, Upwork, and AngelList
- Built for RizeOS Core Team Internship Assessment
- Blockchain: Solana
- AI/ML: Natural Language Processing

## 📧 Contact

For questions or feedback, please reach out to [kushwahaarpit360@gmail.com]

---

**Built with ❤️ by Arpit Kushwaha*
