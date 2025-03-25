async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    
    const apiKey = "3974ce0955097648cea5a7372e6810f9"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === "404") {
            document.getElementById("weather-info").innerHTML = "City not found";
            return;
        }
        
        document.getElementById("weather-info").innerHTML = `
        <h3 class="weather-info">${data.name}, ${data.sys.country}</h3>
        <p class="temperature">Temperature: ${data.main.temp}°C</p>
        <p class="weather">Weather: ${data.weather[0].description}</p>
        <p class="humidity">Humidity: ${data.main.humidity}%</p>
        <p class="wind-speed">Wind Speed: ${data.wind.speed} m/s</p>
    `;
    
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            const apiKey = "3974ce0955097648cea5a7372e6810f9"; // Replace with your OpenWeatherMap API key
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                document.getElementById("weather-info").innerHTML = `
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
            } catch (error) {
                console.error("Error fetching location weather data:", error);
            }
        });
    } else {
        alert("Geolocation is not supported by your browser");
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}



