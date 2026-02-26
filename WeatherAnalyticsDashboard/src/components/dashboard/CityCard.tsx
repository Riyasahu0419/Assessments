import React from 'react';
import { Card } from '../common/Card/Card';
import { Spinner } from '../common/Spinner/Spinner';
import { formatTemperature, convertTemperature } from '../../utils/temperatureConverter';
import { formatRelativeTime } from '../../utils/dateFormatter';
import { getWeatherEmoji } from '../../utils/weatherIconMapper';
import { TemperatureUnit } from '../../types/weather.types';
import './CityCard.css';

interface CityCardProps {
  cityId: string;
  cityName: string;
  temperature: number;
  weatherCondition: string;
  weatherIcon: string;
  humidity: number;
  windSpeed: number;
  isFavorite: boolean;
  onCardClick: (cityId: string) => void;
  onFavoriteToggle: (cityId: string) => void;
  onRemove: (cityId: string) => void;
  lastUpdated: Date;
  loading?: boolean;
  error?: string | null;
  temperatureUnit: TemperatureUnit;
}

export const CityCard: React.FC<CityCardProps> = ({
  cityId,
  cityName,
  temperature,
  weatherCondition,
  weatherIcon,
  humidity,
  windSpeed,
  isFavorite,
  onCardClick,
  onFavoriteToggle,
  onRemove,
  lastUpdated,
  loading = false,
  error = null,
  temperatureUnit,
}) => {
  const displayTemp = convertTemperature(temperature, 'celsius', temperatureUnit);
  const displayWindSpeed = temperatureUnit === 'fahrenheit' ? windSpeed * 0.621371 : windSpeed;
  const windUnit = temperatureUnit === 'fahrenheit' ? 'mph' : 'km/h';

  if (loading) {
    return (
      <Card className="city-card city-card--loading">
        <Spinner size="large" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="city-card city-card--error">
        <p className="city-card__error">{error}</p>
        <button className="city-card__retry" onClick={() => onCardClick(cityId)}>
          Retry
        </button>
      </Card>
    );
  }

  return (
    <Card className="city-card" clickable onClick={() => onCardClick(cityId)}>
      <div className="city-card__header">
        <h3 className="city-card__name">{cityName}</h3>
        <div className="city-card__actions">
          <button
            className={`city-card__favorite ${isFavorite ? 'city-card__favorite--active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle(cityId);
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <button
            className="city-card__remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(cityId);
            }}
            aria-label="Remove city"
          >
            ×
          </button>
        </div>
      </div>

      <div className="city-card__weather">
        <span className="city-card__icon">{getWeatherEmoji(weatherIcon)}</span>
        <div className="city-card__temp">
          {formatTemperature(displayTemp, temperatureUnit, 0)}
        </div>
      </div>

      <p className="city-card__condition">{weatherCondition}</p>

      <div className="city-card__details">
        <div className="city-card__detail">
          <span className="city-card__detail-label">Humidity</span>
          <span className="city-card__detail-value">{humidity}%</span>
        </div>
        <div className="city-card__detail">
          <span className="city-card__detail-label">Wind</span>
          <span className="city-card__detail-value">
            {displayWindSpeed.toFixed(1)} {windUnit}
          </span>
        </div>
      </div>

      <p className="city-card__updated">Updated {formatRelativeTime(lastUpdated)}</p>
    </Card>
  );
};
