import { Pool, PoolClient, QueryResult as PgQueryResult } from 'pg';
import { QueryResult } from '../types';

export class DatabaseConnectionPool {
  private pool: Pool;

  constructor(connectionString: string) {
    this.pool = new Pool({
      connectionString,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 3000,
    });
  }

  async getConnection(): Promise<PoolClient> {
    try {
      const client = await this.pool.connect();
      return client;
    } catch (error) {
      throw new Error(`Failed to acquire database connection: ${(error as Error).message}`);
    }
  }

  async releaseConnection(client: PoolClient): Promise<void> {
    try {
      client.release();
    } catch (error) {
      console.error('Error releasing connection:', error);
    }
  }

  async executeInSandbox(
    assignmentId: string,
    query: string,
    timeout: number = 5000
  ): Promise<QueryResult> {
    const client = await this.getConnection();

    try {
      // Set schema context for this assignment
      await client.query(`SET search_path = assignment_${assignmentId};`);

      // Set statement timeout
      await client.query(`SET statement_timeout = ${timeout};`);

      // Execute query
      const startTime = Date.now();
      const result: PgQueryResult = await client.query(query);
      const executionTime = Date.now() - startTime;

      return {
        columns: result.fields.map((f) => f.name),
        rows: result.rows,
        rowCount: result.rowCount || 0,
        executionTime,
      };
    } finally {
      await this.releaseConnection(client);
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
