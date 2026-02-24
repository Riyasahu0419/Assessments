# CipherSQLStudio - Quick Start Guide

This guide will help you get CipherSQLStudio up and running quickly.

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ PostgreSQL 14+ installed and running
- ✅ MongoDB Atlas account OR local MongoDB running
- ✅ OpenAI API key (optional, for AI-powered hints)

## Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example backend/.env
```

Edit `backend/.env` with your credentials:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/cipher_sql_studio
MONGODB_URI=mongodb://localhost:27017/cipher_sql_studio
JWT_SECRET=your-random-secret-key-here
OPENAI_API_KEY=sk-your-openai-key-here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Step 3: Set Up PostgreSQL

```bash
# Run the setup script
psql -U postgres -f backend/src/scripts/setupPostgres.sql
```

Or manually:
```sql
CREATE DATABASE cipher_sql_studio;
\c cipher_sql_studio;
-- Then run the contents of setupPostgres.sql
```

### Step 4: Seed MongoDB

```bash
cd backend
npx ts-node src/scripts/seedDatabase.ts
```

### Step 5: Start the Application

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

### Step 6: Open in Browser

Navigate to: http://localhost:3000

You should see the CipherSQLStudio homepage with sample assignments!

## Testing the Application

1. Click on "Basic SELECT Query" assignment
2. Write a simple query: `SELECT * FROM employees;`
3. Click "Execute Query" or press Ctrl+Enter
4. See the results displayed below
5. Click "Get Hint" if you need help

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running: `pg_isready`
- Check MongoDB is running: `mongosh` or check Atlas connection
- Verify environment variables in `backend/.env`

### Frontend won't start
- Clear node_modules: `rm -rf node_modules && npm install`
- Check port 3000 is available

### Query execution fails
- Verify PostgreSQL user `sql_learner` exists
- Check assignment schemas exist: `\dn` in psql
- Verify sample data is loaded: `SELECT * FROM assignment_1.employees;`

### No assignments showing
- Run the seed script again: `npx ts-node src/scripts/seedDatabase.ts`
- Check MongoDB connection in backend logs

## Next Steps

- Add more assignments in MongoDB
- Configure OpenAI API key for AI hints
- Customize the styling in `frontend/src/styles/`
- Add authentication by uncommenting auth routes

## Development Tips

### Hot Reload
Both frontend and backend support hot reload. Changes will automatically refresh.

### Database Reset
```bash
# Reset PostgreSQL
psql -U postgres -c "DROP DATABASE cipher_sql_studio;"
psql -U postgres -f backend/src/scripts/setupPostgres.sql

# Reset MongoDB
cd backend
npx ts-node src/scripts/seedDatabase.ts
```

### View Logs
- Backend logs: Check terminal running `npm run dev`
- Frontend logs: Open browser DevTools console

## Production Deployment

See README.md for production deployment instructions.

## Need Help?

- Check README.md for detailed documentation
- Review the code in `backend/src/` and `frontend/src/`
- Open an issue on GitHub

Happy SQL learning! 🎓
