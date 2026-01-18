const weatherApiKey = "SD2K7WJCSTF54KVJ2Y8X34Z59";
const weatherDescription = document.querySelector(".weather-description");
const weatherResult = document.querySelector("#weather-result");
const temperatureEl = weatherDescription.querySelector(".temperature-value");
const humidityEl = weatherDescription.querySelector(".humidity-value");
const feelslikeEl = weatherDescription.querySelector(".feelslike-value");
const getWeatherBtn = document.querySelector("#get-weather-btn");
const weatherAudio = document.querySelector("#weather-audio");

async function getWeatherData(location, unitGroup) {
  getWeatherBtn.setAttribute("aria-busy", "true");
  getWeatherBtn.innerText = "Loading...";

  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${weatherApiKey}&unitGroup=${unitGroup}`,
  );

  const data = await response.json();

  const temperature = data.currentConditions.temp;
  const humidity = data.currentConditions.humidity;
  const feelsLike = data.currentConditions.feelslike;

  console.log(data);

  temperatureEl.innerHTML = `Temperature is ${temperature}`;
  humidityEl.innerHTML = `Humidity is ${humidity}`;
  feelslikeEl.innerHTML = `Feelslike is ${feelsLike}`;
  getWeatherBtn.setAttribute("aria-busy", "false");
  getWeatherBtn.innerText = "Get weather";
  weatherResult.style.display = "block";
}

getWeatherBtn.addEventListener("click", (e) => {
  e.preventDefault();
  weatherAudio.play().catch((error) => {
    console.log("El navegador bloqueó el autoplay inicialmente:", error);
  });
  const cityName = document.querySelector("#city-input").value;
  let groupUnit = document.querySelector("#group-unit-input").value;
  if (cityName && groupUnit) {
    groupUnit === "imperial" ? (groupUnit = "us") : (groupUnit = "metric");

    getWeatherData(cityName, groupUnit);
  }
});
