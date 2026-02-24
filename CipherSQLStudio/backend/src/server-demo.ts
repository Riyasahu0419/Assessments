import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));

// Mock data
const mockAssignments = [
  {
    _id: '1',
    id: '1',
    title: 'Basic SELECT Query',
    description: 'Learn to retrieve data from a single table',
    difficulty: 'easy',
    category: 'basics',
    question: 'Write a query to select all employees from the employees table.',
    requirements: ['Select all columns', 'Return all rows'],
    estimatedTime: 5,
    tables: [
      {
        name: 'employees',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
          { name: 'name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
          { name: 'department_id', type: 'INTEGER', nullable: true, primaryKey: false },
          { name: 'salary', type: 'DECIMAL(10,2)', nullable: true, primaryKey: false },
          { name: 'hire_date', type: 'DATE', nullable: true, primaryKey: false },
        ],
      },
    ],
    sampleData: {
      employees: [
        { id: 1, name: 'Alice Johnson', department_id: 1, salary: 95000, hire_date: '2020-01-15' },
        { id: 2, name: 'Bob Smith', department_id: 1, salary: 85000, hire_date: '2021-03-20' },
        { id: 3, name: 'Carol White', department_id: 2, salary: 75000, hire_date: '2019-06-10' },
      ],
    },
  },
  {
    _id: '2',
    id: '2',
    title: 'Filtering with WHERE',
    description: 'Learn to filter data using WHERE clause',
    difficulty: 'easy',
    category: 'basics',
    question: 'Write a query to find all employees with a salary greater than 80000.',
    requirements: ['Use WHERE clause', 'Filter by salary', 'Return all matching rows'],
    estimatedTime: 10,
    tables: [
      {
        name: 'employees',
        columns: [
          { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
          { name: 'name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
          { name: 'salary', type: 'DECIMAL(10,2)', nullable: true, primaryKey: false },
        ],
      },
    ],
    sampleData: {
      employees: [
        { id: 1, name: 'Alice Johnson', salary: 95000 },
        { id: 2, name: 'Bob Smith', salary: 85000 },
        { id: 3, name: 'Carol White', salary: 75000 },
      ],
    },
  },
];

// Routes
app.get('/api/assignments', (_req, res) => {
  res.json({
    success: true,
    data: mockAssignments,
    pagination: {
      page: 1,
      limit: 20,
      total: mockAssignments.length,
      totalPages: 1,
    },
  });
});

app.get('/api/assignments/:id', (req, res): void => {
  const assignment = mockAssignments.find((a) => a.id === req.params.id);
  if (!assignment) {
    res.status(404).json({
      success: false,
      error: 'Assignment not found',
    });
    return;
  }
  res.json({
    success: true,
    data: assignment,
  });
});

app.post('/api/query/execute', (req, res): void => {
  const { query } = req.body;

  // Simple mock validation
  if (!query || query.trim().length === 0) {
    res.status(400).json({
      success: false,
      error: 'Query cannot be empty',
    });
    return;
  }

  // Mock query execution
  res.json({
    success: true,
    data: {
      columns: ['id', 'name', 'salary'],
      rows: [
        [1, 'Alice Johnson', 95000],
        [2, 'Bob Smith', 85000],
      ],
      rowCount: 2,
      executionTime: 45,
    },
  });
});

app.post('/api/hints/generate', (_req, res) => {
  const hints = [
    'Start with the SELECT keyword to retrieve data',
    'Use the FROM clause to specify which table to query',
    'Consider using WHERE to filter your results',
  ];

  const randomHint = hints[Math.floor(Math.random() * hints.length)];

  res.json({
    success: true,
    data: {
      hint: randomHint,
      hintsUsed: 1,
    },
  });
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), mode: 'demo' });
});

// Error handling
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Demo server running on port ${PORT}`);
  console.log(`✓ Mode: DEMO (no database required)`);
  console.log(`✓ Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

export default app;
