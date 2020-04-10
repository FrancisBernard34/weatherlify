const WEATHER_API_KEY = 'YOUR_API_KEY';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

let player;
const weatherVideos = {
    Clear: 'ipf7ifVSeDU',      // Sunny day timelapse
    Clouds: 'RxXFPTHyJsI',      // Cloudy sky
    Rain: 'Qo4JIT8jMtI',        // Rain sounds
    Snow: 'sGkh1W5cbH4',        // Snowfall
    Thunderstorm: 'gVKEM4K8J8A', // Thunderstorm
    Drizzle: 'dR_3g5WCdHs',     // Light rain
    Mist: 'BhQVGKuBl10',        // Foggy weather
    default: 'ipf7ifVSeDU'      // Default to sunny day
};

// Load YouTube IFrame API
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Add error handling for YouTube API loading
    tag.onerror = function() {
        console.error('Failed to load YouTube IFrame API');
        // Create a fallback background color
        document.querySelector('.overlay').style.background = 'rgba(0, 0, 0, 0.7)';
    };
}

// Initialize YouTube player
function onYouTubeIframeAPIReady() {
    try {
        player = new YT.Player('youtube-background', {
            height: '100%',
            width: '100%',
            videoId: weatherVideos.default,
            playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                enablejsapi: 1,
                loop: 1,
                modestbranding: 1,
                playsinline: 1,
                rel: 0,
                showinfo: 0,
                mute: 1,
                playlist: weatherVideos.default // Add playlist parameter for proper looping
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
                onError: onPlayerError
            }
        });
    } catch (error) {
        console.error('Error initializing YouTube player:', error);
        document.querySelector('.overlay').style.background = 'rgba(0, 0, 0, 0.7)';
    }
}

function onPlayerReady(event) {
    try {
        event.target.playVideo();
    } catch (error) {
        console.error('Error playing video:', error);
    }
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        try {
            player.playVideo();
        } catch (error) {
            console.error('Error replaying video:', error);
        }
    }
}

function onPlayerError(event) {
    console.error('YouTube player error:', event.data);
    document.querySelector('.overlay').style.background = 'rgba(0, 0, 0, 0.7)';
}

// Weather API Functions
async function getWeatherData(city) {
    try {
        const response = await fetch(`${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        updateWeatherInfo(data);
        updateBackgroundVideo(data.weather[0].main);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function updateWeatherInfo(data) {
    document.getElementById('city').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('date').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('weather-icon').src = 
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById('wind').textContent = `${data.wind.speed} km/h`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
}

function updateBackgroundVideo(weatherCondition) {
    const videoId = weatherVideos[weatherCondition] || weatherVideos.default;
    if (player && player.loadVideoById) {
        try {
            player.loadVideoById({
                videoId: videoId,
                startSeconds: 0,
                suggestedQuality: 'large',
                endSeconds: 0
            });
        } catch (error) {
            console.error('Error loading video:', error);
        }
    } else {
        console.warn('YouTube player not ready yet');
    }
}

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('search-input').value.trim();
    if (city) getWeatherData(city);
});

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = e.target.value.trim();
        if (city) getWeatherData(city);
    }
});

async function getUserLocation() {
    if (navigator.geolocation) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 10000,
                    maximumAge: 0
                });
            });
            
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Get city name from coordinates
            const response = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
            if (!response.ok) throw new Error('Location data not available');
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error('Error getting location:', error);
            return 'London'; // Fallback to London if geolocation fails
        }
    } else {
        console.log('Geolocation is not supported by this browser.');
        return 'London'; // Fallback to London if geolocation is not supported
    }
}

// Initialize app
loadYouTubeAPI();

// Load weather data
document.addEventListener('DOMContentLoaded', async () => {
    // Show loading state
    document.getElementById('city').textContent = 'Loading...';
    
    try {
        // Get user's location
        const userCity = await getUserLocation();
        getWeatherData(userCity);
    } catch (error) {
        console.error('Error initializing app:', error);
        getWeatherData('London'); // Fallback to London
    }
});