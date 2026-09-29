# API

Base URL: `/api/v1`

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

## Content

- `GET /subjects`
- `GET /subjects/:subjectId`
- `GET /chapters/:chapterId`

## Questions

- `GET /questions?subjectId=&chapterId=&difficulty=&limit=`
- `GET /questions/:id`

## Quiz

- `POST /quizzes`
- `POST /quizzes/:id/submit`

## Analytics

- `GET /analytics/overview`

## AI

- `POST /ai/chat`

All authenticated endpoints use:

`Authorization: Bearer <token>`
