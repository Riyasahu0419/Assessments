# Support Ticket System

A web application where users can submit support tickets and AI automatically categorizes the issue and suggests a professional reply.

## Live Demo

- Frontend: https://assessments-9y3b.vercel.app
- Backend API: https://assessments-rfis.vercel.app

---

## What I Built

This is a full-stack support ticket management system with AI integration. Here is what the application does:

- Users fill out a form with their name, email, and issue description
- On submission, the backend saves the ticket and immediately calls OpenAI to analyze the issue
- OpenAI categorizes the ticket (PAYMENT, LOGIN, BUG, or OTHER), generates a professional suggested reply, and returns a confidence score
- The dashboard shows all submitted tickets with their category and status at a glance
- Clicking a ticket opens the full detail page where you can read the AI reply, edit it, and mark the ticket as resolved

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite |
| Routing | React Router v7 |
| Forms | Formik + Yup validation |
| Backend | Node.js, Express |
| AI | OpenAI API (gpt-4o-mini) |
| Storage | In-memory (resets on server restart) |
| Hosting | Vercel (two separate projects) |

---

## Project Structure

```
├── frontend/          # React app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── CreateTicket.tsx   # Ticket submission form
│   │   │   ├── Dashboard.tsx      # All tickets list
│   │   │   └── TicketDetail.tsx   # Single ticket view + actions
│   │   ├── api.ts                 # All fetch calls to backend
│   │   └── App.tsx                # Router + navbar
│   └── vercel.json                # SPA rewrite rules
│
└── backend/           # Express API
    ├── routes/
    │   └── tickets.js             # All ticket endpoints
    ├── services/
    │   └── aiService.js           # OpenAI integration
    ├── models/
    │   └── ticketStore.js         # In-memory data store
    ├── api/
    │   └── index.js               # Vercel serverless entry point
    └── server.js                  # Local dev server
```

---

## How to Run Locally

### Prerequisites
- Node.js 18+
- An OpenAI API key from https://platform.openai.com/api-keys

### 1. Clone the repo

```bash
git clone <your-repo-url>
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and add your OpenAI key:

```
OPENAI_API_KEY=sk-your-key-here
```

Start the backend:

```bash
npm run dev
```

Runs on `http://localhost:5000`

### 3. Set up the frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Runs on `http://localhost:5173`

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/tickets | Create a ticket, triggers AI processing |
| GET | /api/tickets | Get all tickets |
| GET | /api/tickets/:id | Get a single ticket with full detail |
| POST | /api/tickets/:id/status | Update ticket status (OPEN / RESOLVED) |
| POST | /api/tickets/:id/reply | Update the AI suggested reply |

### Example — Create Ticket

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "description": "My payment failed but money was deducted"
}
```

Response:
```json
{
  "ticketId": "tkt_abc123",
  "status": "OPEN"
}
```

---

## How AI Works

After a ticket is created, the backend sends the issue description to OpenAI with a prompt that asks it to:

1. Categorize the issue into one of: `PAYMENT`, `LOGIN`, `BUG`, `OTHER`
2. Write a short professional reply to the user
3. Return a confidence score between 0 and 1

The AI responds in structured JSON:

```json
{
  "category": "PAYMENT",
  "reply": "We're sorry for the inconvenience. Please share your transaction ID so we can investigate.",
  "confidence": 0.92
}
```

If the AI call fails for any reason, the ticket falls back to category `OTHER` with a generic reply so the app never breaks.

---

## Deployment (Vercel)

The app is deployed as two separate Vercel projects from the same GitHub repository.

### Backend deployment
- Root directory set to `backend`
- Framework preset: Other
- Environment variable added: `OPENAI_API_KEY`

### Frontend deployment
- Root directory set to `frontend`
- Environment variable added: `VITE_API_URL=https://assessments-rfis.vercel.app`
- `vercel.json` includes a rewrite rule so React Router works on page refresh

---

## Assumptions

- No user authentication is required
- Tickets are stored in memory — they reset when the server restarts (acceptable for demo purposes)
- AI processing is synchronous — the ticket creation response waits for OpenAI before returning
- The suggested reply can be edited by the support agent before sending
