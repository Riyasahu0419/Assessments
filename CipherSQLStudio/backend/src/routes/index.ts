import { Router } from 'express';
import { AssignmentController } from '../controllers/AssignmentController';
import { QueryExecutionController } from '../controllers/QueryExecutionController';
import { HintController } from '../controllers/HintController';
import { AuthController } from '../controllers/AuthController';
import {
  queryExecutionLimiter,
  hintGenerationLimiter,
  authLimiter,
} from '../middleware/rateLimiter';
import { createAuthMiddleware, optionalAuth } from '../middleware/auth';
import { AuthService } from '../services/AuthService';

export const createRoutes = (
  assignmentController: AssignmentController,
  queryController: QueryExecutionController,
  hintController: HintController,
  authController: AuthController,
  authService: AuthService
) => {
  const router = Router();
  const authMiddleware = createAuthMiddleware(authService);
  const optionalAuthMiddleware = optionalAuth(authService);

  // Assignment routes
  router.get('/assignments', assignmentController.getAllAssignments);
  router.get('/assignments/:id', assignmentController.getAssignmentById);

  // Query execution route
  router.post(
    '/query/execute',
    queryExecutionLimiter,
    optionalAuthMiddleware,
    queryController.executeQuery
  );

  // Hint generation route
  router.post('/hints/generate', hintGenerationLimiter, hintController.generateHint);

  // Auth routes
  router.post('/auth/signup', authLimiter, authController.signup);
  router.post('/auth/login', authLimiter, authController.login);

  return router;
};
