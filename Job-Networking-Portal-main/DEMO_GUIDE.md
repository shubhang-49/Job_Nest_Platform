# Demo Video Script & Testing Guide

## 🎥 Demo Video Script (15-20 minutes)

### Introduction (2 minutes)
"Hello! I'm excited to present the Job & Networking Portal - a full-stack Web3-enabled platform I built for the RizeOS Core Team Internship assessment. This application combines modern web technologies with blockchain and AI to create a unique job marketplace experience."

**Show:**
- GitHub repository overview
- Project structure
- Technology stack badges

### Part 1: Architecture Overview (3 minutes)
"Let me walk you through the architecture..."

**Show:**
- Frontend: React + Tailwind CSS
- Backend: Golang + Gin framework
- Database: MongoDB
- AI Service: Python Flask with NLP
- Blockchain: Solana integration

**Demonstrate:**
- Project folder structure
- Key files in each layer
- How services communicate

### Part 2: Authentication & Profiles (3 minutes)
"First, let's create an account..."

**Demonstrate:**
1. Navigate to landing page
2. Show features section
3. Click "Sign Up"
4. Fill registration form with bio
5. Submit and show JWT token generation (in DevTools)
6. Show dashboard after login
7. Navigate to profile
8. Click "Extract Skills" button
9. Show AI-extracted skills from bio
10. Edit profile and save

**Highlight:**
- Password hashing with bcrypt
- JWT authentication
- AI skill extraction in action

### Part 3: Wallet Integration (3 minutes)
"Now let's connect a Web3 wallet..."

**Demonstrate:**
1. Click "Connect Wallet" button
2. Phantom wallet popup
3. Approve connection
4. Show wallet address in navbar
5. Display SOL balance
6. Explain devnet vs mainnet

**Highlight:**
- Solana Web3.js integration
- Phantom wallet compatibility
- Balance checking

### Part 4: Job Posting with Blockchain Payment (4 minutes)
"Here's where blockchain meets traditional job posting..."

**Demonstrate:**
1. Navigate to "Post Job"
2. Fill job posting form
   - Title: "Senior Full-Stack Developer"
   - Company: "TechCorp"
   - Location: "Remote"
   - Skills: React, Node.js, MongoDB
   - Salary: $120k-150k
3. Click "Continue to Payment"
4. Show payment confirmation screen
5. Click "Pay 0.0001 SOL & Publish"
6. Phantom wallet transaction approval
7. Wait for blockchain confirmation
8. Show success message
9. Navigate to job feed to see posted job

**Highlight:**
- Payment-gated feature
- Transaction signing
- Blockchain verification
- Payment logging

### Part 5: AI-Powered Job Matching (3 minutes)
"Let's see the AI in action..."

**Demonstrate:**
1. Browse job feed
2. Click on a job
3. Show match score calculation
4. Explain how it works:
   - TF-IDF vectorization
   - Cosine similarity
   - Skill overlap analysis
5. Show match breakdown:
   - Skill match: X%
   - Text similarity: Y%
   - Overall: Z%
6. Apply to job with cover letter

**Highlight:**
- Real NLP algorithm
- Not mocked data
- Detailed match breakdown

### Part 6: Dashboard & Analytics (2 minutes)
"The dashboard provides an overview..."

**Demonstrate:**
1. Show statistics cards
2. Browse recent jobs
3. View applications
4. Check payment history
5. Navigate between sections

**Highlight:**
- Clean UI
- Real-time data
- Responsive design

### Conclusion (2 minutes)
"Let me summarize what we've built..."

**Recap:**
- ✅ Full-stack application
- ✅ JWT authentication
- ✅ Blockchain integration
- ✅ AI/ML features
- ✅ Modern UI/UX
- ✅ Production-ready code
- ✅ Comprehensive documentation

**Next Steps:**
- Deployment to production
- Adding more AI features
- Implementing smart contracts
- Building mobile app

**Thank You:**
"Thank you for watching! I'm excited about the opportunity to join the RizeOS Core Team. The code is available on GitHub, and I'm happy to answer any questions."

---

## 🧪 Manual Testing Checklist

### Authentication
- [ ] Register new user
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Access protected route without login (should redirect)
- [ ] Logout functionality
- [ ] Token expiration handling

### Profile Management
- [ ] View own profile
- [ ] Edit profile information
- [ ] Extract skills from bio
- [ ] Update wallet address
- [ ] View other user's profile

### Wallet Integration
- [ ] Connect Phantom wallet
- [ ] Disconnect wallet
- [ ] View balance
- [ ] Wallet persistence (refresh page)
- [ ] Switch networks

