# Architecture

## Runtime

```text
React + Tailwind
      |
      v
Express API
      |
      +---- Auth / Content / Questions / Quiz / Analytics
      |
      +---- AI service abstraction
      |          |
      |          +---- OpenAI-compatible provider
      |          +---- Demo provider
      |
      +---- MongoDB
      |
      +---- Redis/BullMQ (ready for workers)
```

## Learning loop

```text
Source -> Content -> Topic -> Practice -> Assessment
       -> Analytics -> Weak topic -> Recommendation -> Revision -> Re-test
```

## RAG boundary

The application keeps retrieval separate from generation:

```text
Student question
 -> retrieval service
 -> approved chunks + metadata
 -> AI provider
 -> grounded response + sources
```

The production ingestion pipeline should:

1. Accept permitted documents.
2. Extract text.
3. Detect book/chapter/topic.
4. Chunk text.
5. Create embeddings.
6. Store chunks + source metadata.
7. Index embeddings.
8. Generate candidate questions.
9. Validate.
10. Human-review before publication.

## Scaling

Start as a modular monolith. Extract AI processing, ingestion, and analytics into workers/services only when traffic or operational boundaries justify it.
