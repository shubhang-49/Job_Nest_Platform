from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import os

app = Flask(__name__)
CORS(app)

# Download NLTK data (run once)
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('punkt')
    nltk.download('stopwords')

# Common technical skills database
COMMON_SKILLS = {
    'programming': ['python', 'javascript', 'java', 'c++', 'c#', 'ruby', 'go', 'rust', 'php', 'swift', 'kotlin', 'typescript', 'scala'],
    'web': ['react', 'angular', 'vue', 'nodejs', 'express', 'django', 'flask', 'fastapi', 'nextjs', 'nuxtjs', 'svelte'],
    'mobile': ['react native', 'flutter', 'ios', 'android', 'xamarin', 'ionic'],
    'database': ['mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch', 'cassandra', 'dynamodb', 'sqlite'],
    'cloud': ['aws', 'azure', 'gcp', 'heroku', 'digitalocean', 'kubernetes', 'docker', 'terraform'],
    'ml_ai': ['tensorflow', 'pytorch', 'keras', 'scikit-learn', 'opencv', 'nlp', 'machine learning', 'deep learning', 'ai'],
    'tools': ['git', 'github', 'gitlab', 'jenkins', 'circleci', 'travis', 'jira', 'confluence'],
    'other': ['rest api', 'graphql', 'websockets', 'microservices', 'agile', 'scrum', 'devops', 'ci/cd']
}

# Flatten all skills into a single list
ALL_SKILLS = []
for category in COMMON_SKILLS.values():
    ALL_SKILLS.extend(category)

def extract_skills_from_text(text):
    """
    Extract skills from text using pattern matching and NLP
    """
    text_lower = text.lower()
    found_skills = []
    
    # Direct matching with common skills
    for skill in ALL_SKILLS:
        # Use word boundaries to avoid partial matches
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            found_skills.append(skill.title())
    
    # Remove duplicates and sort
    found_skills = list(set(found_skills))
    
    # Additional heuristics: look for capitalized words that might be technologies
    words = word_tokenize(text)
    for word in words:
        if word.isupper() and len(word) > 1:  # Acronyms like AWS, GCP
            if word.lower() in ALL_SKILLS:
                found_skills.append(word)
    
    return list(set(found_skills))

def calculate_match_score(job_description, candidate_bio, job_skills=None, candidate_skills=None):
    """
    Calculate match score between job and candidate using TF-IDF and cosine similarity
    """
    # Combine text for comparison
    texts = [job_description, candidate_bio]
    
    # Create TF-IDF vectors
    vectorizer = TfidfVectorizer(stop_words='english', max_features=500)
    tfidf_matrix = vectorizer.fit_transform(texts)
    
    # Calculate cosine similarity
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    
    # Convert to percentage
    text_match = similarity * 100
    
    # Calculate skill match if skills provided
    skill_match = 0
    if job_skills and candidate_skills:
        job_skills_set = set([s.lower() for s in job_skills])
        candidate_skills_set = set([s.lower() for s in candidate_skills])
        
        if job_skills_set:
            matching_skills = job_skills_set.intersection(candidate_skills_set)
            skill_match = (len(matching_skills) / len(job_skills_set)) * 100
    
    # Weighted average (60% skills, 40% text similarity)
    if skill_match > 0:
        overall_match = (skill_match * 0.6) + (text_match * 0.4)
    else:
        overall_match = text_match
    
    return {
        'overall_match': round(overall_match, 2),
        'skill_match': round(skill_match, 2),
        'text_match': round(text_match, 2),
        'matching_skills': list(set([s.lower() for s in (job_skills or [])]).intersection(set([s.lower() for s in (candidate_skills or [])]))) if job_skills and candidate_skills else []
    }

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'AI Service is running'})

@app.route('/api/extract-skills', methods=['POST'])
def extract_skills():
    """
    Extract skills from provided text
    """
    data = request.get_json()
    
    if not data or 'text' not in data:
        return jsonify({'error': 'Text is required'}), 400
    
    text = data['text']
    skills = extract_skills_from_text(text)
    
    return jsonify({
        'skills': skills,
        'count': len(skills),
        'confidence': 0.85 if len(skills) > 0 else 0.0
    })

@app.route('/api/match-score', methods=['POST'])
def match_score():
    """
    Calculate match score between job and candidate
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'Request data is required'}), 400
    
    job_description = data.get('jobDescription', '')
    candidate_bio = data.get('candidateBio', '')
    job_skills = data.get('jobSkills', [])
    candidate_skills = data.get('candidateSkills', [])
    
    if not job_description or not candidate_bio:
        return jsonify({'error': 'Job description and candidate bio are required'}), 400
    
    result = calculate_match_score(job_description, candidate_bio, job_skills, candidate_skills)
    
    return jsonify(result)

@app.route('/api/recommendations', methods=['POST'])
def recommendations():
    """
    Get job recommendations for a candidate
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'Request data is required'}), 400
    
    candidate_bio = data.get('candidateBio', '')
    candidate_skills = data.get('candidateSkills', [])
    jobs = data.get('jobs', [])
    
    if not jobs:
        return jsonify({'recommendations': []})
    
    # Calculate match scores for all jobs
    recommendations = []
    for job in jobs:
        match = calculate_match_score(
            job.get('description', ''),
            candidate_bio,
            job.get('skills', []),
            candidate_skills
        )
        
        recommendations.append({
            'jobId': job.get('id'),
            'title': job.get('title'),
            'company': job.get('company'),
            'matchScore': match['overall_match'],
            'matchDetails': match
        })
    
    # Sort by match score
    recommendations.sort(key=lambda x: x['matchScore'], reverse=True)
    
    # Return top 10
    return jsonify({
        'recommendations': recommendations[:10],
        'total': len(recommendations)
    })

@app.route('/api/skills/categories', methods=['GET'])
def get_skill_categories():
    """
    Return all available skill categories
    """
    return jsonify({
        'categories': COMMON_SKILLS,
        'total_skills': len(ALL_SKILLS)
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
