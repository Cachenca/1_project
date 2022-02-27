//display the current date and time using JS
let today = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[today.getDay()];

let hours = today.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h3 = document.querySelector("h3");
h3.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-3 first-icon">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="70" class="fas fa-cloud-rain cloud"/><br />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°C /</span>/
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}°C</span>
                </div>  
            </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ae7b151a80386287b28d384dcf5b14f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  //console.log(response.data);
  let showTemperature = document.querySelector("#temp-figure");
  let showWind = document.querySelector("#wind-speed");
  let showDescription = document.querySelector("#description");
  let currentCity = document.querySelector("#reported-place");
  let iconElement = document.querySelector("#main-icon");

  celsiusTemperature = response.data.main.temp;

  showTemperature.innerHTML = Math.round(celsiusTemperature);
  showWind.innerHTML = Math.round(response.data.wind.speed);
  showDescription.innerHTML = response.data.weather[0].main;
  currentCity.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchPlace(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-place");
  let units = "metric";
  let apiKey = "ae7b151a80386287b28d384dcf5b14f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-place");
  searchPlace(city.value);
}
function searchLocation(position) {
  var apiKey = "ae7b151a80386287b28d384dcf5b14f4";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="
    .concat(position.coords.latitude, "&lon=")
    .concat(position.coords.longitude, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(showWeather);
}
let currentLocationButton = document.querySelector("#gps");
currentLocationButton.addEventListener("click", getCurrentLocation);

//show temperature from °C to °F and vice versa
function fahrenheitTemp(event) {
  event.preventDefault();
  let showTemperature = document.querySelector("#temp-figure");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  showTemperature.innerHTML = Math.round(fahrenheiTemperature);
}

function celsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let showTemperature = document.querySelector("#temp-figure");
  showTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheitlink");
fahrenheitLink.addEventListener("click", fahrenheitTemp);

let celsiusLink = document.querySelector("#celsiuslink");
celsiusLink.addEventListener("click", celsiusTemp);

//add a search engine, when searching for a city, display the city name on the page after the user submits the form
function findCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-place");
  let h1 = document.querySelector("h1");
  let city = `${inputCity.value}`;
  h1.innerHTML = `${city}`;
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", findCity);

function searchPlace(city) {
  var apiKey = "ae7b151a80386287b28d384dcf5b14f4";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

searchPlace("Budapest");
