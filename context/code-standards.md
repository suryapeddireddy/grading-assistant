# Code Standards

## General

- Keep modules small and single-purpose.
- Fix root causes, do not layer workarounds.
- Respect the boundaries in `architecture-context.md`.

## TypeScript (web)

- Strict mode required. Avoid `any`.
- Validate all external input (request bodies, CSV rows, ML service responses) with a schema library at the boundary.
- Use `interface` for object contracts.

## Next.js

- Default to React Server Components. Add `"use client"` only for interactivity or hooks.
- Route handlers do one thing and stay thin.
- The browser never calls the ML service directly.

## Styling

- Use tokens from `globals.css` only.
- Follow the border radius scale in `ui-context.md`.

## API Routes

- Parse and validate input first.
- Check authentication and ownership before any read or write of course data.
- Return consistent response shapes with typed errors.

## Python (ml and ml-service)

- Python 3.11+, type hints on public functions.
- Format with `ruff` or `black`. Lint before committing.
- Pydantic models define the request and response shapes of the ML service.
- Set random seeds explicitly. Never rely on defaults.
- No hidden global state: functions take data in and return data out.
- Notebooks are for exploration. Anything reused moves to `ml/src`.

## Data and Storage

- Application data goes in PostgreSQL via Prisma.
- Datasets and model artifacts are never committed.
- Never log full student answers in production logs.

## Testing

- Unit tests for the CSV parser, ownership checks, and the ML service contract.
- A test that fails if any code path in training or tuning reads the test split.
- A smoke test that sends a sample request to `/score` and checks the response shape.

## File Organization

- `web/` for the app, `ml-service/` for serving, `ml/` for research code.
- Name files after the responsibility they contain.
