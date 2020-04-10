# Weatherlify

![Weatherlify Preview](https://i.ibb.co/Ng5w2Qq8/image.png)

## About

Weatherlify is a beautiful weather application that combines real-time weather data with matching ambient background videos to create an immersive weather checking experience.

Traditional weather apps often prioritize functionality over user experience, presenting data in a purely utilitarian way. Weatherlify addresses this by creating an engaging platform that delivers accurate weather information while providing a visually immersive experience. By integrating the OpenWeatherMap API with carefully curated background videos, i've developed a responsive solution that transforms routine weather checking into an atmospheric journey.

## Features

- Real-time weather data display
- Dynamic background videos matching weather conditions
- Geolocation support
- Search by city name
- Responsive design
- Detailed weather metrics (temperature, humidity, wind speed, pressure)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weatherlify.git
   cd weatherlify
   ```

2. Open `script.js` and replace the API key placeholder:
   ```javascript
   const WEATHER_API_KEY = 'YOUR_API_KEY';
   ```

3. Get your API key:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/)
   - Go to your account page
   - Generate an API key
   - Copy and paste it into `script.js`

4. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   # Or using Node.js
   npx http-server
   ```

## Usage

1. Allow location access when prompted for automatic local weather
2. Or use the search bar to look up any city
3. Enjoy the weather information with matching ambient background!

## Technologies

- HTML5/CSS3
- JavaScript
- OpenWeatherMap API
- YouTube IFrame Player API
- Font Awesome Icons