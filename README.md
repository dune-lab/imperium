# imperium

BFF (Backend for Frontend) that aggregates data from all Dune services into a single response.

Named after the Imperium from Dune — the central governing body that holds all factions together.

## Responsibilities

- Single entry point for the client
- Proxies JWT tokens without validating them (downstream services validate)
- Aggregates `user`, `student`, and `journey` in one request

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/me` | Bearer JWT | Returns the authenticated user's full profile |

### `GET /me`

Returns the complete profile for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
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

## Running

```bash
cp .env.example .env
npm install
npm run dev
```

Default port: **3004**

## Environment variables

| Variable | Description |
|----------|-------------|
| `PORT` | HTTP port (default: 3004) |
| `HOST` | Bind address (default: 0.0.0.0) |
| `ATREIDES_URL` | Base URL of the atreides service |
| `PERSONA_URL` | Base URL of the persona service |
| `ODYSSEY_URL` | Base URL of the odyssey service |
