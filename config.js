function getApiKey() {
    if (window.WEATHER_API_KEY) {
        return window.WEATHER_API_KEY;
    }
    console.warn('No API key found in environment variables.');
}

const config = {
    WEATHER_API_KEY: getApiKey(),
    WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5/weather'
};

export default config;