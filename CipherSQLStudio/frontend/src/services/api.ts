import { Assignment, AssignmentDetail, QueryResult, HintRequest, AuthCredentials, User } from '../types';

const API_BASE_URL = '/api';

class ApiClient {
  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async getAssignments(difficulty?: string, category?: string, page: number = 1): Promise<{ data: Assignment[]; pagination: any }> {
    const params = new URLSearchParams();
    if (difficulty) params.append('difficulty', difficulty);
    if (category) params.append('category', category);
    params.append('page', page.toString());

    const response = await fetch(`${API_BASE_URL}/assignments?${params}`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error);
    }

    return { data: result.data, pagination: result.pagination };
  }

  async getAssignmentById(id: string): Promise<AssignmentDetail> {
    const response = await fetch(`${API_BASE_URL}/assignments/${id}`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error);
    }

    return result.data;
  }

  async executeQuery(assignmentId: string, query: string): Promise<QueryResult> {
    const response = await fetch(`${API_BASE_URL}/query/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify({ assignmentId, query }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Query execution failed');
    }

    return result.data;
  }

  async generateHint(request: HintRequest): Promise<{ hint: string; hintsUsed: number }> {
    const response = await fetch(`${API_BASE_URL}/hints/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error);
    }

    return result.data;
  }

  async signup(credentials: AuthCredentials): Promise<{ token: string; user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error);
    }

    return result.data;
  }

  async login(credentials: AuthCredentials): Promise<{ token: string; user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error);
    }

    return result.data;
  }
}

export const apiClient = new ApiClient();
