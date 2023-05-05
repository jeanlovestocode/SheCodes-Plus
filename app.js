let currentTime = new Date();

let date = currentTime.getDate();
let month = currentTime.getMonth();
let day = currentTime.getDay();
let hour = currentTime.getHours();

if (hour < 10) {
  hour = `0${hour}`;
}
let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[currentTime.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
month = months[currentTime.getMonth()];

function todaysDate() {
  let today = document.querySelector("#header-date");
  today.innerHTML = `${day}, ${month} ${date}, ${hour}:${minute}`;
}

todaysDate();

function showCity(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".first-degree").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(".current-weather").innerHTML =
    response.data.weather[0].description;

  document.querySelector(".high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".low").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function searchCityName(city) {
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let cityWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(cityWeatherApi).then(showCity);
}

function forSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  searchCityName(city);
}

let formCity = document.querySelector("#city-form");
formCity.addEventListener("submit", forSubmit);

function searchLocation(position) {
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(geoUrl).then(showCity);
  console.log(geoUrl);
}

function myLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationPin = document.querySelector("#current-location-button");
currentLocationPin.addEventListener("click", myLocation);

searchCityName("Dubai");
