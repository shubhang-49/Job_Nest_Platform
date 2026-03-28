# AI Service for Job & Networking Portal

This directory contains the AI/ML service for skill extraction and job matching.

## Features

- **Skill Extraction**: Automatically extract technical skills from resumes and bios
- **Job Matching**: Calculate match scores between jobs and candidates using NLP
- **Recommendations**: Provide personalized job recommendations

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the service:
```bash
python app.py
```

The service will start on `http://localhost:5000`

## API Endpoints

### Extract Skills
```
POST /api/extract-skills
{
  "text": "I am a full-stack developer with experience in React, Node.js, and MongoDB"
}
```

### Calculate Match Score
```
POST /api/match-score
{
  "jobDescription": "Looking for a React developer...",
  "candidateBio": "Experienced React developer...",
  "jobSkills": ["React", "JavaScript"],
  "candidateSkills": ["React", "JavaScript", "Node.js"]
}
```

### Get Recommendations
```
POST /api/recommendations
{
  "candidateBio": "Experienced developer...",
  "candidateSkills": ["React", "Node.js"],
  "jobs": [...]
}
```
