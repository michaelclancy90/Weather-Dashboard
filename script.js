const APIKey = '97dbde334bd059edbd3fa8fbd7489001';
const searchButton = document.getElementById("#search-btn");
const chosenCity = document.querySelector('#cityname');
let currentCity = ""

function cityName() {
    currentCity = chosenCity.value;
    getCoordinates(currentCity);
    chosenCity.value = "";
    console.log(currentCity)
}

// Get users input 

// Get searched for city lat and long 

function getCoordinates(currentCity) { 
    fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" 
    + currentCity 
    + "&appid=97dbde334bd059edbd3fa8fbd7489001")
    .then((response) => response.json())
    .then(function (data){
        lat = data.coord.lat;
        long = data.coord.lon;
        console.log(lat, long)
    })

}




