export interface SanitizationResult {
  sanitizedQuery: string;
  isAllowed: boolean;
  blockedReasons: string[];
}

export interface QueryResult {
  columns: string[];
  rows: any[][];
  rowCount: number;
  executionTime: number;
}

export interface TableSchema {
  name: string;
  columns: ColumnDefinition[];
}

export interface ColumnDefinition {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  foreignKey?: {
    table: string;
    column: string;
  };
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  estimatedTime: number;
}

export interface AssignmentDetail extends Assignment {
  question: string;
  requirements: string[];
  tables: TableSchema[];
  sampleData: Record<string, any[]>;
}

export interface HintRequest {
  assignmentId: string;
  currentQuery: string;
  previousHints: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
}
