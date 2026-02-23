# UniERP — The Unified Company Operating System

[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/frontend-Next.js%2016-black)](./frontend)
[![Express](https://img.shields.io/badge/backend-Express%205%20%2B%20Bun-green)](./backend)
[![License](https://img.shields.io/badge/license-Proprietary-red)](#license)

**One platform to run your entire company.** UniERP combines HR, payroll, leave management, timesheets, project management, and AI-powered tools into a single, multi-tenant SaaS platform — so you can stop juggling ten different apps and start running your business.

---

## Why UniERP?

Most growing companies cobble together separate tools for HR, payroll, project tracking, and documentation. That means scattered data, broken workflows, and wasted time.

UniERP replaces that chaos with a **unified operating system** where everything lives in one place — employees, payroll, projects, and AI assistance — all connected, all under one roof.

---

## Core Modules

### 👥 HR & Employee Management

- Company self-registration with instant setup
- Sub-Admin creates and manages employee profiles
- Store key details: name, email, salary, leave balance
- Employees can update their own profile info

### 💰 Payroll

- Fixed monthly salary model — simple, predictable
- Sub-Admin runs payroll manually with one click
- Automatic payslip generation
- Multi-currency support for global teams
- Country-specific tax configuration (extensible)

### 🏖️ Leave Management

- Configurable leave types (Annual, Sick, etc.)
- Employees request leave; Sub-Admins approve or reject
- Approved leave automatically deducts from balance
- Full leave reports for management visibility

### ⏱️ Timesheets

- Employees log daily working hours
- Management dashboards for tracking and reporting
- Designed for visibility, not payroll calculation

### 📋 Project Management (Kanban)

- Hierarchical structure: **Story → Task → Sub-task**
- Fixed workflow: `To Do → In Progress → Review → Done`
- Assign tasks to team members with descriptions and timestamps
- Support for multiple projects per company

### 🤖 AI-Powered RAG Assistant

- Ask questions about your project documentation, system architecture, and internal policies
- Powered by Retrieval-Augmented Generation (RAG)
- Read-only, project-knowledge-scoped — safe and focused

### 🔍 Automated GitHub Code Review

- Triggered automatically on every GitHub push
- Provides code quality feedback, best practice suggestions, and potential bug detection
- Helps maintain code standards without manual review overhead

### 📝 Audit Logs

- Full action-level tracking across the platform
- Logs user, company, role, action, and timestamp
- Built-in accountability and compliance support

---

## Who Is It For?

| Audience                        | What They Get                                                      |
| ------------------------------- | ------------------------------------------------------------------ |
| **Small & Mid-Sized Companies** | An all-in-one platform that replaces 5+ separate tools             |
| **Multi-Country Organizations** | Multi-currency payroll and global team management                  |
| **Company Sub-Admins**          | Full control over employees, payroll, projects, leave, and reports |
| **Employees**                   | Self-service timesheets, leave requests, task views, and payslips  |

---

## Key Design Principles

- **Multi-Tenant SaaS** — Every company gets isolated, secure data via `company_id` segregation
- **Modular Monolith** — Clean module boundaries without microservice complexity
- **Security First** — Role-based access control, JWT authentication, and full audit logging
- **Built for Speed** — Powered by Bun runtime, Turborepo, and modern TypeScript tooling

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) `>= 1.x`

### Quick Start

```bash
# Install dependencies
bun install

# Set up backend environment
cp backend/.env.example backend/.env   # macOS/Linux
Copy-Item backend/.env.example backend/.env   # Windows PowerShell

# Start local database and Adminer
docker compose up -d postgres adminer

# Run backend database migrations
cd backend && bun run db:migrate

# Optional: seed a default company admin
cd backend && bun run db:seed

# Start everything (from repo root)
bun run dev
```

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Docs (Swagger):** http://localhost:3001/docs
- **Adminer:** http://localhost:8080
- **PostgreSQL:** `localhost:5433` (mapped to container `5432`)

---

## Tech Stack

| Layer    | Technology                              |
| -------- | --------------------------------------- |
| Runtime  | Bun                                     |
| Monorepo | Turborepo                               |
| Frontend | Next.js 16, React 19, Tailwind CSS 4    |
| Backend  | Express 5, TypeScript, Drizzle, JWT, Zod, Swagger |
| Database | PostgreSQL 16, Docker Compose, Adminer  |
| Linting  | Biome                                   |

---

## Backend Environment Variables

Define these in `backend/.env`:

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | Backend server port (default `3001`) |
| `LOG_LEVEL` | No | Log level (default `info`) |
| `NODE_ENV` | No | Environment (`development`, `test`, `production`) |
| `DATABASE_URL` | Yes | PostgreSQL connection string (default `postgres://app:app@localhost:5433/ucos`) |
| `JWT_ACCESS_SECRET` | Yes | Access token signing secret |
| `JWT_REFRESH_SECRET` | Yes | Refresh token signing secret |
| `JWT_ACCESS_EXPIRES_IN` | No | Access token TTL (default `15m`) |
| `JWT_REFRESH_EXPIRES_IN` | No | Refresh token TTL (default `7d`) |
| `COOKIE_DOMAIN` | No | Optional cookie domain |
| `COOKIE_SECURE` | No | `true` in HTTPS environments |
| `SEED_ADMIN_EMAIL` | No | Seed script admin email |
| `SEED_ADMIN_PASSWORD` | No | Seed script admin password |
| `SEED_COMPANY_NAME` | No | Seed script company name |

---

## Backend API Endpoints (Current)

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

---

## Roadmap

UniERP is actively evolving. Planned enhancements include:

- 🔐 **SSO & 2FA** — Enterprise-grade authentication
- 💳 **Subscription & Billing** — Built-in SaaS monetization
- 🛡️ **Platform Admin Module** — Global tenant management and monitoring
- 📊 **Advanced Reporting & Exports** — Deep analytics and data exports
- 🌐 **Public API** — Third-party integrations and extensibility
- 🗄️ **Soft Deletes & Backup/Recovery** — Data safety and compliance
- 📜 **Entity-Level Change History** — Full field-level audit trails

---

## Contributing

1. Create a feature branch
2. Keep changes scoped and documented
3. Run `bun run lint`, `bun run typecheck`, and `bun run build` before opening a PR
4. Add or update docs where behavior changes

---

## License

This project is proprietary and licensed under an all-rights-reserved model.
No use, copying, modification, or distribution is allowed without prior written permission.
See [`LICENSE`](./LICENSE) for full terms.
