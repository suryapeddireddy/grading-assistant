# Architecture Context

## Stack

| Layer            | Technology                  | Role                                                        |
| ---------------- | --------------------------- | ----------------------------------------------------------- |
| Web app          | Next.js + TypeScript        | Professor UI, auth, API routes for app data                 |
| UI               | Tailwind + shadcn/ui        | Component composition and styling                           |
| Auth             | Clerk                       | Professor identity and route protection                     |
| Database         | PostgreSQL + Prisma         | Courses, questions, answers, scores, overrides              |
| ML service       | FastAPI (Python)            | Loads the chosen model and serves scoring requests          |
| ML libraries     | scikit-learn, sentence-transformers, pandas | Training and evaluation                     |
| ML experiments   | Jupyter notebooks + scripts | Exploration, training, comparison                           |

## System Boundaries

- `web/app/api` — Authenticated handlers: validation, ownership checks, calls to the ML service, persistence.
- `web/lib` — Prisma client, auth helpers, ML service client, utilities.
- `web/components` — UI composition only.
- `ml-service/` — Stateless scoring API. Never touches the app database.
- `ml/notebooks` — Exploration and experiments.
- `ml/src` — Reusable ML code: data loading, splitting, features, models.
- `ml/eval` — Evaluation scripts and generated results tables.
- `ml/data` — Raw and split datasets. Gitignored.
- `docs/decision-log.md` — Record of modeling and architecture choices.

## Storage Model

- PostgreSQL holds all application data: users' courses, questions, answers, suggested scores, final scores, and overrides.
- Model artifacts (trained weights, vectorizers) are files saved under `ml/artifacts/` and loaded by the ML service at startup. Not stored in the database.
- Datasets live only in `ml/data/` and are never committed.
- Generated results tables live in `ml/eval/results/` as CSV or Markdown.

## ML Service Contract

`POST /score`

Request:
```json
{
  "question": "string",
  "reference_answer": "string",
  "max_score": 5,
  "answers": [{ "id": "string", "text": "string" }]
}
```

Response:
```json
{
  "model_version": "string",
  "results": [
    { "id": "string", "suggested_score": 3.5, "confidence": 0.72, "needs_review": false }
  ]
}
```

- The contract is stable. Swapping the model must not change the shape.
- `needs_review` is true when confidence is below a threshold chosen on validation data and recorded in the decision log.

## Auth and Ownership Model

- Every course belongs to one professor (Clerk user ID).
- Questions, answers, and scores inherit ownership from their course.
- Every mutation checks ownership before running.
- The ML service is internal. It is only reachable from the web app's server, never from the browser.

## Data Model (summary)

- `Course` — id, ownerId, name
- `Question` — id, courseId, prompt, referenceAnswer, rubric, maxScore
- `Answer` — id, questionId, text
- `Score` — id, answerId, suggestedScore, confidence, needsReview, modelVersion, finalScore, reviewerNote, reviewedAt

## Invariants

1. The test split is never used for training, tuning, or threshold selection.
2. The ML service is stateless and does not access the application database.
3. Auth and ownership are enforced at every mutation boundary in the web app.
4. The web app never runs model inference itself; it calls the ML service.
5. Every score shown to a professor carries a confidence value and the model version that produced it.
6. A professor's final score always overrides the model's suggestion.
7. The ML service contract does not change when the model changes.
