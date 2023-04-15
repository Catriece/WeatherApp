//pull from DOM

const backgroundImage = document.querySelector("#background-image");
backgroundImage.style.backgroundImage = "images/white-cloud-blue-sky.jpg";

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
function submitInfo() {
    const form = document.getElementById("submission");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("hello")
        const query_params =`${city.value},${state.value},${country.value}`;

        fetch(weather_url + query_params + api_key)
        .then((res) => {
            ButtonStorage(res);
            return res.json();
        }).then((weather) => {
            displayWeather(weather);
        }).catch((err) => {
            console.error(err);
            alert("Please Enter a Proper Location");
        })});
        form.reset();
    }

const submitBtn = document.getElementById("submit-button");
submitBtn.addEventListener("submit", submitInfo());



function optionSave(weather) {
    const table = document.getElementById("savedCitiesTable");
    const newTr = document.createElement("tr");
    //newTr.classList.add
    const tdCity = document.createElement("td");
    const tdIcon = document.createElement("td");
    const tdTemp = document.createElement("td");
    const showCityBtn = docment.createElement("button");
    const removeCityBtn = document.createElement("Button");

    tdCity.textContent = weather.name;
    //tdIcon
    tdTemp.textContent = Math.round(weather.main.temp);
    showCityBtn.classList.add
}



function ButtonStorage(res) {
    const citySaveBtn = document.createElement("button");
    const newButtonHome = document.getElementById("saveCityBtn");
    let buttonID = 0
    citySaveBtn.id = `citySave${weather.name}`;
    citySaveBtn.textContent = "+";
    citySaveBtn.setAttribute("url", res.url);

    newButtonHome.appendChild(citySaveBtn);
    console.log(citySaveBtn); 
    }




//Functions


function displayWeather(weather){     
   console.log(weather);
   cityName.textContent = weather.name;
   cityTemp.textContent = Math.round(weather.main.temp);
   citySky.textContent = weather.weather[0].description;
   tempHigh.textContent = `H: ${Math.round(weather.main.temp_max)}`;
   tempLow.textContent = `L: ${Math.round(weather.main.temp_min)}`;

   changeBackground(citySky);
   
}

//Toggle Units

function changeBackground(citySky) {
    //const backgroundImage = document.getElementById("background-image");
    if(citySky.textContent == "clear sky") {
        //backgroundImage.style.backgroundImage = "images/white-cloud-blue-sky.jpg";
        console.log(citySky);
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


