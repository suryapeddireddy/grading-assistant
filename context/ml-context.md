# ML Context

## Task

Predict a human grader's score for a short free-text answer, given the question, a reference answer, and the student's answer. Treated as regression on a bounded score, and evaluated against human scores.

## Datasets

| Dataset  | Role                                              | Notes                                              |
| -------- | ------------------------------------------------- | -------------------------------------------------- |
| Mohler   | Primary for baselines (has reference answers)     | ~2,200 CS answers, scores 0 to 5                   |
| ASAP-SAS | Larger training set for the trained model         | ~17,000 answers, 10 prompts, no reference answers  |
| Real sample | Final real-world check                         | 30 to 50 answers graded independently by a professor |

Datasets are downloaded manually into `ml/data/` and never committed. Record the source and download date in the decision log.

## Splits

- Train 70%, validation 15%, test 15%.
- Split by **question**, not by random row, when evaluating generalization to new questions. Also report the random-row split, and state which one each number comes from.
- Fixed random seed, recorded in code and the decision log.
- The test split is used exactly once, by `ml/eval/final_eval.py`, after all choices are frozen.

## Approaches to Compare

1. **Mean baseline** — always predict the training mean. Every other model must beat this.
2. **TF-IDF cosine similarity** — similarity to the reference answer, mapped to a score with linear regression.
3. **Sentence-embedding similarity** — same idea using sentence-transformers embeddings.
4. **Trained model** — regressor over features (similarity scores, length, keyword overlap), or a fine-tuned small transformer if time allows.
5. **LLM grader (optional)** — prompt-based grading with the rubric, used only as a comparison.

## Metrics

- Pearson correlation with human scores
- Mean absolute error
- Quadratic Weighted Kappa (on rounded scores)
- Review-flag quality: of answers flagged, how many had large errors; of large errors, how many were flagged

Every results table includes the mean baseline row.

## Confidence and Review Flag

- Confidence is derived from a documented method (e.g., disagreement between models, distance from score boundaries, or predicted-error model).
- The threshold is chosen on the validation set and frozen before the test run.

## Error Analysis (required)

- Inspect the 10 to 20 largest errors per model.
- Group failures into categories (very short, correct but unusual wording, partially correct, off-topic, negation).
- Report fairness checks: does performance differ by answer length or writing style?

## Reproducibility

- Pinned dependencies in `ml/requirements.txt`.
- Each reported number comes from a script or notebook that can be re-run from the repo.
