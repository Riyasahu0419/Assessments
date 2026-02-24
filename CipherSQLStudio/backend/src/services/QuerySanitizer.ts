import { SanitizationResult } from '../types';

export class QuerySanitizer {
  sanitize(query: string): SanitizationResult {
    const blockedReasons: string[] = [];
    let isAllowed = true;

    // Step 1: Normalize query
    const normalizedQuery = query.trim().toUpperCase();

    if (normalizedQuery.length === 0) {
      return {
        sanitizedQuery: query,
        isAllowed: false,
        blockedReasons: ['Query cannot be empty'],
      };
    }

    // Step 2: Check for dangerous DDL statements
    const ddlPatterns = [
      /\bCREATE\b/,
      /\bDROP\b/,
      /\bALTER\b/,
      /\bTRUNCATE\b/,
      /\bRENAME\b/,
    ];

    for (const pattern of ddlPatterns) {
      if (pattern.test(normalizedQuery)) {
        blockedReasons.push(`DDL statement not allowed: ${pattern.source}`);
        isAllowed = false;
      }
    }

    // Step 3: Check for dangerous DML statements
    const dmlPatterns = [/\bINSERT\b/, /\bUPDATE\b/, /\bDELETE\b/, /\bMERGE\b/];

    for (const pattern of dmlPatterns) {
      if (pattern.test(normalizedQuery)) {
        blockedReasons.push(`DML statement not allowed: ${pattern.source}`);
        isAllowed = false;
      }
    }

    // Step 4: Check for system commands
    const systemPatterns = [
      /\bEXEC\b/,
      /\bEXECUTE\b/,
      /\bCALL\b/,
      /\\x/,
      /\bCOPY\b/,
      /\bGRANT\b/,
      /\bREVOKE\b/,
    ];

    for (const pattern of systemPatterns) {
      if (pattern.test(normalizedQuery)) {
        blockedReasons.push(`System command not allowed: ${pattern.source}`);
        isAllowed = false;
      }
    }

    // Step 5: Enforce SELECT-only queries
    if (!normalizedQuery.startsWith('SELECT') && !normalizedQuery.startsWith('WITH')) {
      blockedReasons.push('Only SELECT queries are allowed');
      isAllowed = false;
    }

    // Step 6: Check for multiple statements (SQL injection prevention)
    const statementCount = (query.match(/;/g) || []).length;
    if (statementCount > 1 || (statementCount === 1 && !query.trim().endsWith(';'))) {
      blockedReasons.push('Multiple statements not allowed');
      isAllowed = false;
    }

    // Step 7: Remove trailing semicolon for safe execution
    const sanitizedQuery = query.trim().replace(/;$/, '');

    return {
      sanitizedQuery,
      isAllowed,
      blockedReasons,
    };
  }

  detectDangerousPatterns(query: string): string[] {
    const result = this.sanitize(query);
    return result.blockedReasons;
  }

  enforceReadOnlyMode(query: string): boolean {
    const result = this.sanitize(query);
    return result.isAllowed;
  }
}
