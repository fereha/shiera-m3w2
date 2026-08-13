const apiKey = "b85713d4fb6173f3e67a6f065a1f2b44";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherElement = document.querySelector(".weather");
const errorElement = document.querySelector(".error");
const forecastContainer = document.querySelector("#forecast-container");
async function checkWeather(city) {
    if (!city) {
        return;
    }
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            if (errorElement && weatherElement) {
                errorElement.style.display = "block";
                weatherElement.style.display = "none";
            }
            return;
        }
        const data = await response.json();
        if (cityElement &&
            tempElement &&
            humidityElement &&
            windElement &&
            weatherIcon &&
            weatherElement &&
            errorElement) {
            cityElement.textContent = data.name;
            tempElement.textContent = `${Math.round(data.main.temp)}°C`;
            humidityElement.textContent = `${data.main.humidity}%`;
            windElement.textContent = `${data.wind.speed} km/h`;
            const condition = data.weather[0]?.main;
            if (condition === "Clouds") {
                weatherIcon.src = "images/cloud.png";
            }
            else if (condition === "Rain") {
                weatherIcon.src = "images/rain.png";
            }
            else if (condition === "Clear") {
                weatherIcon.src = "images/clear.png";
            }
            else if (condition === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            }
            else if (condition === "Mist") {
                weatherIcon.src = "images/mist.png";
            }
            else {
                weatherIcon.src = "images/cloud.png";
            }
            weatherElement.style.display = "block";
            errorElement.style.display = "none";
            await getForecast(city);
        }
    }
    catch (error) {
        console.error(error);
        if (errorElement && weatherElement) {
            errorElement.style.display = "block";
            weatherElement.style.display = "none";
        }
    }
}
async function getForecast(city) {
    try {
        const response = await fetch(forecastUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            return;
        }
        const data = await response.json();
        if (!forecastContainer) {
            return;
        }
        forecastContainer.innerHTML = "";
        data.list.forEach((item) => {
            if (!item.dt_txt.includes("12:00:00")) {
                return;
            }
            const date = new Date(item.dt_txt);
            const day = date.toLocaleDateString("en-US", {
                weekday: "short"
            });
            const forecastCard = document.createElement("div");
            forecastCard.className = "forecast-card";
            const dayElement = document.createElement("h3");
            dayElement.textContent = day;
            const iconElement = document.createElement("img");
            const icon = item.weather[0]?.icon ?? "01d";
            iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            iconElement.alt = item.weather[0]?.description ?? "Weather icon";
            const temperatureElement = document.createElement("h4");
            temperatureElement.textContent = `${Math.round(item.main.temp)}°C`;
            const conditionElement = document.createElement("p");
            conditionElement.textContent =
                item.weather[0]?.main ?? "Unknown";
            forecastCard.appendChild(dayElement);
            forecastCard.appendChild(iconElement);
            forecastCard.appendChild(temperatureElement);
            forecastCard.appendChild(conditionElement);
            forecastContainer.appendChild(forecastCard);
        });
    }
    catch (error) {
        console.error(error);
    }
}
searchBtn?.addEventListener("click", () => {
    if (searchBox) {
        checkWeather(searchBox.value.trim());
    }
});
searchBox?.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});
export {};
