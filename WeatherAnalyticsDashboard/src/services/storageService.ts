import { AppSettings, StoredFavorites, StoredSettings } from '../types/weather.types';
import { APP_CONFIG } from '../constants/appConfig';

/**
 * Storage Service for local storage operations
 */
class StorageService {
  /**
   * Save favorites to local storage
   */
  saveFavorites(cityIds: string[]): void {
    try {
      const data: StoredFavorites = {
        version: APP_CONFIG.STORAGE_VERSION,
        cityIds,
        order: cityIds,
        lastModified: Date.now(),
      };
      
      localStorage.setItem(
        APP_CONFIG.STORAGE_KEYS.FAVORITES,
        JSON.stringify(data)
      );
    } catch (error) {
      console.error('Failed to save favorites:', error);
      throw new Error('STORAGE_QUOTA_EXCEEDED');
    }
  }

  /**
   * Load favorites from local storage
   */
  loadFavorites(): string[] {
    try {
      const data = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.FAVORITES);
      
      if (!data) return [];
      
      const parsed: StoredFavorites = JSON.parse(data);
      return parsed.cityIds || [];
    } catch (error) {
      console.error('Failed to load favorites:', error);
      return [];
    }
  }

  /**
   * Save settings to local storage
   */
  saveSettings(settings: AppSettings): void {
    try {
      const data: StoredSettings = {
        version: APP_CONFIG.STORAGE_VERSION,
        temperatureUnit: settings.temperatureUnit,
        refreshInterval: settings.refreshInterval,
        theme: settings.theme || 'light',
        lastModified: Date.now(),
      };
      
      localStorage.setItem(
        APP_CONFIG.STORAGE_KEYS.SETTINGS,
        JSON.stringify(data)
      );
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw new Error('STORAGE_QUOTA_EXCEEDED');
    }
  }

  /**
   * Load settings from local storage
   */
  loadSettings(): AppSettings {
    try {
      const data = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.SETTINGS);
      
      if (!data) {
        return {
          temperatureUnit: 'celsius',
          refreshInterval: APP_CONFIG.REFRESH.INTERVAL,
          theme: 'light',
        };
      }
      
      const parsed: StoredSettings = JSON.parse(data);
      return {
        temperatureUnit: parsed.temperatureUnit,
        refreshInterval: parsed.refreshInterval,
        theme: parsed.theme,
      };
    } catch (error) {
      console.error('Failed to load settings:', error);
      return {
        temperatureUnit: 'celsius',
        refreshInterval: APP_CONFIG.REFRESH.INTERVAL,
        theme: 'light',
      };
    }
  }

  /**
   * Clear all storage
   */
  clearAll(): void {
    try {
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.FAVORITES);
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.SETTINGS);
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.CACHE);
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }

  /**
   * Check if storage is available
   */
  isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const storageService = new StorageService();
