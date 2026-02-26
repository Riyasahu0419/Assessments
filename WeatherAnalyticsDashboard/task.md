# 🌦️ Weather Analytics Dashboard – Frontend Assignment

## 📌 Overview

You are tasked with creating a **Weather Analytics Dashboard**, a web-based application that:

- Displays current weather data
- Shows forecasts
- Allows users to explore historical trends
- Offers interactive visualizations

This project will help users understand both short-term and long-term weather patterns for one or more locations.

---

# ✅ Requirements Breakdown

## 1. Core Features

### 🌦️ Dashboard

The main screen should display summary cards for multiple cities.

Each card must include:

- Current temperature
- Weather condition icon (sunny, cloudy, etc.)
- Additional quick info (humidity, wind speed, etc.)
- Support for real-time updates

---

### 🔍 Detailed View

When a user clicks on a city card, show a dedicated page or modal with deeper analytics.

Include:

- 5–7 day forecast
- Hour-by-hour forecast
- Detailed stats such as:
  - Pressure
  - Dew point
  - UV index

---

### 💬 Search & Favorites

- Search bar with API-based autocomplete
- Ability to "favorite" a city
- Favorites pinned on dashboard
- Favorites persist between sessions

---

### 📈 Data Visualization

Use charts (Recharts or similar) to visualize:

- Temperature trends (hourly & daily)
- Precipitation patterns
- Wind speed and direction

Charts must include:

- Hover effects
- Tooltips
- Zooming or date range selectors
- Responsive design

---

### ⚙️ Settings

Allow users to switch between:

- Celsius ↔ Fahrenheit

---

### 🔁 Real-Time Data

Use an external weather API such as:

- OpenWeatherMap
- WeatherAPI

Fetch:

- Live weather data
- Forecast data

---

## 2. Technical Stack

### ⚛️ Frontend

- React (with Hooks)

---

### 📦 State Management

Use Redux / Redux Toolkit to manage:

- Current weather data
- Favorite cities
- Temperature unit preferences

---

### 🔌 API Integration

Handle:

- API keys
- Async fetching
- Rate limiting
- Error handling

---

### 📊 Charts

Use Recharts or similar library.

Charts should be:

- Clean and readable
- Responsive
- Interactive

---

# ⭐ Bonus Points

- Authentication (Google Sign-In)
- Real-time data (data not older than 60 seconds)
- Caching to reduce API calls

---

# 🌐 Reference API

https://www.weatherapi.com/

---

