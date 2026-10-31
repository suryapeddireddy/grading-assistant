# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Phase 0: ML foundations and baseline

## Current Goal

- Set up the ML environment and explore the Mohler dataset. Split logic is intentionally out of scope for this step.

## Phases

- **Phase 0 (weeks 1-2):** Learn basics, explore data, splits, mean and TF-IDF baselines, first results table.
- **Phase 1 (weeks 3-4):** Embedding baseline, trained model, confidence and review flag, comparison table.
- **Phase 2 (weeks 4-5):** FastAPI ML service with the stable `/score` contract.
- **Phase 3 (weeks 5-6):** Next.js app: auth, courses, questions, upload, review table, export.
- **Phase 4 (weeks 7-8):** Real professor sample, error analysis, final test run, README, demo video, write-up.

## Completed

- Context files drafted.
- Created the Phase 0 ML folder structure and pinned dependencies in `ml/requirements.txt`.
- Added project-level ignore rules for datasets, artifacts, and local development files.
- Recorded the Mohler paper as the dataset source; exact download URL is unknown and to be confirmed.

## In Progress

- Notebook creation is waiting for `ml/data/mohler_dataset_edited.csv` and confirmation of its columns.

## Next Up

- Inspect the supplied CSV's format, first five rows, and columns; confirm the data schema.
- Create `ml/notebooks/01_explore_data.ipynb` for non-modeling data exploration only.

## Open Questions

- Which columns contain the student answer, reference answer, and score?
- What is the exact download URL for the local Mohler dataset copy?
- Which professor will grade the 30 to 50 answer real sample?
- Hosting for the web app and the ML service?
- Is the LLM grader comparison in scope, given time?

## Architecture Decisions

- ML service is separate from the web app and has a stable contract.
- Model artifacts are files, not database records.

## Session Notes

- Add context needed to resume work in the next session.
