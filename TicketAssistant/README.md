# Support Ticket System

A web app where users submit support tickets and AI categorizes them and suggests replies.

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Database: In-memory store
- AI: OpenAI (gpt-4o-mini)

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
# Add your OpenAI API key to .env
npm install
npm run dev
```

Runs on `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /tickets | Create ticket (triggers AI) |
| GET | /tickets | List all tickets |
| GET | /tickets/:id | Get ticket detail |
| POST | /tickets/:id/status | Update status |
| POST | /tickets/:id/reply | Update AI reply |

## AI Output

```json
{
  "category": "PAYMENT",
  "reply": "We're sorry for the inconvenience...",
  "confidence": 0.92
}
```

Categories: `PAYMENT`, `LOGIN`, `BUG`, `OTHER`

## Assumptions

- Tickets are stored in-memory (reset on server restart)
- AI processing happens synchronously at ticket creation time
- If AI fails, ticket falls back to category `OTHER` with a generic reply
- No authentication required
