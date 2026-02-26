/**
 * Map weather condition codes to icon identifiers
 * Based on WeatherAPI.com condition codes
 */
export function mapWeatherIcon(conditionCode: number): string {
  const iconMap: Record<number, string> = {
    1000: 'sunny', // Sunny/Clear
    1003: 'partly-cloudy', // Partly cloudy
    1006: 'cloudy', // Cloudy
    1009: 'overcast', // Overcast
    1030: 'mist', // Mist
    1063: 'patchy-rain', // Patchy rain possible
    1066: 'patchy-snow', // Patchy snow possible
    1069: 'patchy-sleet', // Patchy sleet possible
    1072: 'patchy-freezing-drizzle', // Patchy freezing drizzle possible
    1087: 'thundery-outbreaks', // Thundery outbreaks possible
    1114: 'blowing-snow', // Blowing snow
    1117: 'blizzard', // Blizzard
    1135: 'fog', // Fog
    1147: 'freezing-fog', // Freezing fog
    1150: 'patchy-light-drizzle', // Patchy light drizzle
    1153: 'light-drizzle', // Light drizzle
    1168: 'freezing-drizzle', // Freezing drizzle
    1171: 'heavy-freezing-drizzle', // Heavy freezing drizzle
    1180: 'patchy-light-rain', // Patchy light rain
    1183: 'light-rain', // Light rain
    1186: 'moderate-rain', // Moderate rain at times
    1189: 'moderate-rain', // Moderate rain
    1192: 'heavy-rain', // Heavy rain at times
    1195: 'heavy-rain', // Heavy rain
    1198: 'light-freezing-rain', // Light freezing rain
    1201: 'moderate-heavy-freezing-rain', // Moderate or heavy freezing rain
    1204: 'light-sleet', // Light sleet
    1207: 'moderate-heavy-sleet', // Moderate or heavy sleet
    1210: 'patchy-light-snow', // Patchy light snow
    1213: 'light-snow', // Light snow
    1216: 'patchy-moderate-snow', // Patchy moderate snow
    1219: 'moderate-snow', // Moderate snow
    1222: 'patchy-heavy-snow', // Patchy heavy snow
    1225: 'heavy-snow', // Heavy snow
    1237: 'ice-pellets', // Ice pellets
    1240: 'light-rain-shower', // Light rain shower
    1243: 'moderate-heavy-rain-shower', // Moderate or heavy rain shower
    1246: 'torrential-rain-shower', // Torrential rain shower
    1249: 'light-sleet-showers', // Light sleet showers
    1252: 'moderate-heavy-sleet-showers', // Moderate or heavy sleet showers
    1255: 'light-snow-showers', // Light snow showers
    1258: 'moderate-heavy-snow-showers', // Moderate or heavy snow showers
    1261: 'light-showers-ice-pellets', // Light showers of ice pellets
    1264: 'moderate-heavy-showers-ice-pellets', // Moderate or heavy showers of ice pellets
    1273: 'patchy-light-rain-thunder', // Patchy light rain with thunder
    1276: 'moderate-heavy-rain-thunder', // Moderate or heavy rain with thunder
    1279: 'patchy-light-snow-thunder', // Patchy light snow with thunder
    1282: 'moderate-heavy-snow-thunder', // Moderate or heavy snow with thunder
  };
  
  return iconMap[conditionCode] || 'unknown';
}

/**
 * Map condition code to simplified category
 */
export function mapConditionCode(conditionCode: number): string {
  if (conditionCode === 1000) return 'clear';
  if (conditionCode >= 1003 && conditionCode <= 1009) return 'cloudy';
  if (conditionCode >= 1063 && conditionCode <= 1201) return 'rain';
  if (conditionCode >= 1210 && conditionCode <= 1225) return 'snow';
  if (conditionCode >= 1273 && conditionCode <= 1282) return 'thunder';
  if (conditionCode >= 1030 && conditionCode <= 1147) return 'fog';
  return 'unknown';
}

/**
 * Get emoji for weather condition
 */
export function getWeatherEmoji(conditionCode: string): string {
  const emojiMap: Record<string, string> = {
    'clear': '☀️',
    'sunny': '☀️',
    'cloudy': '☁️',
    'partly-cloudy': '⛅',
    'overcast': '☁️',
    'rain': '🌧️',
    'snow': '❄️',
    'thunder': '⛈️',
    'fog': '🌫️',
    'mist': '🌫️',
    'unknown': '🌡️',
  };
  
  return emojiMap[conditionCode] || '🌡️';
}
