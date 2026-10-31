# GradeAssist

## Overview

GradeAssist is a short-answer grading assistant for professors. A professor defines a question with a reference answer and rubric, uploads student answers, and receives a suggested score for each answer with a confidence level. Low-confidence answers are flagged for human review. The professor always has the final say, and every correction is saved as new labeled data.

The project doubles as a measured ML study: several scoring approaches are compared on a held-out test set and against a professor's own grading.

## Goals

1. Let professors create courses, questions, reference answers, and rubrics.
2. Let professors upload student answers (CSV) and get suggested scores.
3. Flag low-confidence predictions for human review.
4. Let professors review, accept, or override each suggested score.
5. Compare multiple scoring approaches with a documented, honest evaluation.
6. Measure agreement with a real professor's grading on a small real-world sample.

## Core User Flow

1. Professor signs in.
2. Professor creates a course and adds a question with a reference answer and max score.
3. Professor uploads student answers as a CSV.
4. App sends each answer to the ML service for a suggested score and confidence.
5. Professor reviews a table of answers, sorted with low-confidence first.
6. Professor accepts or overrides each score.
7. Professor exports final scores as CSV.
8. Overrides are stored for later analysis and retraining.

## Features

### Authentication and Courses
- Sign-in and route protection.
- Course and question CRUD, scoped to the owning professor.

### Answer Upload and Scoring
- CSV upload with validation.
- Batch scoring through the ML service.
- Suggested score, confidence value, and review flag per answer.

### Review Screen
- Table of answers with suggested score, confidence, and status.
- Accept or override per answer, with an optional note.
- Filter by "needs review".

### Export
- Download final scores as CSV.

### ML Evaluation (separate from the app)
- Notebooks and scripts in `ml/` that train, compare, and evaluate models.
- Results table, error analysis, and decision log.

## Scope

### In Scope
- Auth, courses, questions, answers, scores, overrides
- One scoring service with a swappable model behind a stable API
- Baselines (mean predictor, TF-IDF similarity, sentence-embedding similarity) and one trained model
- Optional LLM-based grader used only as a comparison, not as the default
- Evaluation on public data plus a small professor-graded sample

### Out Of Scope
- Student-facing accounts or portals
- LMS integrations
- Grading long essays or code
- Billing and multi-tenant admin
- Fully automatic grading without professor review

## Success Criteria

1. A professor can go from CSV upload to exported final scores end to end.
2. Every suggested score has a confidence value and a review flag.
3. The results table compares at least four approaches, including the "always predict the mean" baseline.
4. Final test-set results are produced once, by the evaluation script.
5. A 30 to 50 answer professor-graded sample is evaluated, with failure cases documented.
6. The author can explain every modeling choice without the agent's help.
