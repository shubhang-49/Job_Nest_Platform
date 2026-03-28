# API Documentation

## Base URL
- Development: `http://localhost:8080`
- Production: `https://your-backend.onrender.com`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Full-stack developer with 5 years of experience",
  "linkedinUrl": "https://linkedin.com/in/johndoe"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Full-stack developer...",
    "linkedinUrl": "https://linkedin.com/in/johndoe",
    "skills": []
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Profiles

#### Get Profile
```http
GET /api/profiles/:id
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/profiles/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "bio": "Updated bio",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "skills": ["JavaScript", "React", "Node.js"],
  "walletAddress": "7xK...abc"
}
```

#### Extract Skills
```http
POST /api/profiles/extract-skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "I am a developer with experience in React, Node.js, and MongoDB"
}
```

Response:
```json
{
  "skills": ["React", "Node.js", "MongoDB"]
}
```

### Jobs

#### Get All Jobs
```http
GET /api/jobs?search=developer&location=remote&jobType=Full-time&limit=10
```

Query Parameters:
- `search` (optional): Search term for title/description
- `location` (optional): Filter by location
- `jobType` (optional): Full-time, Part-time, Contract, Freelance
- `limit` (optional): Number of results to return

#### Get Job by ID
```http
GET /api/jobs/:id
```

#### Create Job
```http
POST /api/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Senior Full Stack Developer",
  "description": "We are looking for an experienced full-stack developer...",
  "company": "Tech Corp",
  "location": "Remote",
  "jobType": "Full-time",
  "salary": "$120,000 - $150,000",
  "skills": ["React", "Node.js", "MongoDB", "AWS"],
  "requirements": "5+ years of experience...",
  "walletAddress": "7xK...abc",
  "paymentSignature": "5VN...xyz"
}
```

#### Update Job
```http
PUT /api/jobs/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### Delete Job
```http
DELETE /api/jobs/:id
Authorization: Bearer <token>
```

#### Apply to Job
```http
POST /api/jobs/:id/apply
Authorization: Bearer <token>
Content-Type: application/json

{
  "coverLetter": "I am very interested in this position..."
}
```

### Payments

#### Verify Payment
```http
POST /api/payments/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "signature": "5VN...xyz",
  "amount": 0.0001
}
```

#### Get Payment History
```http
GET /api/payments/history
Authorization: Bearer <token>
```

### AI Features

#### Calculate Job Match
```http
POST /api/ai/match
Authorization: Bearer <token>
Content-Type: application/json

{
  "jobId": "507f1f77bcf86cd799439011"
}
```

Response:
```json
{
  "matchScore": 85.5,
  "details": {
    "skillMatch": 90.0,
    "experienceMatch": 80.0,
    "locationMatch": 100.0
  }
}
```

#### Extract Skills (AI)
```http
POST /api/ai/extract-skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Experienced developer with React, Node.js, Python, and AWS"
}
```

Response:
```json
{
  "skills": ["React", "Node.js", "Python", "AWS"],
  "confidence": 0.92
}
```

#### Get Recommendations
```http
GET /api/ai/recommendations
Authorization: Bearer <token>
```

### User Stats

#### Get User Statistics
```http
GET /api/users/stats
Authorization: Bearer <token>
```

Response:
```json
{
  "totalApplications": 5,
  "activeJobs": 2,
  "matchedJobs": 15,
  "profileViews": 120
}
```

## Error Responses

All endpoints may return these error responses:

```json
{
  "error": "Error message"
}
```

Common status codes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Rate Limiting

API requests are limited to:
- Authenticated users: 100 requests per minute
- Unauthenticated users: 20 requests per minute

## Webhooks (Future Feature)

Coming soon: Webhooks for job applications and payment confirmations.
