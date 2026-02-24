import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/database';
import { DatabaseConnectionPool } from './services/DatabaseConnectionPool';
import { QueryExecutionService } from './services/QueryExecutionService';
import { AuthService } from './services/AuthService';
import { AssignmentRepository } from './repositories/AssignmentRepository';
import { UserRepository } from './repositories/UserRepository';
import { AttemptHistoryRepository } from './repositories/AttemptHistoryRepository';
import { AssignmentController } from './controllers/AssignmentController';
import { QueryExecutionController } from './controllers/QueryExecutionController';
import { HintController } from './controllers/HintController';
import { AuthController } from './controllers/AuthController';
import { createRoutes } from './routes';
import { globalLimiter } from './middleware/rateLimiter';

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
app.use(globalLimiter);

// Initialize services
const dbPool = new DatabaseConnectionPool(process.env.DATABASE_URL!);
const queryService = new QueryExecutionService(dbPool);
const authService = new AuthService(process.env.JWT_SECRET || 'default-secret-change-me');

// Initialize repositories
const assignmentRepo = new AssignmentRepository();
const userRepo = new UserRepository();
const attemptRepo = new AttemptHistoryRepository();

// Initialize controllers
const assignmentController = new AssignmentController(assignmentRepo);
const queryController = new QueryExecutionController(queryService, attemptRepo);
const hintController = new HintController(assignmentRepo, process.env.OPENAI_API_KEY);
const authController = new AuthController(authService, userRepo);

// Routes
app.use('/api', createRoutes(assignmentController, queryController, hintController, authController, authService));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB(process.env.MONGODB_URI!);

    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
