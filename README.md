# CDIM Evaluation Web Application

A full‑stack TypeScript application that helps teams capture, score, and communicate the maturity of a Customer Data & Insights Model (CDIM). It provides an interactive evaluator, structured executive summary, impact statement, recommendations, and a quantitative scorecard—all rendered in a modern, theme‑aware UI.

> CDIM = Coverage • Depth • Impact Linkage • Quantification (weighted dimensions used to evaluate maturity)

---
## ✨ Key Features
- **Interactive Evaluation Workflow** – Guided inputs for current / desired state, impact, metrics, risks, and gaps.
- **Automated Scorecard** – Weighted scoring model with normalization (0–100 per dimension + overall).
- **Executive Summary & Impact Statement** – Structured narrative surfaces strengths, gaps, and next steps.
- **Recommendation Engine Structure** – Space to capture follow‑ups and proof / validation plan.
- **Modern Component System** – Built with Radix UI primitives, Tailwind CSS, shadcn-inspired patterns, and reusable UI utilities.
- **Type-Safe Everywhere** – Shared Zod + Drizzle schemas ensure client/server shape alignment.
- **Extensible Storage Layer** – Currently in‑memory; easily replaceable with Postgres via Drizzle ORM.
- **Unified Dev Server** – Single Express process serves API + Vite dev middleware (in development) or static build (in production).
- **Dark / Light Theme Toggle** – Powered by `next-themes` and design tokens.

---
## 🧱 Tech Stack
| Layer | Tech |
|-------|------|
| Runtime | Node.js + Express |
| Client | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS, Radix UI primitives, utility variants (CVA), `tailwind-merge` |
| State / Data | React Query (@tanstack/react-query) |
| Validation | Zod + drizzle-zod |
| ORM / DB | Drizzle ORM (PostgreSQL dialect) |
| Auth (Pluggable) | Passport / passport-local (scaffolded) |
| Build | Vite (client) + esbuild (server bundle) |
| Charts / Visualization | Recharts, Embla Carousel, Framer Motion |

---
## 📂 Project Structure (Simplified)
```
CDIM_Web_Application/
  package.json
  drizzle.config.ts
  client/
    index.html
    src/
      main.tsx           # App bootstrap
      App.tsx            # Root layout / router anchor
      components/        # Feature + UI components
        CDIMEvaluator.tsx
        ExecutiveSummary.tsx
        ImpactStatement.tsx
        Recommendations.tsx
        Scorecard.tsx
        ui/              # Reusable UI primitives (button, card, dialog, etc.)
      hooks/             # Custom hooks (toast, mobile detection)
      lib/               # Utilities (queryClient, class helpers)
      pages/             # (Placeholder for route-level pages)
  server/
    index.ts             # Express entrypoint (dev sets up Vite)
    routes.ts            # API route registration
    storage.ts           # In-memory storage abstraction
    vite.ts              # Dev middleware + static serving helper
  shared/
    schema.ts            # Drizzle+Zod schemas for users & CDIM evaluation types
  migrations/            # (Generated when pushing Drizzle schema)
```

---
## 🧪 Domain Data Model (Evaluation Shape)
Defined in `shared/schema.ts` using Zod:
```
CDIMEvaluation {
  meta: { framework, audience, weights { coverage, depth, quantification, impact_linkage } },
  executive_summary: string,
  cdim: {
    current: { confirmed[], gaps_next_call[] },
    desired: { confirmed[], gaps_next_call[] },
    impact:  { confirmed[], gaps_next_call[] },
    metrics: { confirmed[], gaps_next_call[] },
  },
  gaps_and_risks: string,
  impact_statement: string,
  recommendations: { follow_ups[], proof_plan[] },
  scorecard: { overall, coverage, depth, quantification, impact_linkage }
}
```
Use this as the contract for persisting or transmitting evaluation state.

---
## ⚙️ Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes (for Drizzle / migrations) | PostgreSQL connection string (Neon, Azure PG, local, etc.). Required at build/push time. |
| `PORT` | No | Server listen port (defaults to `5000`). |
| `NODE_ENV` | No | `development` or `production`; affects Vite middleware usage. |

> Current storage implementation is in-memory. When you replace it with Postgres reads/writes, `DATABASE_URL` becomes required at runtime.

---
## 🛠️ Getting Started
### 1. Prerequisites
- Node.js 18+ (recommended LTS)
- PostgreSQL database (optional until persistence is added)

### 2. Install Dependencies
```powershell
npm install
```

