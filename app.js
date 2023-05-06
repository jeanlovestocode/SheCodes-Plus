function formatDate(timestamp) {
  let currentTime = new Date(timestamp);

  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let date = currentTime.getDate();
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

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${date}, ${hours}:${minutes}`;
}

function showCity(response) {


  celcuisTemp = response.data.main.temp;

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".first-degree").innerHTML = Math.round(celcuisTemp);
  ;

  document.querySelector(".current-weather").innerHTML =
    response.data.weather[0].description;

  document.querySelector(".high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".low").innerHTML = Math.round(
    response.data.main.temp_min
  );

  document.querySelector("#header-date").innerHTML = formatDate(
    response.data.dt * 1000
  );

   let cardIcon = document.querySelector("#icon");
   cardIcon.setAttribute(
     "src",
     `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
   );

   let cardIcon2 = document.querySelector("#icon-two");
   cardIcon2.setAttribute(
     "src",
     `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
   );

   let cardIcon3 = document.querySelector("#icon-three");
    cardIcon3.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

   let cardIcon4 = document.querySelector("#icon-four");
     cardIcon4.setAttribute(
       "src",
       `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
     );

   let cardIcon5 = document.querySelector("#icon-five");
     cardIcon5.setAttribute(
       "src",
       `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
     );

      celcuisTemp = Math.round(
    response.data.main.temp);
}




https: function searchCityName(city) {
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let cityWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(cityWeatherApi).then(showCity);
}

function forSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  searchCityName(city);
}



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


function showFarenheitTemp(event){
  event.preventDefault();

  let farenheitTemp = (celcuisTemp * 9) / 5 + 32; 

  let temperature = document.querySelector(".first-degree");

  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  temperature.innerHTML = Math.round(farenheitTemp); 

}

function showcelciusTemp (event){
  event.preventDefault();
  let temperature = document.querySelector(".first-degree");
  temperature.innerHTML = Math.round(celcuisTemp);
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

let formCity = document.querySelector("#city-form");
formCity.addEventListener("submit", forSubmit);

let celcuisTemp = null;

let farenheitLink = document.querySelector(".unit-farenheit");
farenheitLink.addEventListener("click", showFarenheitTemp);

let celciusLink = document.querySelector(".unit-celcius");
celciusLink.addEventListener("click", showcelciusTemp);