### Job Posting
- [ ] Create job without payment (should fail)
- [ ] Create job with wallet connected
- [ ] Payment transaction flow
- [ ] Transaction confirmation
- [ ] Job appears in feed
- [ ] Edit own job
- [ ] Delete own job
- [ ] Cannot edit others' jobs

### Job Browsing
- [ ] View job feed
- [ ] Search jobs by keyword
- [ ] Filter by location
- [ ] Filter by job type
- [ ] View job details
- [ ] See applicant count

### Job Applications
- [ ] Apply to job
- [ ] View match score
- [ ] Submit cover letter
- [ ] View application status
- [ ] Cannot apply twice to same job

### AI Features
- [ ] Skill extraction works
- [ ] Match score calculation
- [ ] Recommendations generation
- [ ] Skills are relevant

### UI/UX
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Loading states display
- [ ] Error messages show
- [ ] Success notifications appear
- [ ] Navigation works
- [ ] Links are correct

### Performance
- [ ] Pages load quickly
- [ ] No console errors
- [ ] Images load properly
- [ ] API responses are fast

---

## 🎬 Demo Scenarios

### Scenario 1: Job Seeker
1. Register as "Alice Johnson"
2. Add bio about being a React developer
3. Extract skills (should find React, JavaScript, etc.)
4. Connect wallet
5. Browse jobs
6. Find job with high match score
7. Apply with personalized cover letter
8. Check dashboard for application status

### Scenario 2: Job Poster
1. Register as "Bob Smith" (recruiter)
2. Complete profile
3. Connect wallet (ensure 0.0001 SOL balance)
4. Create job posting
5. Pay platform fee
6. Confirm transaction in Phantom
7. View published job
8. Check applicants

### Scenario 3: AI Showcase
1. Login with existing account
2. Navigate to profile
3. Add detailed bio with multiple skills
4. Click "Extract Skills"
5. Show extracted skills list
6. Browse jobs
7. Click on various jobs
8. Compare match scores
9. Explain why scores differ

---

## 📸 Screenshot Guide

### For Documentation
1. Landing page hero section
2. Registration form
3. Dashboard with stats
4. Job feed with filters
5. Job details page
6. Create job form
7. Payment confirmation screen
8. Phantom wallet transaction
9. Match score display
10. User profile page
11. AI skill extraction result
12. Mobile responsive views

### For Demo Video
- Record in 1080p
- Use screen recording software (OBS, Loom, etc.)
- Include webcam in corner (optional)
- Use clear audio
- Show cursor highlights
- Zoom in on important parts
- Add chapter markers:
  - 00:00 - Introduction
  - 02:00 - Architecture
  - 05:00 - Authentication
  - 08:00 - Wallet Integration
  - 11:00 - Blockchain Payment
  - 15:00 - AI Features
  - 18:00 - Conclusion

---

## 🐛 Common Issues & Solutions

### Phantom Not Connecting
**Solution:** Refresh page, ensure Phantom is unlocked, check network

### Payment Fails
**Solution:** Check SOL balance, verify admin wallet address, ensure devnet

### Skills Not Extracting
**Solution:** Check AI service is running, verify bio has content

### Jobs Not Loading
**Solution:** Check backend is running, verify MongoDB connection

### Match Score Shows 0
**Solution:** Ensure user has skills in profile, job has skills listed

---

## ✅ Pre-Recording Checklist

- [ ] All services running (Frontend, Backend, AI)
- [ ] MongoDB connected
- [ ] Phantom wallet installed and funded with devnet SOL
- [ ] Test account created
- [ ] Sample jobs posted
- [ ] Clear browser cache
- [ ] Close unnecessary tabs
- [ ] Disable notifications
- [ ] Prepare script notes
- [ ] Test microphone
- [ ] Test screen recording
- [ ] Practice demo flow

---

## 🎤 Talking Points

### Why This Stack?
- React: Popular, modern, great developer experience
- Golang: Fast, efficient, great for APIs
- MongoDB: Flexible schema for evolving data models
- Solana: Fast, low-cost blockchain
- Python + ML: Best tools for AI/NLP

### Key Differentiators
- Real blockchain integration (not mocked)
- Actual AI/ML algorithms
- Production-ready code
- Comprehensive documentation
- Clean, modern UI
- Full-stack implementation

### What I Learned
- Solana Web3 development
- NLP and machine learning
- Golang backend architecture
- React context API patterns
- System design at scale

---

**Good luck with your demo! 🚀**
