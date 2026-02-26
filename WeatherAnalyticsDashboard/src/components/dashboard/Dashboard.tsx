import { CityCard } from './CityCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCity } from '../../store/slices/weatherSlice';
import { addFavorite, removeFavorite } from '../../store/slices/favoritesSlice';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.weather.cities);
  const favorites = useAppSelector((state) => state.favorites.cityIds);
  const temperatureUnit = useAppSelector((state) => state.settings.temperatureUnit);

  const cityIds = Object.keys(cities);
  const favoriteCities = cityIds.filter((id) => favorites.includes(id));
  const otherCities = cityIds.filter((id) => !favorites.includes(id));

  const handleCardClick = (cityId: string) => {
    dispatch(selectCity(cityId));
  };

  const handleFavoriteToggle = (cityId: string) => {
    if (favorites.includes(cityId)) {
      dispatch(removeFavorite(cityId));
    } else {
      dispatch(addFavorite(cityId));
    }
  };

  const handleRemove = (cityId: string) => {
    // Remove from favorites if it's there
    if (favorites.includes(cityId)) {
      dispatch(removeFavorite(cityId));
    }
    // Note: We're not removing from weather state to keep the data cached
  };

  if (cityIds.length === 0) {
    return (
      <div className="dashboard dashboard--empty">
        <p className="dashboard__empty-message">
          Search for a city to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {favoriteCities.length > 0 && (
        <section className="dashboard__section">
          <h2 className="dashboard__section-title">Favorites</h2>
          <div className="dashboard__grid">
            {favoriteCities.map((cityId) => {
              const cityData = cities[cityId];
              if (!cityData.current) return null;

              return (
                <CityCard
                  key={cityId}
                  cityId={cityId}
                  cityName={cityData.current.cityName}
                  temperature={cityData.current.temperature}
                  weatherCondition={cityData.current.condition.description}
                  weatherIcon={cityData.current.condition.icon}
                  humidity={cityData.current.humidity}
                  windSpeed={cityData.current.windSpeed}
                  isFavorite={true}
                  onCardClick={handleCardClick}
                  onFavoriteToggle={handleFavoriteToggle}
                  onRemove={handleRemove}
                  lastUpdated={cityData.current.timestamp}
                  loading={cityData.loading}
                  error={cityData.error}
                  temperatureUnit={temperatureUnit}
                />
              );
            })}
          </div>
        </section>
      )}

      {otherCities.length > 0 && (
        <section className="dashboard__section">
          <h2 className="dashboard__section-title">All Cities</h2>
          <div className="dashboard__grid">
            {otherCities.map((cityId) => {
              const cityData = cities[cityId];
              if (!cityData.current) return null;

              return (
                <CityCard
                  key={cityId}
                  cityId={cityId}
                  cityName={cityData.current.cityName}
                  temperature={cityData.current.temperature}
                  weatherCondition={cityData.current.condition.description}
                  weatherIcon={cityData.current.condition.icon}
                  humidity={cityData.current.humidity}
                  windSpeed={cityData.current.windSpeed}
                  isFavorite={false}
                  onCardClick={handleCardClick}
                  onFavoriteToggle={handleFavoriteToggle}
                  onRemove={handleRemove}
                  lastUpdated={cityData.current.timestamp}
                  loading={cityData.loading}
                  error={cityData.error}
                  temperatureUnit={temperatureUnit}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
