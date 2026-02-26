# 🌦️ Weather Analytics Dashboard

A modern, responsive web application for monitoring weather conditions across multiple cities with real-time updates, interactive visualizations, and persistent user preferences.

## ✨ Features

- **Multi-City Dashboard**: View weather summaries for multiple cities simultaneously
- **Detailed Weather View**: Access comprehensive weather information including:
  - 5-7 day forecast
  - Hourly forecast (24+ hours)
  - Temperature, precipitation, and wind charts
  - Additional metrics (pressure, dew point, UV index)
- **Smart Search**: City search with autocomplete suggestions
- **Favorites Management**: Mark cities as favorites with persistent storage
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Real-Time Updates**: Automatic data refresh every 60 seconds
- **Intelligent Caching**: Reduces API calls while keeping data fresh
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Error Handling**: Graceful error messages with retry functionality

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- WeatherAPI.com API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your WeatherAPI.com API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   VITE_WEATHER_API_BASE_URL=https://api.weatherapi.com/v1
   ```

   **Get your free API key:**
   - Visit [https://www.weatherapi.com/signup.aspx](https://www.weatherapi.com/signup.aspx)
   - Sign up for a free account
   - Copy your API key from the dashboard

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Reusable UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Spinner/
│   │   └── Notification/
│   ├── dashboard/      # Dashboard components
│   │   ├── Dashboard.tsx
│   │   └── CityCard.tsx
│   └── search/         # Search components
│       └── SearchBar.tsx
├── store/              # Redux store and slices
│   ├── slices/
│   │   ├── weatherSlice.ts
│   │   ├── favoritesSlice.ts
│   │   ├── settingsSlice.ts
│   │   └── uiSlice.ts
│   ├── index.ts
│   └── hooks.ts
├── services/           # API and service layer
│   ├── weatherApi.ts
│   ├── cacheManager.ts
│   ├── rateLimiter.ts
│   └── storageService.ts
├── utils/              # Utility functions
│   ├── temperatureConverter.ts
│   ├── dateFormatter.ts
│   ├── weatherIconMapper.ts
│   └── validators.ts
├── types/              # TypeScript type definitions
│   └── weather.types.ts
├── constants/          # Configuration constants
│   ├── apiConfig.ts
│   └── appConfig.ts
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+ with TypeScript
- **State Management**: Redux Toolkit
- **Data Visualization**: Recharts
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **API**: WeatherAPI.com

## 🎯 Usage

### Adding a City

1. Type at least 3 characters in the search bar
2. Select a city from the autocomplete suggestions
3. The city card will appear on the dashboard

### Managing Favorites

- Click the star icon (☆) on any city card to add it to favorites
- Favorite cities appear in a dedicated "Favorites" section
- Click the filled star (★) to remove from favorites
- Favorites persist between sessions

### Viewing Detailed Weather

- Click on any city card to open the detailed view
- View 5-7 day forecast, hourly data, and interactive charts
- Close the modal by clicking the X button or pressing ESC

### Changing Temperature Units

- Click the temperature unit button (°C/°F) in the header
- All temperatures across the app will update instantly
- Your preference is saved for future sessions

### Removing a City

- Click the × button on any city card
- The city will be removed from the dashboard

## ⚙️ Configuration

### Cache Settings

Edit `src/constants/appConfig.ts` to adjust cache behavior:

```typescript
CACHE: {
  WEATHER_TTL: 60000,      // Weather data cache: 60 seconds
  FORECAST_TTL: 300000,    // Forecast data cache: 5 minutes
  SEARCH_TTL: 300000,      // Search results cache: 5 minutes
  MAX_ENTRIES: 10,         // Maximum cached cities
}
```

### Refresh Interval

```typescript
REFRESH: {
  INTERVAL: 60000,         // Auto-refresh: 60 seconds
  RETRY_DELAY: 30000,      // Retry failed requests: 30 seconds
}
```

### Rate Limiting

The app automatically handles API rate limits (60 requests/minute) with intelligent queuing.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🐛 Troubleshooting

### API Key Issues

- **Error: "Weather service authentication failed"**
  - Verify your API key is correct in `.env`
  - Ensure the key is active on WeatherAPI.com
  - Check that you haven't exceeded the free tier limits

### No Cities Showing

- Check browser console for errors
- Verify internet connection
- Clear browser cache and local storage
- Try searching for a different city

### Slow Performance

- The app caches data to minimize API calls
- If experiencing issues, try:
  - Clearing browser cache
  - Reducing the number of cities on the dashboard
  - Checking your internet connection speed

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.

---

Built with ❤️ using React, Redux Toolkit, and WeatherAPI.com
