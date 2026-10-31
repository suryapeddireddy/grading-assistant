<!-- Keep the auto-generated nextjs-agent-rules block from create-next-app here if it was added. -->

## Application Building Context

Read the following files in order before implementing or making any architectural decision:

1. `context/project-overview.md` — product definition, goals, features, and scope
2. `context/architecture-context.md` — system structure, boundaries, storage model, and invariants
3. `context/ml-context.md` — datasets, splits, models, metrics, and evaluation rules
4. `context/ui-context.md` — theme, typography, and component conventions
5. `context/code-standards.md` — implementation rules and conventions
6. `context/ai-workflow-rules.md` — development workflow, scoping rules, and delivery approach
7. `context/progress-tracker.md` — current phase, completed work, open questions, and next steps

Update `context/progress-tracker.md` after each meaningful implementation change.

If implementation changes the architecture, scope, or standards documented in the context files, update the relevant file before continuing.

## Hard Rules (never override)

- Never read, load, or tune on the test split. Only the evaluation script touches it, once, at the end.
- Do not write the split logic, the scoring logic, or the evaluation script unless explicitly told to. Explain and review them instead.
- Every modeling choice gets an entry in `docs/decision-log.md`.