### 3. (Optional) Provision a Database
Create a Postgres instance (e.g., Neon, Azure Database for PostgreSQL, Docker) and set:
```powershell
$env:DATABASE_URL = "postgres://user:password@host:5432/dbname"
```

### 4. Apply Schema (Generates / Applies Migrations)
```powershell
npm run db:push
```
Drizzle will read `shared/schema.ts` and sync to the target DB.

### 5. Start Development
The `dev` script sets `NODE_ENV=development` inline (POSIX style). On Windows PowerShell you have two options:
```powershell
# Option A: Manually set then run
$env:NODE_ENV = "development"
npm run dev --ignore-scripts
tsx server/index.ts

# Option B: Temporarily modify script or install cross-env
npm install --save-dev cross-env
# then change script to: "dev": "cross-env NODE_ENV=development tsx server/index.ts"
```
If the existing script works in your shell (e.g., Git Bash), simply run:
```powershell
npm run dev
```
This launches Express and (in development) injects Vite's dev middleware for the React client with HMR.

### 6. Open the App
Navigate to: http://localhost:5000

---
## 🚀 Production Build & Run
```powershell
npm run build   # Builds client (Vite) + bundles server (esbuild)
$env:NODE_ENV = "production"
npm start
```
Serves compiled client assets + API from the same Express process.

---
## 🧩 Extending the Backend
### Add an API Route
Edit `server/routes.ts`:
```ts
app.get('/api/health', (_req, res) => res.json({ ok: true }));
```
### Replace In‑Memory Storage
1. Create a Drizzle client (e.g., `server/db.ts`).
2. Implement a Postgres-backed storage class that conforms to `IStorage`.
3. Swap the exported `storage` instance in `storage.ts`.

### Error Handling
Errors thrown in routes are normalized by the Express error middleware in `server/index.ts` and returned as `{ message }` JSON.

---
## 🧱 UI / Component Guidelines
- Reuse primitives in `client/src/components/ui` before creating new ones.
- Keep feature components (e.g., `Scorecard`, `ExecutiveSummary`) stateless where possible; derive data via hooks + shared schemas.
- Use Zod schemas for validation at boundaries (forms, API payloads).

---
## 🔄 Data Fetching Strategy
- Prefer React Query for any async server interactions (even after persistence is added) to manage cache, loading, and retries.
- In-memory evaluation drafts can live in component state or a lightweight context until persisted.

---
## 🧪 Testing (Future Suggestion)
Recommended add-ons:
- Vitest + React Testing Library for components
- Supertest for API routes
- Zod schema contract tests to prevent drift

---
## 🛣️ Roadmap Ideas
- Persist evaluations to Postgres (Drizzle models & migrations)
- Auth (local strategy + session store via `connect-pg-simple`)
- Role-based access for evaluators vs stakeholders
- Export to PDF / Markdown summary
- WebSocket collaboration (`ws` dependency scaffolded)
- Historical trend visualization

---
## 🤝 Contributing
1. Fork & clone
2. Create a feature branch
3. Commit with conventional-style messages (optional but helpful)
4. Open a PR with context + screenshots (where UI changes apply)

---
## 🐛 Troubleshooting
| Issue | Fix |
|-------|-----|
| `NODE_ENV=development` not recognized on Windows | Use PowerShell assignment or add `cross-env` |
| Drizzle push fails: `DATABASE_URL` error | Ensure env var is set before running `npm run db:push` |
| 404 for client routes in prod | Ensure build ran; server serves static assets only in production mode |
| Styles not applying | Confirm `index.css` imports Tailwind directives & restart dev server |

---
## 🔐 Security Notes
- Placeholder auth only—do not use in production without hashing passwords (e.g., bcrypt) and adding input rate limiting.
- Sanitize all user‑supplied evaluation text before rich rendering (future enhancement).

---
## 📄 License
MIT © 2025

---
## 🙌 Acknowledgements
- Radix UI & shadcn-inspired component patterns
- Drizzle ORM & Zod for type-safe data contracts

---
## 🗂 Scripts Reference
| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Express + Vite in development (HMR) |
| `npm run build` | Build client (Vite) + bundle server (esbuild) into `dist/` |
| `npm start` | Run production server from `dist/index.js` |
| `npm run check` | Type-check with `tsc` |
| `npm run db:push` | Push Drizzle schema to the configured Postgres database |

---
## 🧭 Design Intent
This project aims to accelerate structured maturity assessments by combining narrative synthesis with quantitative scoring—helping teams prioritize investments and communicate change impact clearly.

Feel free to open issues for clarifications or enhancements.
