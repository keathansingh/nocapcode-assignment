# PPSTU brand identity case study

A responsive React + Vite presentation of the PPSTU identity case study, with a small rule-based assistant, image viewer, and a contact API backed by SQLite.

## Requirements

- Node.js 22.13 or later (the API uses Node's built-in `node:sqlite` module).
- npm.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` if you want to customize the API settings. The defaults support local development.
3. Start the API in one terminal with `npm run start:server`.
4. Start the Vite app in a second terminal with `npm run dev`.
5. Open the URL Vite prints (normally `http://localhost:5173`).

Vite proxies `/api` requests to `http://localhost:3001` during development. Contact submissions are validated by the browser and server, then stored in `backend/data/contact.sqlite`. The database directory is ignored by Git. The API does not provide a public endpoint for reading contact submissions.

## Environment

Copy `.env.example` to `.env` and set:

- `PORT`: API listening port (defaults to `3001`).
- `CORS_ORIGINS`: comma-separated allowed frontend origins.
- `DATABASE_PATH`: SQLite file path (defaults to `backend/data/contact.sqlite`).
- `TRUST_PROXY`: set to the exact proxy hop count (or `true` for one trusted hop) only when the deployment sits behind a trusted reverse proxy.
- `VITE_API_BASE_URL`: optional public API origin when the frontend and API are hosted separately. Keep it empty for same-origin deployments or local Vite proxying.

Do not put private values in `VITE_*` variables; Vite exposes them in the browser bundle.

## Checks

- `npm run build` — production frontend build.
- `npm run lint` — ESLint.
- `npm run test:server` — contact validation and API tests, including storage, request limits, CORS, and rate limiting.
- `GET /api/health` — safe API health check.

## Deployment notes

Deploy the static `dist/` frontend and the API as separate services or behind one reverse proxy. Set `VITE_API_BASE_URL` at frontend build time when the API has a different origin, and set `CORS_ORIGINS` on the API to the exact deployed frontend origin(s). The contact endpoint saves messages but does not send email or notify a team inbox; no notification recipient was supplied.

SQLite requires durable storage. On any host with an ephemeral filesystem, attach a persistent volume and set `DATABASE_PATH` to a file on that volume; otherwise stored submissions can be lost during redeploys. The API intentionally does not expose a public submission-list endpoint. Operators must manage stored submissions through authorized server/database access; no admin dashboard or notification recipient was supplied.

## Supplied identity assets

The project did not include standalone official logo or mockup files. The artwork under `public/reference-assets/` consists of crops from the supplied design screenshots. Four identity concepts are verifiable from the supplied materials: Pragati & Prakriti, Shiksha, Taknik, and Utkarsh. The brief refers to a fifth value but does not identify it, and the linked Figma file does not expose inspectable design content; no fifth value has been invented.
