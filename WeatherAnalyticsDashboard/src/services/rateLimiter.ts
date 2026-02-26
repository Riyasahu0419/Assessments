import { API_CONFIG } from '../constants/apiConfig';

interface RequestRecord {
  timestamp: number;
  endpoint: string;
  cityId?: string;
}

/**
 * API Rate Limiter with request tracking and queuing
 */
class APIRateLimiter {
  private requests: RequestRecord[] = [];
  private readonly maxRequests: number;
  private readonly windowSize: number;
  private requestQueue: Array<() => void> = [];

  constructor() {
    this.maxRequests = API_CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_MINUTE;
    this.windowSize = API_CONFIG.RATE_LIMIT.WINDOW_SIZE;
  }

  /**
   * Check if a request can be made
   */
  canMakeRequest(): boolean {
    this.cleanOldRequests();
    return this.requests.length < this.maxRequests;
  }

  /**
   * Record a request
   */
  recordRequest(endpoint: string, cityId?: string): void {
    this.requests.push({
      timestamp: Date.now(),
      endpoint,
      cityId,
    });
  }

  /**
   * Get wait time in milliseconds
   */
  getWaitTime(): number {
    if (this.canMakeRequest()) return 0;
    
    const oldestRequest = this.requests[0];
    if (!oldestRequest) return 0;
    
    return (oldestRequest.timestamp + this.windowSize) - Date.now();
  }

  /**
   * Queue a request for later execution
   */
  queueRequest(callback: () => void): void {
    this.requestQueue.push(callback);
    this.processQueue();
  }

  /**
   * Process queued requests
   */
  private processQueue(): void {
    if (this.requestQueue.length === 0) return;
    
    if (this.canMakeRequest()) {
      const callback = this.requestQueue.shift();
      if (callback) callback();
      
      // Process next in queue after a small delay
      setTimeout(() => this.processQueue(), 100);
    } else {
      // Retry after wait time
      const waitTime = this.getWaitTime();
      setTimeout(() => this.processQueue(), waitTime);
    }
  }

  /**
   * Clean old requests outside the window
   */
  private cleanOldRequests(): void {
    const cutoff = Date.now() - this.windowSize;
    this.requests = this.requests.filter((r) => r.timestamp > cutoff);
  }

  /**
   * Get current request count
   */
  getRequestCount(): number {
    this.cleanOldRequests();
    return this.requests.length;
  }

  /**
   * Reset rate limiter
   */
  reset(): void {
    this.requests = [];
    this.requestQueue = [];
  }
}

// Export singleton instance
export const rateLimiter = new APIRateLimiter();
