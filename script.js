const APIKey = '97dbde334bd059edbd3fa8fbd7489001';
const searchButton = document.getElementById("#search-btn");
const chosenCity = document.querySelector('#cityname');
const cityEl = document.querySelector('#city');
const todaysIconEl = document.querySelector('#current-icon')
const todaysDateEl = document.querySelector('#date-today');
const todaysWindEl = document.querySelector('#wind')
const todaysTempEl = document.querySelector('#temp')
const todaysHumidityEl = document.querySelector('#humidity');
const todaysUVEl = document.querySelector('#uvindex')
let currentCity = ""



function cityName() {
    currentCity = chosenCity.value;
    getCoordinates(currentCity);
    console.log(currentCity)
}

// Get searched for city lat and long 

function getCoordinates(currentCity) { 
    fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" 
    + currentCity 
    + "&units=metric&appid=97dbde334bd059edbd3fa8fbd7489001")
    .then((response) => response.json())
    .then(function (data){
        lat = data.coord.lat;
        long = data.coord.lon;
        console.log(lat, long)
        getWeatherInfo(lat, long)
        cityEl.textContent = "City: " + data.name

    })
}

function getWeatherInfo(lat, long){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=metric&exclude=minutely,hourly,daily,alerts&appid=97dbde334bd059edbd3fa8fbd7489001")
    .then((response) => response.json())
    .then(function (data){
        displayTodaysWeather(data)
        console.log(data)
    })
}

function displayTodaysWeather(data) {
    let date = moment().format("DD-MM-YYYY")
    todaysIconEl.src = "https://openweathermap.org/img/wn/" + data.current.weather.icon + ".png"
    todaysDateEl.textContent = "Date: " + date
    todaysWindEl.textContent = "Wind speed: " + data.current.wind_speed 
    todaysTempEl.textContent = "Temperature: " + data.current.temp + "°C"
    todaysHumidityEl.textContent = "Humidity: " + data.current.humidity
    todaysUVEl.textContent = "UV: " + data.current.uvi

}
