# imperium

BFF (Backend for Frontend) that aggregates data from all dune-lab services into a single response.

Named after the Imperium from Dune — the central governing body that holds all factions together.

## Responsibilities

- Single entry point for the client
- Proxies JWT tokens without validating them (downstream services validate)
- Aggregates `user`, `student`, and `journey` in one request

## Stack

- Node.js 22 + TypeScript
- Fastify (via `@enxoval/http`)
- No DB — pure HTTP aggregation

## How to Run

```bash
cp .env.example .env
npm install
npm run dev
```

Default port: **3004**

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | — | Health check |
| `GET` | `/me` | Bearer JWT | Returns the authenticated user's full profile |

### GET /me

```bash
curl http://localhost:3004/me \
  -H 'Authorization: Bearer <token>'
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "name": "Alice",
    "email": "alice@example.com",
    "emailVerified": true,
    "role": "student",
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "student": {
    "id": "uuid",
    "name": "Alice",
    "email": "alice@example.com",
    "userId": "uuid",
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "journey": {
    "id": "uuid",
    "studentId": "uuid",
    "currentStep": "JOURNEY_INITIATED",
    "status": "active",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

`student` and `journey` are `null` if the user has not enrolled yet.

## Architecture

```
diplomat/http-server/me.ts   → reads Authorization header, decodes token
controllers/me.ts             → orchestrates parallel + sequential calls
diplomat/http-client/
  atreides.ts                 → GET /users/:id
  persona.ts                  → GET /students/by-user/:userId
  odyssey.ts                  → GET /journeys/by-student/:studentId
adapters/me.ts                → pure data assembly (no I/O)
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | HTTP port (default: `3004`) |
| `HOST` | Bind address (default: `0.0.0.0`) |
| `ATREIDES_URL` | Base URL of the atreides service |
| `PERSONA_URL` | Base URL of the persona service |
| `ODYSSEY_URL` | Base URL of the odyssey service |

## Scripts

```bash
npm run dev        # dev server with hot reload
npm run build      # compile TypeScript + generate contracts.json
npm run lint       # check formatting and lint
npm run lint-fix   # auto-fix formatting
```

## CI Pipeline

Every PR runs 5 checks in sequence:

```
Build
├── Unit Tests        (skipped — no unit tests defined)
├── Integration Tests (skipped — no integration tests defined)
└── Publish Contracts
        └── Contract Validation
```

| Check | Description |
|-------|-------------|
| **Build** | Compiles TypeScript, generates `contracts.json` |
| **Publish Contracts** | Publishes `contracts.json` to [dune-lab/contracts](https://github.com/dune-lab/contracts) |
| **Contract Validation** | Runs kanly — validates wire compatibility with atreides, persona and odyssey |

## Contract Validation

Wire types live in `src/wire/`. After every build, `contracts.json` is generated automatically via the `postbuild` script and published to the contract registry.

Imperium is a pure consumer — it only defines `wire_in` types (what it expects from each partner). kanly validates that each partner's `wire_out` matches.

To add metadata to a wire type for richer kanly logs:

```ts
static describe() {
  return {
    _meta: { method: 'GET', path: '/users/:id' },
    id: { type: 'uuid' },
    name: { type: 'string' },
  };
}
```
