import { Response } from 'express';
import { QueryExecutionService, QueryValidationError, QueryTimeoutError } from '../services/QueryExecutionService';
import { AuthRequest } from '../middleware/auth';
import { AttemptHistoryRepository } from '../repositories/AttemptHistoryRepository';

export class QueryExecutionController {
  private queryService: QueryExecutionService;
  private attemptRepo: AttemptHistoryRepository;

  constructor(queryService: QueryExecutionService, attemptRepo: AttemptHistoryRepository) {
    this.queryService = queryService;
    this.attemptRepo = attemptRepo;
  }

  executeQuery = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { assignmentId, query } = req.body;

      if (!assignmentId || !query) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: assignmentId and query',
        });
        return;
      }

      const result = await this.queryService.execute(assignmentId, query, req.user?.userId);

      // Save attempt history if user is authenticated
      if (req.user) {
        try {
          await this.attemptRepo.create({
            userId: req.user.userId as any,
            assignmentId: assignmentId as any,
            query,
            executionTime: result.executionTime,
            isCorrect: false, // Would need solution comparison logic
            hintsUsed: 0,
            attemptedAt: new Date(),
          });
        } catch (error) {
          console.error('Failed to save attempt history:', error);
        }
      }

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      if (error instanceof QueryValidationError) {
        res.status(400).json({
          success: false,
          error: 'Query validation failed',
          blockedReasons: error.reasons,
        });
      } else if (error instanceof QueryTimeoutError) {
        res.status(408).json({
          success: false,
          error: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          error: error.message || 'Query execution failed',
        });
      }
    }
  };
}
