/**
 * Format date to readable string
 * @param date - Date to format
 * @param format - Format type ('short', 'long', 'time')
 * @returns Formatted date string
 */
export function formatDate(date: Date, format: 'short' | 'long' | 'time' = 'short'): string {
  if (format === 'time') {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  
  if (format === 'long') {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format relative time (e.g., "2 minutes ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
}

/**
 * Get day of week from date
 * @param date - Date to get day from
 * @returns Day of week (e.g., "Monday")
 */
export function getDayOfWeek(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

/**
 * Get short day of week from date
 * @param date - Date to get day from
 * @returns Short day of week (e.g., "Mon")
 */
export function getShortDayOfWeek(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}
