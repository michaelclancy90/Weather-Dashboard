//Global Variables
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


// Function get City name and creates a parameter for getCoordinates function

function cityName() {
    currentCity = chosenCity.value;
    getCoordinates(currentCity);
}

// Get searched for city lat and long for use in getWeather Function

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

//function uses lat and long to retrieve weather data for city 
function getWeatherInfo(lat, long){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=metric&exclude=minutely,hourly,daily,alerts&appid=97dbde334bd059edbd3fa8fbd7489001")
    .then((response) => response.json())
    .then(function (data){
        displayTodaysWeather(data)
        console.log(data)

        var history = JSON.parse(localStorage.getItem("historyEl")) || []
        history.push(currentCity)
        localStorage.setItem("historyEl", JSON.stringify(history))
        displayLocalStorage()
    })
}

// Displays the chosen city weathers data in the DOM

function displayTodaysWeather(data) {
    let date = moment().format("DD-MM-YYYY")
    todaysIconEl.src = "https://openweathermap.org/img/wn/" + data.current.weather.icon + ".png"
    todaysDateEl.textContent = "Date: " + date
    todaysWindEl.textContent = "Wind speed: " + data.current.wind_speed 
    todaysTempEl.textContent = "Temperature: " + data.current.temp + "°C"
    todaysHumidityEl.textContent = "Humidity: " + data.current.humidity
    todaysUVEl.textContent = "UV: " + data.current.uvi
    displayLocalStorage()
}

function displayLocalStorage(){
    var history = JSON.parse(localStorage.getItem("historyEl")) || []
    $("#history").empty()
    let  historyList= ""
    for (let i = 0; i < history.length; i ++){
        historyList += `<button>${history[i]}</button>`
    }
    $("#history").append(historyList)

}

