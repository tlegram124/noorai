# Wasla AI

AI-powered WhatsApp customer support and order confirmation SaaS platform for Moroccan e-commerce.

## Architecture

- **Backend:** FastAPI, PostgreSQL + pgvector, Redis, SQLAlchemy
- **Frontend:** React, Vite, TailwindCSS, i18next
- **AI Integrations:** Twilio WhatsApp API, OpenAI/Mistral via AntiGravity, SentenceTransformers

## Quick Start (Local Development)

### Prerequisites
- Docker & Docker Compose
- Node.js 18+

### Setup

1. Start the Database and Backend:
```bash
docker-compose up -d postgres redis
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

2. Start the Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Features

- Multi-tenant architecture for businesses.
- Twilio WhatsApp webhook integration.
- RAG Pipeline for FAQ and knowledge base using pgvector.
- Multi-language support (English, Arabic, French) with RTL UI.
- Secure API endpoints using Firebase authentication.

