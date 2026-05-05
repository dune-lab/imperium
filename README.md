# imperium

BFF (Backend for Frontend) — the single entry point for the arrakis client. Aggregates data from all dune-lab services and proxies all client requests.

Named after the Imperium from Dune — the central governing body that holds all factions together.

---

## Responsibilities

- Single HTTP entry point for the browser client
- Issues auth tokens (via janus), registers users (via atreides)
- Aggregates `user + student + journey` in a single `/me` response
- Proxies admin operations: students, journeys, DLQ
- Validates JWT and forwards `Authorization: Bearer` downstream

---

## Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 24 + TypeScript |
| HTTP | Fastify (`@enxoval/http`) |
| Auth | JWT Bearer (`@enxoval/auth`) |
| Logging | Pino structured JSON (`@enxoval/observability`) |
| Validation | `createSchema` + `asyncFn` (`@enxoval/types`) |
| Database | None — pure HTTP aggregation |

---

## HTTP API

### Auth & Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | — | Health check |
| `POST` | `/auth/login` | — | Authenticate and receive a JWT token |
| `POST` | `/users/register` | — | Create a new user account |
| `GET` | `/me` | Bearer JWT | Aggregate: current user + student profile + journey |

### Students

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/students` | Bearer JWT | Create student profile for the current user |
| `GET` | `/students` | Bearer JWT | List all students (admin) |

### Journeys

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/journeys` | Bearer JWT | Start a new journey for a student |
| `GET` | `/journeys` | Bearer JWT | List all journeys (admin) |
| `POST` | `/journeys/republish` | Bearer JWT | Reactivate stuck journeys |

### Harkonnen DLQ (admin only)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/harkonnen` | Bearer JWT | List all DLQ messages |
| `POST` | `/harkonnen/reprocess` | Bearer JWT | Reprocess a single DLQ message |
| `POST` | `/harkonnen/reprocess-all` | Bearer JWT | Reprocess all pending messages for a topic |
| `POST` | `/harkonnen/dismiss` | Bearer JWT | Dismiss a DLQ message |

---

## Architecture

Imperium follows the **Diplomat Pattern**: each concern lives in a dedicated layer.

```
diplomat/http-server/       ← parse HTTP, extract token, call controller
controllers/                ← orchestrate calls to multiple http-clients
diplomat/http-client/       ← typed, asyncFn-wrapped HTTP clients per service
  atreides.ts               → user operations
  persona.ts                → student operations
  janus.ts                  → login
  odyssey.ts                → journeys + DLQ
```

### GET /me — Aggregation Example

```
Authorization: Bearer <token>
  │
  ├── decode userId from JWT
  ├── parallel fetch:
  │     └── atreides  GET /users/:userId
  │     └── persona   GET /students/by-user/:userId
  └── if student found:
        └── odyssey   GET /journeys/by-student/:studentId

Response:
{
  "user": { ... },
  "student": { ... } | null,
  "journey": { ... } | null
}
```

---

## Service Clients

| Client | Service | Base URL env var |
|--------|---------|-----------------|
| `atreides.ts` | Users | `ATREIDES_URL` |
| `persona.ts` | Students | `PERSONA_URL` |
| `odyssey.ts` | Journeys + DLQ | `ODYSSEY_URL` |
| `janus.ts` | Auth | `JANUS_URL` |

All clients are typed with `asyncFn` and `createSchema` from `@enxoval/types`. Every response is validated via `.parse()` before being returned to the controller.

---

## Observability

Every HTTP request emits structured logs:

```json
{ "level": "info", "service": "imperium", "cid": "abc:0", "method": "GET", "url": "/me", "msg": "http-server: request received" }
{ "level": "info", "service": "imperium", "cid": "abc:0", "status": 200, "durationMs": 38, "msg": "http-server: response sent" }
```

Logs are shipped to Loki and available in Grafana under `{service="imperium"}`.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | HTTP port (default: `3004`) |
| `HOST` | Bind address (default: `0.0.0.0`) |
| `ATREIDES_URL` | Base URL of the atreides service |
| `PERSONA_URL` | Base URL of the persona service |
| `ODYSSEY_URL` | Base URL of the odyssey service |
| `JANUS_URL` | Base URL of the janus service |
| `JWT_SECRET` | Secret shared across all services |

---

## Running Locally

```bash
cp .env.example .env
npm install
npm run dev
```

Default port: **3004**

---

## Scripts

```bash
npm run dev       # start with hot reload
npm run build     # compile TypeScript
npm test          # run tests (Vitest)
npm run lint      # check formatting + lint
npm run lint-fix  # auto-fix
```
