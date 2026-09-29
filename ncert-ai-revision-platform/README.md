# NCERT AI Revision Platform

A scalable, mobile-first AI-powered revision and assessment platform for Class 11–12 students.

## Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS v4 + React Router + TanStack Query + Recharts + Lucide
- Backend: Node.js + Express + TypeScript + Zod + Mongoose + JWT
- Data: MongoDB
- Optional infrastructure: Redis + BullMQ
- AI: Provider abstraction with OpenAI-compatible API support and a deterministic demo fallback
- Architecture: Modular monolith + background-worker-ready design

## Features included

- Student onboarding and dashboard
- Class / stream / subject / chapter / topic structure
- NCERT-style content browsing
- Practice question engine
- Timed quizzes
- Quiz result analytics
- Weak-topic detection
- Personalized recommendations
- AI tutor interface with source-aware response model
- Flashcards
- Study plan UI
- Progress and streak analytics
- Admin content/question review shell
- Responsive Tailwind UI
- Dark/light theme
- Docker Compose
- Seed data
- REST API
- JWT authentication
- Zod validation
- Health endpoint
- AI provider abstraction
- Content ingestion abstraction
- RAG/vector-store abstraction

## Important content note

This repository does not bundle copyrighted NCERT books. The ingestion layer is designed for permitted, public/openly licensed, or administrator-supplied source material. Store source metadata and page/chunk references for traceability.

## Quick start

### 1. Backend

```bash
cd apps/api
cp .env.example .env
npm install
npm run seed
npm run dev
```

API: `http://localhost:5000`

### 2. Frontend

```bash
cd apps/web
npm install
npm run dev
```

Web: `http://localhost:5173`

### Demo account

The seed creates:

- Email: `student@example.com`
- Password: `Student@123`

### MongoDB

Use local MongoDB or MongoDB Atlas.

For local development:

```bash
docker compose up -d mongo
```

### Full stack

```bash
docker compose up --build
```

## AI configuration

The app works in demo mode without an AI key. To enable a real OpenAI-compatible provider:

```env
AI_PROVIDER=openai
AI_API_KEY=your_key
AI_MODEL=your_model
AI_BASE_URL=https://api.openai.com/v1
```

The provider is intentionally abstracted so another compatible provider can be added without changing the quiz/tutor domain logic.

## Project structure

```text
ncert-ai-revision-platform/
├── apps/
│   ├── api/
│   │   └── src/
│   │       ├── config/
│   │       ├── middleware/
│   │       ├── modules/
│   │       ├── services/
│   │       ├── utils/
│   │       ├── app.ts
│   │       └── server.ts
│   └── web/
│       └── src/
│           ├── components/
│           ├── data/
│           ├── layouts/
│           ├── lib/
│           ├── pages/
│           ├── App.tsx
│           └── main.tsx
├── docs/
├── packages/
├── docker-compose.yml
└── README.md
```

## Production roadmap

1. Replace demo AI with an approved provider.
2. Add PDF/document ingestion worker.
3. Add embeddings and MongoDB Atlas Vector Search/Qdrant.
4. Add teacher/admin approval workflow.
5. Add BullMQ workers for ingestion/question generation.
6. Add automated AI evaluation for groundedness and correctness.
7. Add object storage for permitted documents.
8. Add CI/CD, observability, rate limiting, and managed infrastructure.
