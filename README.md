# Unified Company Operating System

[![Monorepo](https://img.shields.io/badge/monorepo-turbo-blue)](https://turbo.build/repo)
[![Frontend](https://img.shields.io/badge/frontend-Next.js%2016-black)](./frontend)
[![Backend](https://img.shields.io/badge/backend-Express%205%20%2B%20Bun-green)](./backend)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6)](https://www.typescriptlang.org/)

A full-stack monorepo for a company operating system MVP with:
- Next.js frontend (`frontend`)
- Express + Bun backend (`backend`)
- Turbo for workspace orchestration

## Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Architecture

This repository is a Turbo monorepo with two applications:

- `frontend`: Next.js App Router UI that checks backend health.
- `backend`: Express API with structured responses, logging middleware, and Swagger docs.

Current local defaults:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- API docs: `http://localhost:3001/docs`

## Tech Stack

- Runtime and package manager: Bun
- Monorepo build system: Turborepo
- Frontend: Next.js 16, React 19, Tailwind CSS 4, TypeScript
- Backend: Express 5, TypeScript, Winston logger, Swagger (OpenAPI)
- Linting and formatting: Biome

## Getting Started

### 1. Prerequisites

- Bun `>= 1.x`

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment

Create backend environment file:

```bash
cp backend/.env.example backend/.env
```

On Windows PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
```

### 4. Run in development mode

From repository root:

```bash
bun run dev
```

This starts all workspace `dev` scripts through Turbo.

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `PORT` | No | `3001` | Backend server port |
| `LOG_LEVEL` | No | `info` | Winston log level |
| `NODE_ENV` | No | `development` | App environment |

### Frontend

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:3001/api/v1` | Base URL used by frontend API client |

## Available Scripts

Run from repository root:

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `bun run dev` | Run all apps in development mode |
| `build` | `bun run build` | Build all workspaces |
| `start` | `bun run start` | Start production commands for workspaces |
| `lint` | `bun run lint` | Lint all workspaces |
| `format` | `bun run format` | Format all workspaces |
| `typecheck` | `bun run typecheck` | Type-check all workspaces |

Run inside each app directory for service-specific scripts:
- `backend/package.json`
- `frontend/package.json`

## API Reference

### Health check

- Endpoint: `GET /api/v1/health`
- URL: `http://localhost:3001/api/v1/health`
- Purpose: verifies API availability and returns a timestamp.

### Root endpoint

- Endpoint: `GET /`
- URL: `http://localhost:3001/`
- Purpose: simple backend welcome response.

### Swagger docs

- URL: `http://localhost:3001/docs`
- Source annotations: `backend/index.ts` and route files in `backend/src/modules/*/routes/*.ts`

## Project Structure

```text
.
|-- backend/
|   |-- index.ts
|   |-- src/
|   |   |-- middlewares/
|   |   |-- modules/
|   |   `-- utils/
|   `-- .env.example
|-- frontend/
|   |-- src/
|   |   |-- app/
|   |   `-- lib/
|   `-- package.json
|-- turbo.json
`-- package.json
```

## Development Workflow

1. Start both apps with `bun run dev`.
2. Visit frontend at `http://localhost:3000`.
3. Confirm backend health from UI status card or call `GET /api/v1/health`.
4. Open API docs at `http://localhost:3001/docs`.
5. Before pushing changes, run:

```bash
bun run lint
bun run typecheck
bun run build
```

## Troubleshooting

- Port already in use:
  - Change `PORT` in `backend/.env`.
  - Update `NEXT_PUBLIC_API_URL` in frontend environment if needed.
- Frontend shows backend offline:
  - Ensure backend is running on the expected port.
  - Verify CORS is enabled in backend and URL is correct.
- Swagger page not loading:
  - Confirm backend started without runtime errors.
  - Check `http://localhost:<PORT>/docs`.

## Roadmap

See `Unified_Company_Operating_System_PRD.md` for product direction, including:
- HR and payroll modules
- Leave and timesheet workflows
- Kanban project management
- AI assistant and automation features

## Contributing

1. Create a feature branch.
2. Keep changes scoped and documented.
3. Run lint, typecheck, and build before opening a PR.
4. Add or update docs where behavior changes.

## License

This project is proprietary and licensed under an all-rights-reserved model.
No use, copying, modification, or distribution is allowed without prior written permission.
See `LICENSE` for full terms.
