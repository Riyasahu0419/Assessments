import { CacheEntry } from '../types/weather.types';
import { APP_CONFIG } from '../constants/appConfig';

/**
 * Cache Manager with TTL support and LRU eviction
 */
class CacheManager {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private readonly maxEntries: number;

  constructor(maxEntries: number = APP_CONFIG.CACHE.MAX_ENTRIES) {
    this.maxEntries = maxEntries;
  }

  /**
   * Get cached data if valid
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    if (!this.isValid(key)) {
      this.clear(key);
      return null;
    }
    
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    
    return entry.data as T;
  }

  /**
   * Set cache entry with timestamp
   */
  set<T>(key: string, data: T, ttl: number = APP_CONFIG.CACHE.WEATHER_TTL): void {
    // Evict if at capacity
    if (this.cache.size >= this.maxEntries && !this.cache.has(key)) {
      this.evict();
    }
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    
    this.cache.set(key, entry as CacheEntry<unknown>);
  }

  /**
   * Check if cache entry is valid
   */
  isValid(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) return false;
    
    const age = Date.now() - entry.timestamp;
    return age < entry.ttl;
  }

  /**
   * Clear specific cache entry
   */
  clear(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clearAll(): void {
    this.cache.clear();
  }

  /**
   * Remove oldest entry (LRU eviction)
   */
  evict(): void {
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.cache.delete(firstKey);
    }
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Get all cache keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }
}

// Export singleton instance
export const cacheManager = new CacheManager();
