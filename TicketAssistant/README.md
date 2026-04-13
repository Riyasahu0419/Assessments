# Support Ticket System

A web app where users submit support tickets and AI categorizes them and suggests replies.

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Database: In-memory store
- AI: OpenAI (gpt-4o-mini)

## Deploying to Vercel

Frontend is live at: https://assessments-9y3b.vercel.app
Backend is live at: https://assessments-ptjk.vercel.app

Deploy the backend and frontend as two separate Vercel projects from the same repo.

### 1. Deploy the Backend

1. Go to [vercel.com](https://vercel.com) → New Project → import your repo
2. Set root directory to `backend`
3. Framework preset: **Other**
4. Add environment variable: `OPENAI_API_KEY=your_key`
5. Deploy — copy the URL (e.g. `https://your-backend.vercel.app`)

### 2. Configure the Frontend

1. Go to your frontend project on Vercel → Settings → Environment Variables
2. Add: `VITE_API_URL=https://your-backend.vercel.app`
3. Redeploy the frontend (Deployments → Redeploy)

### 3. Local Development

```bash
# backend
cd backend
cp .env.example .env   # add OPENAI_API_KEY
npm run dev            # http://localhost:5000

# frontend
cd frontend
echo "VITE_API_URL=http://localhost:5000" > .env
npm run dev            # http://localhost:5173
```



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
