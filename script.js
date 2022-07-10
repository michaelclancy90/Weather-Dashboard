const APIKey = 'b736d3ccba7d12a6bc0de9a4c8ad9005'
const searchButton = document.getElementById("#search-btn")

let chosenCity = 'Sydney'

searchButton.addEventListener("click", function(getCityName){
    getCityName.preventDefault()
    var userInputEL = document.getElementById("#cityname").value
    console.log(userInputEL)
    userInput(userInputEL)
 } );

// Get users input 

function userInput(userInputEL){
    chosenCity = userInputEL;
    getCoordinates(chosenCity)
}

// Get searched for city lat and long 

function getCoordinates(chosenCity) { 
    fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" 
    + chosenCity 
    + "&appid=b736d3ccba7d12a6bc0de9a4c8ad9005")
    .then((response) => response.json())
    .then(function (data){
        lat = data.coord.lat;
        long = data.coord.lon;
    })

}




