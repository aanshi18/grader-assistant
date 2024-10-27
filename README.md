# Assess.AI

Assess.AI is an AI-powered academic assessment platform designed to streamline the grading process, allowing graders and TAs to focus on student engagement. 

## Acknowledgements
- Arizona State University
- SoDA Club
- SoDAhacks Sponsors

## Project Overview 📖
Assess.AI automates the assessment process in educational settings, using a combination of natural language processing, embedding-based similarity scoring, and AI detection for academic integrity. The platform offers real-time feedback, suggestions for student improvement, and references to course resources, reducing the workload on graders and TAs.

## Key Features 🌟
- Automated Similarity Evaluation: Compares student responses to ideal answers and scores them on a scale of 0-1.
- AI Detection: Analyzes whether a student's response is AI-generated, assisting with academic integrity.
- Constructive Feedback: Provides specific suggestions to help students improve their answers.
- Video Timestamp References: Directs students to relevant lecture segments based on the question.
- Query Assistance: Enables students to submit specific questions for additional support from graders or TAs.


## How It Works ⚙️ 
- Course Material Upload: Faculty uploads digital course materials, which are parsed and stored in the backend.
- Question Creation: Faculty sets questions via the frontend, with corresponding answers stored securely.
- Answer Comparison: Students' responses are compared to faculty-provided answers using generative AI, yielding:
- Similarity Score: A 0-1 rating on response relevance.
AI Detection: Checks if the answer is AI-generated.
- Feedback & Resources: Students receive feedback, improvement suggestions, and timestamped video references for further learning.
- Query Support: Students can submit queries for additional help, which graders address during discussion sessions.

## Tech Stack 🛠️
- Backend: Python, FastAPI
- Database: ChromaDB (for structured data and embeddings)
- Embedding Models: SentenceTransformer (all-MiniLM-L6-v2)
- Similarity Comparison: Llama (Llama-3.1-70b-versatile)
- Frontend: ReactJS
- AI Detection: GPTZero API
- Additional Libraries:
PyMuPDF (Fitz) for PDF parsing, LangChain for structured prompt management, HTTPX for API requests

## Installation & Setup 🧩
1) Clone the repository:
```bash
git clone https://github.com/yourusername/assess-io.git
cd assess-io
```

2) Install backend dependencies(Navigate to backend directory and install dependencies):
```bash
pip install -r requirements.txt
```

3) Run the FastAPI server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

4) Frontend setup (Navigate to frontend directory and install dependencies):
```bash
cd frontend
npm install
npm start
```

5) Environment Configuration:
Create a .env file in the root directory with API keys and environment-specific variables, including:
```plaintext
GROQ_API_KEY=<your_groq_api_key>
GPTZERO_API_KEY=<your_gptzero_api_key>
```

## Future Enhancements 📚
- Enhanced Feedback Types: More detailed feedback such as tips and resources.
- Live Q&A: Real-time interaction with TAs for immediate support.
- Advanced Analytics: Performance insights for faculty on student progress and trends.

## Contribution

Current contributors: [Sreekar Gadasu](https://github.com/sr33kar) | [Shrey Malvi](https://github.com/malvishrey) | [Yash Gandhi](https://github.com/YashGandhi17) | [Aanshi Patwari](https://github.com/aanshi18)

# 

Feel free to reach out to any contributors if you have any questions or feedback. Happy learning with Assess.AI! 🎉



