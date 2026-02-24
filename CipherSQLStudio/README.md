# CipherSQLStudio

A browser-based SQL learning platform where students can practice SQL queries against pre-configured assignments with real-time execution and intelligent hints.

## Features

- 📚 Browse SQL assignments by difficulty and category
- 💻 Write SQL queries in Monaco Editor with syntax highlighting
- ⚡ Real-time query execution against PostgreSQL
- 💡 AI-powered hints using OpenAI/Gemini
- 📱 Fully responsive design (mobile-first)
- 🔒 Secure query validation and sanitization
- 👤 Optional user authentication and attempt history

## Tech Stack

### Frontend
- React 18.2 with TypeScript
- Vite for build tooling
- Monaco Editor for SQL editing
- SCSS for styling (mobile-first responsive design)
- React Router for navigation

### Backend
- Node.js with Express.js
- TypeScript
- PostgreSQL for query execution sandbox
- MongoDB Atlas for data persistence
- OpenAI API for hint generation
- JWT for authentication

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key (optional, for AI hints)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd cipher-sql-studio
```

### 2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example backend/.env
```

Edit `backend/.env` with your configuration:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/cipher_sql_studio
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cipher_sql_studio

# JWT Configuration
JWT_SECRET=your-secret-key-here-change-in-production

# LLM API Configuration
OPENAI_API_KEY=your-openai-api-key-here

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 4. Set up PostgreSQL

```sql
-- Create database
CREATE DATABASE cipher_sql_studio;

-- Create read-only user
CREATE USER sql_learner WITH PASSWORD 'learner_password';

-- Create assignment schemas
CREATE SCHEMA assignment_1;
CREATE SCHEMA assignment_2;

-- Grant read-only access
GRANT USAGE ON SCHEMA assignment_1 TO sql_learner;
GRANT SELECT ON ALL TABLES IN SCHEMA assignment_1 TO sql_learner;
ALTER DEFAULT PRIVILEGES IN SCHEMA assignment_1 GRANT SELECT ON TABLES TO sql_learner;

-- Example: Create sample tables in assignment_1
SET search_path = assignment_1;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  salary DECIMAL(10, 2),
  hire_date DATE
);

-- Insert sample data
INSERT INTO departments (name, location) VALUES
  ('Engineering', 'San Francisco'),
  ('Sales', 'New York'),
  ('Marketing', 'Los Angeles');

INSERT INTO employees (name, department_id, salary, hire_date) VALUES
  ('Alice Johnson', 1, 95000, '2020-01-15'),
  ('Bob Smith', 1, 85000, '2021-03-20'),
  ('Carol White', 2, 75000, '2019-06-10'),
  ('David Brown', 2, 80000, '2020-11-05'),
  ('Eve Davis', 3, 70000, '2022-02-14');
```

### 5. Seed MongoDB with sample assignments

Run the backend server once to connect to MongoDB, then use MongoDB Compass or the shell to insert sample assignments:

```javascript
db.assignments.insertOne({
  title: "Basic SELECT Query",
  description: "Learn to retrieve data from a single table",
  difficulty: "easy",
  category: "basics",
  question: "Write a query to select all employees from the employees table.",
  requirements: [
    "Select all columns",
    "Return all rows"
  ],
  tables: [
    {
      name: "employees",
      columns: [
        { name: "id", type: "INTEGER", nullable: false, primaryKey: true },
        { name: "name", type: "VARCHAR(100)", nullable: false, primaryKey: false },
        { name: "department_id", type: "INTEGER", nullable: true, primaryKey: false, foreignKey: { table: "departments", column: "id" } },
        { name: "salary", type: "DECIMAL(10,2)", nullable: true, primaryKey: false },
        { name: "hire_date", type: "DATE", nullable: true, primaryKey: false }
      ]
    }
  ],
  sampleData: {
    employees: [
      { id: 1, name: "Alice Johnson", department_id: 1, salary: 95000, hire_date: "2020-01-15" },
      { id: 2, name: "Bob Smith", department_id: 1, salary: 85000, hire_date: "2021-03-20" },
      { id: 3, name: "Carol White", department_id: 2, salary: 75000, hire_date: "2019-06-10" }
    ]
  },
  solutionQuery: "SELECT * FROM employees;",
  hints: [
    "Use the SELECT keyword to retrieve data",
    "Use * to select all columns",
    "Don't forget the FROM clause to specify the table"
  ],
  estimatedTime: 5
});
```

## Running the Application

### Development Mode

```bash
# Terminal 1: Start backend server
cd backend
npm run dev

# Terminal 2: Start frontend dev server
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Build

```bash
# Build backend
cd backend
npm run build
npm start

# Build frontend
cd frontend
npm run build
npm run preview
```

## API Endpoints

### Assignments
- `GET /api/assignments` - Get all assignments (with filtering)
- `GET /api/assignments/:id` - Get assignment by ID

### Query Execution
- `POST /api/query/execute` - Execute SQL query

### Hints
- `POST /api/hints/generate` - Generate hint for assignment

### Authentication (Optional)
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

## Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## Security Features

- Query sanitization (blocks DDL/DML statements)
- SQL injection prevention
- Query timeout enforcement (5 seconds)
- Schema isolation per assignment
- Rate limiting on all endpoints
- JWT authentication for protected routes
- CORS configuration
- Helmet security headers

## Project Structure

```
cipher-sql-studio/
├── backend/
│   ├── src/
│   │   ├── controllers/      # API controllers
│   │   ├── models/           # Mongoose models
│   │   ├── repositories/     # Data access layer
│   │   ├── services/         # Business logic
│   │   ├── middleware/       # Express middleware
│   │   ├── routes/           # API routes
│   │   ├── config/           # Configuration
│   │   └── server.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API client
│   │   ├── styles/           # SCSS styles
│   │   ├── types/            # TypeScript types
│   │   ├── App.tsx           # Root component
│   │   └── main.tsx          # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
