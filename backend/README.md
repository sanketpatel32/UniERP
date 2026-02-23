# Backend Service

Express + Bun backend with PostgreSQL (Drizzle ORM), JWT auth, and tenant-aware RBAC foundations.

## Prerequisites

- Bun `>= 1.x`
- Docker (for local PostgreSQL)

## Local Setup

From repository root:

```bash
bun install
cp backend/.env.example backend/.env
docker compose up -d postgres adminer
```

On Windows PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
```

From `backend/` directory:

```bash
bun run db:migrate
bun run db:seed   # optional
bun run dev
```

## Scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `bun run --hot index.ts` | Run backend in watch mode |
| `start` | `bun run index.ts` | Start backend |
| `build` | `bun build index.ts --outdir ./dist --target node` | Build bundle |
| `db:generate` | `drizzle-kit generate --config drizzle.config.ts` | Generate SQL migration from schema |
| `db:migrate` | `drizzle-kit migrate --config drizzle.config.ts` | Apply migrations |
| `db:studio` | `drizzle-kit studio --config drizzle.config.ts` | Open Drizzle Studio |
| `db:seed` | `bun run src/db/seed.ts` | Seed default company admin |
| `typecheck` | `tsc --noEmit` | Type check |
| `lint` | `biome lint --write .` | Lint and fix |
| `format` | `biome format --write .` | Format files |

## Environment Variables

See `backend/.env.example` for full template. Required for runtime:

- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`

Local Docker database is exposed on host port `5433`, so default connection string is:
- `postgres://app:app@localhost:5433/ucos`

## API Endpoints

Health:
- `GET /api/v1/health`
- `GET /api/v1/health/db`

Auth:
- `POST /api/v1/auth/signup/company`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET /api/v1/auth/admin-check`

API docs:
- `GET /docs`
