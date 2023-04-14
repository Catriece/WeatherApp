// Save searches
// retrieve saved searches
//if slider clicked change this
// depending on sky, change background



/*async function findLocation () {
    let weather_url = "";
    let query_params = "";
    let api_key = "";
    let units = "";
}*/

//pull from DOM
//background
const backgroundImage = document.getElementById("background-image");
//form elements
const city = document.getElementById("city-input");
const state = document.getElementById("state-input");
const country = document.getElementById("country-input");
//showcased data elements
const cityTemp = document.getElementById("city-temp");
const cityName = document.getElementById("city-name");
const citySky = document.getElementById("city-sky");
const tempHigh = document.getElementById("weather-hi");
const tempLow = document.getElementById("weather-lo");
//url info
const weather_url ="https://api.openweathermap.org/data/2.5/weather?q="
const api_key = "&appid=1ebb37266d27bc74323d4653d3899d6f&units=imperial"
//const units_url = `&units=${units}`

//Submit Input
const form = document.getElementById("submission");
form.addEventListener("submit", (event) => {
   event.preventDefault();
  console.log("hello")
   const query_params =`${city.value},${state.value},${country.value}`;


   fetch(weather_url + query_params + api_key)
   .then((res) => {
       //console.log(res);
       return res.json();
   }).then((weather) => {
       displayWeather(weather);
   }).catch((err) => {
       console.error(err);
       alert("Please Enter a Proper Location");
   })});


//Functions

function displayWeather(weather){     
   console.log(weather);
   cityName.textContent = weather.name;
   cityTemp.textContent = Math.round(weather.main.temp);
   citySky.textContent = weather.weather[0].description;
   tempHigh.textContent = `H: ${Math.round(weather.main.temp_max)}`;
   tempLow.textContent = `L: ${Math.round(weather.main.temp_min)}`;

   changeBackground(citySky);
   form.reset();
}

/*function chooseUnit(checkbox) {
    if (checkbox != true) {

    }
}*/

function changeBackground(citySky) {
    if(citySky.textContent == "clear sky") {
        //backgroundImage.textContent = "";
        console.log("CLEAR");
    }
    if(citySky.textContent == "few clouds" || citySky.textContent == "scattered clouds" || citySky.textContent == "broken clouds") {
        console.log("CLOUDY");
    }
    if(citySky.textContent == "shower rain" || citySky.textContent == "rain") {
        console.log("RAIN");
    }
    if(citySky.textContent == "thunderstorm") {
        console.log("THUNDER");
    }
    if(citySky.textContent == "snow") {
        console.log("SNOW");
    }
    if(citySky.textContent == "mist") {
        console.log("MIST");
    } 
}

class SavedCities {
    list = []
    id = 0

    newListItem() {
        const table = document.getElementById("savedCitiesTable");
        const newTr = document.getElementById("new-tr");
        //newTr.classList.add[0]
        const cityTd = document.getElementById("city-td");
        const tempTd = document.getElementById("temp-td")
        const liCity = document.getElementById("saved-city");
        const liTemp = document.getElementById("saved-temp"); 
    }

    addCity() {

    }

    removeCity() {

    }

}


