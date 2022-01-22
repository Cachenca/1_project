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

//show temperature from °C to °F and vice versa

/*function celsiusTemp(event) {
  event.preventDefault();
  let fahrenheitlink = document.querySelector("#fahrenheitlink");
  let celsiuslink = document.querySelector("#celsiuslink");
  let number = document.querySelector("#number");
  fahrenheitlink.innerHTML = `<strong>°F</strong>`;
  celsiuslink.innerHTML = `°C`;
  number.innerHTML = `30`;
}

function fahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitLink = document.querySelector("#fahrenheitlink");
  let celsiusLink = document.querySelector("#celsiuslink");
  let number = document.querySelector("#number");
  celsiusLink.innerHTML = `<strong>°C</strong>`;
  fahrenheitLink.innerHTML = `°F`;
  number.innerHTML = `${number}`;
}

let fahrenheitLink = document.querySelector("#fahrenheitlink");
let celsiusLink = document.querySelector("#celsiuslink");
fahrenheitLink.addEventListener("click", celsiusTemp);
celsiusLink.addEventListener("click", fahrenheitTemp); */

//show current temperature figure

function showWeather(response) {
  console.log(response.data);
  let showTemperature = document.querySelector("#temp-figure");
  showTemperature.innerHTML = Math.round(response.data.main.temp);
  let showWind = document.querySelector("#wind-speed");
  showWind.innerHTML = Math.round(response.data.wind.speed);
  let showDescription = document.querySelector("#description");
  showDescription.innerHTML = Math.round(response.data.weather[0].main);
  let currentCity = document.querySelector("#reported-place");
  currentCity.innerHTML = response.data.name;
}

function finCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-place");
  let units = "metric";
  let apiKey = "ae7b151a80386287b28d384dcf5b14f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let newCity = document.querySelector("#search-form");
newCity.addEventListener("submit", finCity);

// Current location
function displayWeatherCondition(response) {
  document.querySelector("#reported-place").innerHTML = response.data.name;
  document.querySelector("#temp-figure").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searcCity(city) {
  var apiKey = "ae7b151a80386287b28d384dcf5b14f4";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  var city = document.querySelector("#search-place").value;
  searcCity(city);
}

function searchLocation(position) {
  var apiKey = "ae7b151a80386287b28d384dcf5b14f4";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="
    .concat(position.coords.latitude, "&lon=")
    .concat(position.coords.longitude, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  var temperatureElement = document.querySelector("temp-figure");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  var temperatureElement = document.querySelector("#temp-figure");
  temperatureElement.innerHTML = 19;
}

var searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
var currentLocationButton = document.querySelector("#gps");
currentLocationButton.addEventListener("click", getCurrentLocation);
searcCity("New York");
