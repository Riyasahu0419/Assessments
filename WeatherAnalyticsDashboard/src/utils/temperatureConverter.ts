import { TemperatureUnit } from '../types/weather.types';

/**
 * Convert temperature between Celsius and Fahrenheit
 * @param value - Temperature value to convert
 * @param from - Source unit
 * @param to - Target unit
 * @returns Converted temperature value
 */
export function convertTemperature(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit
): number {
  if (from === to) return value;
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return (value * 9) / 5 + 32;
  }
  
  if (from === 'fahrenheit' && to === 'celsius') {
    return ((value - 32) * 5) / 9;
  }
  
  return value;
}

/**
 * Format temperature with unit symbol
 * @param value - Temperature value
 * @param unit - Temperature unit
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted temperature string
 */
export function formatTemperature(
  value: number,
  unit: TemperatureUnit,
  decimals: number = 1
): string {
  const symbol = unit === 'celsius' ? '°C' : '°F';
  return `${value.toFixed(decimals)}${symbol}`;
}

/**
 * Calculate dew point from temperature and humidity
 * @param tempC - Temperature in Celsius
 * @param humidity - Relative humidity (0-100)
 * @returns Dew point in Celsius
 */
export function calculateDewPoint(tempC: number, humidity: number): number {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * tempC) / (b + tempC)) + Math.log(humidity / 100);
  return (b * alpha) / (a - alpha);
}
