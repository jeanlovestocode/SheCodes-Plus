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

function formatDay(timestamp) {
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}


function displayForecast(response) {
  
  let forecastDay = response.data.daily;
  let forecastElement = document.querySelector("#day-forecast");

  let forecastHTML = ` <div class="card-group">`;
  forecastDay.forEach(function(forecastDay, index) {
    if (index < 5 ) {
     forecastHTML =
       forecastHTML +
       ` 
        <div class="card">
          <div class="card-body">
            <h5 class="card-day">${formatDay(forecastDay.dt)}</h5>
            <div class="card-icon">
            
              <img
                src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                id="icon"
                alt=""
              />
            </div>
            <div class = "min-max">
            <span class="card-tem" id="max">${Math.round(forecastDay.temp.max)}°</span>
            <span class="card-tem" id="min">${Math.round(forecastDay.temp.min)}°</span>
            </div>

          </div>
        </div>`;
    }
  });

 

  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
   
  


};

function formatTime (timestamp){
  let hourTime = new Date(timestamp * 1000);
  let hour = hourTime.getHours();
  let hours = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am","10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];
  return hours[hour];
}

function displayHourly (response) {
  let hourlyTemp =  response.data.hourly;
  let hourlyElement = document.querySelector("#hourly-forecast");

 let hourlyHTML = `<div class="row">`;
 hourlyTemp.forEach(function(hourlyTemp, index) {
  if (index < 6){

  hourlyHTML =
    hourlyHTML +
    ` 
      <div class = "col-2">
        <div class = "hourly-time"> ${formatTime(hourlyTemp.dt)}</div>
            <div class="emojicon">
            
              <img
                src="http://openweathermap.org/img/wn/${
                  hourlyTemp.weather[0].icon
                }@2x.png"
                id="emojicon"
                alt=""
              />
            </div>
          <div class="hourly-temp">${Math.round(hourlyTemp.temp)}°</div>
    </div>`;
 }
 });

  hourlyHTML = hourlyHTML + `</div>`;
  hourlyElement.innerHTML = hourlyHTML;
  console.log(hourlyHTML);
};


function getHourly (coordinates) {
    let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayHourly);

}


function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
  
};


function showCity(response) {
  console.log(response.data);
  celcuisTemp = response.data.main.temp;

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".first-degree").innerHTML = Math.round(celcuisTemp);
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

 
 
let wind = Math.round(response.data.wind.speed)
document.querySelector(".wind-speed").innerHTML = `wind: ${wind} km/h`;
  
 



  celcuisTemp = Math.round(response.data.main.temp);

  getForecast(response.data.coord);

  getHourly(response.data.coord);
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

// function myLocation(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(searchLocation);
// }

// let currentLocationPin = document.querySelector("#current-location-button");
// currentLocationPin.addEventListener("click", myLocation);
 //i commented out this part in case i ever want to show the current location button//
 
searchCityName("Toronto");

function showFarenheitTemp(event) {
  event.preventDefault();

  let farenheitTemp = (celcuisTemp * 9) / 5 + 32;

  let temperature = document.querySelector(".first-degree");

  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  temperature.innerHTML = Math.round(farenheitTemp);
}

function showcelciusTemp(event) {
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
