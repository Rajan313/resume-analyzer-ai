# 🚀 AI Resume Analyzer

An AI-powered full-stack web application that analyzes resumes against job descriptions and provides an ATS-style match score, strengths, missing skills, and personalized improvement suggestions using Large Language Models (Groq LLM).

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- BCrypt Password Encryption
- Protected APIs

### 📄 Resume Management
- Upload Resume (PDF)
- Store Resume Metadata
- Extract Resume Text using Apache PDFBox
- Store Extracted Text in PostgreSQL

### 🤖 AI Resume Analysis
- Analyze Resume against Job Description
- ATS Match Score
- Identify Strengths
- Detect Missing Skills
- Suggest Improvements
- Save Analysis History

### 📊 Analysis History
- View Previous Resume Analyses
- Track Match Scores
- View Analysis Date & Time

---

# 🛠 Tech Stack

## Backend

- Java 21
- Spring Boot 4
- Spring Security
- Spring Data JPA
- Hibernate
- PostgreSQL
- JWT Authentication
- Apache PDFBox
- Groq API (LLM)

---

## Frontend

- React
- Vite
- React Router
- Axios
- React Hot Toast

---

## Database

- PostgreSQL

---

# 📂 Project Structure

```
resume-analyzer
│
├── resume-analyzer-backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   ├── config
│   ├── security
│   └── resources
│
└── resume-analyzer-frontend
    ├── pages
    ├── services
    ├── routes
    ├── components
    └── utils
```

---

# ⚙️ Architecture

```
                React Frontend
                       │
                       │ REST API
                       ▼
               Spring Boot Backend
                       │
        ┌──────────────┼───────────────┐
        ▼              ▼               ▼
 PostgreSQL        PDFBox         Groq API
(Database)     (Text Extraction)    (LLM)
```

---

# 🔄 Application Workflow

```
User Login
      │
      ▼
Upload Resume (PDF)
      │
      ▼
Extract Resume Text
      │
      ▼
Store Resume
      │
      ▼
Paste Job Description
      │
      ▼
Send Resume + JD to Groq
      │
      ▼
Receive AI Response
      │
      ▼
Parse JSON
      │
      ▼
Save Analysis
      │
      ▼
Display Result
```

---

# 📷 Screenshots

## Login

> Add Screenshot Here

---

## Register

> Add Screenshot Here

---

## Dashboard

> Add Screenshot Here

---

## Resume Upload

> Add Screenshot Here

---

## AI Analysis

> Add Screenshot Here

---

## History

> Add Screenshot Here

---

# 📡 REST APIs

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

---

## Resume

### Upload Resume

```
POST /api/resume/upload
```

Multipart Form Data

```
file : resume.pdf
```

---

## AI Analysis

```
POST /api/analysis
```

Example

```json
{
  "resumeId": 1,
  "jobDescription": "Java Backend Developer with Spring Boot..."
}
```

---

## History

```
GET /api/analysis/history
```

---

# 🗄 Database Schema

## Users

| Column | Type |
|---------|------|
| id | BIGINT |
| full_name | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |
| role | VARCHAR |
| created_at | TIMESTAMP |

---

## Resumes

| Column | Type |
|---------|------|
| id | BIGINT |
| file_name | VARCHAR |
| stored_file_name | VARCHAR |
| extracted_text | TEXT |
| uploaded_at | TIMESTAMP |
| user_id | BIGINT |

---

## Analysis

| Column | Type |
|---------|------|
| id | BIGINT |
| match_score | INTEGER |
| strengths | TEXT |
| missing_skills | TEXT |
| suggestions | TEXT |
| job_description | TEXT |
| created_at | TIMESTAMP |

---

# 🔑 Environment Variables

Backend

```
JWT_SECRET=your-secret-key

GROQ_API_KEY=your-groq-api-key

GOOGLE_API_KEY=optional
```

---

# ▶️ Run Backend

```bash
cd resume-analyzer-backend

./gradlew bootRun
```

Runs on

```
http://localhost:8080
```

---

# ▶️ Run Frontend

```bash
cd resume-analyzer-frontend

npm install

npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 🚀 Future Improvements

- AI Resume Rewriting
- Resume Comparison
- Multiple Resume Management
- Job Recommendation
- Skill Gap Visualization
- Download PDF Report
- Admin Dashboard
- Email Notifications
- Docker Deployment
- CI/CD Pipeline

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- REST APIs
- PostgreSQL
- Hibernate/JPA
- React
- Axios
- File Upload
- PDF Parsing
- AI Integration (Groq LLM)
- Full-Stack Development

---

# 👨‍💻 Author

**Rajan Chaurasia**

Software Engineer | Java | Spring Boot | React | AI | PostgreSQL

GitHub:
https://github.com/Rajan313

LinkedIn:
https://www.linkedin.com/in/rajan-chaurasia-759b271b8/

---

# ⭐ If you found this project useful, consider giving it a star.