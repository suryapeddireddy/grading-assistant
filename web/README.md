# GradeAssist web app

The web app uses Next.js App Router, strict TypeScript, Tailwind CSS, shadcn/ui, Clerk, and Prisma with PostgreSQL.

## Local setup

1. Copy `.env.example` to `.env.local` and provide Clerk keys, a PostgreSQL connection string, and the ML service base URL.
2. Install dependencies with `npm install`.
3. Generate the Prisma client with `npm run db:generate`.
4. Apply the development schema with `npm run db:migrate`.
5. Start Next.js with `npm run dev`.

The migration command requires a reachable PostgreSQL database. The ML client is server-only and sends scoring requests to `<ML_SERVICE_URL>/score`.

## Routes

- `/sign-in` and `/sign-up` are public Clerk routes.
- All other matched routes are protected in `src/proxy.ts`.
- The home route is intentionally empty; feature screens are not part of this scaffold.

Add shadcn/ui components under `src/components/ui/` with the shadcn CLI. The starter `Button` component and default neutral theme are included.
