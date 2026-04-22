const API_KEY = 'ff67747575497cc7f4c17f66c6132f5c';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherResult');

searchBtn.addEventListener('click', () => {
    if (cityInput.value) getWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && cityInput.value) getWeather(cityInput.value);
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 401) {
            showError("API Key en proceso de activación. Espera unos minutos.");
            return;
        }

        if (data.cod === "404") {
            showError("Ciudad no encontrada");
            return;
        }

        displayWeather(data);
    } catch (error) {
        showError("Error de conexión");
    }
}

function displayWeather(data) {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = "";

    // Reiniciar animación
    weatherDisplay.classList.remove('fade-in');
    void weatherDisplay.offsetWidth; // Truco para reiniciar animación CSS
    weatherDisplay.classList.add('fade-in');

    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed;
    
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}

function showError(msg) {
    document.getElementById('errorMsg').textContent = msg;
}