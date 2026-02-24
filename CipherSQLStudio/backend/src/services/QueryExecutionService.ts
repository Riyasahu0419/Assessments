import { QuerySanitizer } from './QuerySanitizer';
import { DatabaseConnectionPool } from './DatabaseConnectionPool';
import { QueryResult } from '../types';

export class QueryValidationError extends Error {
  constructor(public reasons: string[]) {
    super(reasons.join(', '));
    this.name = 'QueryValidationError';
  }
}

export class QueryTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QueryTimeoutError';
  }
}

export class QueryExecutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QueryExecutionError';
  }
}

export class AssignmentNotFoundError extends Error {
  constructor(assignmentId: string) {
    super(`Assignment not found: ${assignmentId}`);
    this.name = 'AssignmentNotFoundError';
  }
}

export class QueryExecutionService {
  private sanitizer: QuerySanitizer;
  private dbPool: DatabaseConnectionPool;

  constructor(dbPool: DatabaseConnectionPool) {
    this.sanitizer = new QuerySanitizer();
    this.dbPool = dbPool;
  }

  async execute(assignmentId: string, userQuery: string, _userId?: string): Promise<QueryResult> {
    // Step 1: Validate and sanitize query
    const sanitizationResult = this.sanitizer.sanitize(userQuery);

    if (!sanitizationResult.isAllowed) {
      throw new QueryValidationError(sanitizationResult.blockedReasons);
    }

    // Step 2: Execute query in sandbox
    try {
      const result = await this.dbPool.executeInSandbox(
        assignmentId,
        sanitizationResult.sanitizedQuery,
        5000
      );

      return result;
    } catch (error: any) {
      if (error.code === '57014' || error.message?.includes('timeout')) {
        throw new QueryTimeoutError('Query exceeded 5 second limit');
      }
      throw new QueryExecutionError(error.message || 'Query execution failed');
    }
  }
}
