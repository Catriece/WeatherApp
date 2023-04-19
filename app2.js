//FORM ELEMENTS
const city = document.getElementById("city-input");
const state = document.getElementById("state-input");
const country = document.getElementById("country-input");

//ONSCREEN DATA ELEMENTS
const cityTemp = document.getElementById("city-temp");
const cityName = document.getElementById("city-name");
const citySky = document.getElementById("city-sky");
const tempHigh = document.getElementById("weather-hi");
const tempLow = document.getElementById("weather-lo");

//FETCH API
const weather_url ="https://api.openweathermap.org/data/2.5/weather?q="
const api_key = "&appid=1ebb37266d27bc74323d4653d3899d6f&units=imperial"
//const units_url = `&units=${units}`
const form = document.getElementById("submission");
let mostRecentUrl = "";
function submitInfo() {
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const query_params =`${city.value},${state.value},${country.value}`;

        fetch(weather_url + query_params + api_key)
        .then((res) => {
            mostRecentUrl = res;
            return res.json();
        }).then((weather) => {
            displayWeather(weather);
            newSaveButton(weather);
            form.reset();
        }).catch((err) => {
            console.error(err);
            alert("Please Enter a Proper Location");
        })});      
}

function reFetch(url) {
    fetch(url)
    .then((res) => {
        return res.json();
    }).then((weather) => {
        displayWeather(weather);
    }).catch((err) => {
        console.error(err);
        alert("Please Enter a Proper Location");
    });
}

const addButton = document.getElementById("save-button");
const submitBtn = document.getElementById("submit-button");
submitBtn.addEventListener("submit", submitInfo());


// FUNCTIONS FOR ONSCREEN DISPLAY
let x = 0
function newSaveButton (weather) {
    addButton.innerHTML = "";
    const saveButton = document.createElement("button");
    saveButton.textContent = "+";
    saveButton.id = "Button" + x;
    //console.log(saveButton.id);
    x++

    addButton.appendChild(saveButton);
    let urlTemp = mostRecentUrl
    saveButton.addEventListener("click", (event) => {
        event.preventDefault();
        savedOnscreenData(weather);
        storeWeather(weather);
        cityIdStorage(urlTemp);
        addButton.removeChild(saveButton);
    });     
};

function displayWeather(weather){   
    cityName.textContent = weather.name;
    cityTemp.textContent = Math.round(weather.main.temp);
    citySky.textContent = weather.weather[0].description;
    tempHigh.textContent = `H: ${Math.round(weather.main.temp_max)}`;
    tempLow.textContent = `L: ${Math.round(weather.main.temp_min)}`;

    changeBackground(citySky);
} 

//FUNCTIONS FOR OFFSCREEN INFO STORAGE

let urlStorage = [];
function cityIdStorage(res) {
    let url = res.url;
    urlStorage.push(url);
    //console.log("URL Array:", urlStorage);
};

let cityWeatherData = [];
let cityData = {};
let i = 0;
function storeWeather(weather) {
    cityData = {
        id : i - 1,
        cityName : weather.name,
        cityTemp : Math.round(weather.main.temp),
        citySky : weather.weather[0].description,
        tempHigh : `H: ${Math.round(weather.main.temp_max)}`,
        tempLow : `L: ${Math.round(weather.main.temp_min)}` 
     }
    cityWeatherData.push(cityData);
    console.log("city weather data:", cityWeatherData);
    
};

//FUNCTION FOR SAVING ONSCREEN DATA


function savedOnscreenData(weather) {
    //CREATE TABLE ELEMENTS
    const table = document.getElementById("savedCitiesTable");
    let newTr = document.createElement("tr");
    newTr.classList.add([i]);
    newTr.id = [i];
    let trId = newTr.id;
    console.log(trId);
    //TABLE DATA ELEMENTS
    let tdName = document.createElement("td");
    let tdTemp = document.createElement("td");
        //SHOW BUTTON ELEMENTS
    const showBtnHome = document.createElement("td");
    const showBtn = document.createElement("button")
    showBtn.classList.add([i]);
    showBtn.id = "Show" + [i];
    //console.log(showBtn.id);
    showBtn.textContent = "^";
    let tempVar = i
    
    showBtn.addEventListener("click", (event) => {
        event.preventDefault();
        //console.log(`This is ${tempVar}`);
        reFetch(urlStorage[tempVar]);

    })

        //REMOVE BUTTON ELEMENTS
    const removeBtnHome = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.id =[i];
    //console.log(removeBtn.id);
    removeBtn.classList.add([i]);
    removeBtn.textContent ="x";
    removeBtn.addEventListener("click", (event) => {
        //removed from array
        if(trId == event.target.classList[0]) {
            cityWeatherData = cityWeatherData.filter((city) => {
                return city.id != trId;
            } );
        }

        if(trId == event.target.classList[0]) {
            const row = document.getElementById(trId);
            row.remove();
            console.log("Row", row);
        }

        console.log(cityWeatherData);
    })

    //OnscreenInfo
    tdName.textContent = weather.name;
    tdTemp.textContent = Math.round(weather.main.temp);

    newTr.appendChild(tdName);
    newTr.appendChild(tdTemp);
    showBtnHome.appendChild(showBtn);
    newTr.appendChild(showBtnHome);
    removeBtnHome.appendChild(removeBtn);
    newTr.appendChild(removeBtnHome);
    table.appendChild(newTr);

    i++;
}

function changeBackground(citySky) {
    if(citySky.textContent == "clear sky") {
        document.getElementById("background").style.backgroundImage="url(images/clear-sky.jpeg)";
    }
    if(citySky.textContent == "few clouds") {
        document.getElementById("background").style.backgroundImage="url(images/few-clouds.jpeg)";     
    }
    if(citySky.textContent == "scattered clouds") {
        document.getElementById("background").style.backgroundImage="url(images/scattered-clouds.jpg)";
    }
    if(citySky.textContent == "broken clouds") {
        document.getElementById("background").style.backgroundImage="url(images/broken-clouds.webp)";
    }

    if(citySky.textContent == "overcast clouds") {
        document.getElementById("background").style.backgroundImage="url(images/overcast-clouds.jpeg)";
    }

    if(citySky.textContent == "shower rain" || citySky.textContent == "rain" || citySky.textContent == "light rain") {
        document.getElementById("background").style.backgroundImage="url(images/rain-shower.jpeg)";
    }
    if(citySky.textContent == "thunderstorm") {
        document.getElementById("background").style.backgroundImage="url(images/storm-clouds.jpg)";
    }
    if(citySky.textContent == "snow") {
        document.getElementById("background").style.backgroundImage="url(images/snow-fall.avif)";
    }
    if(citySky.textContent == "mist") {
        document.getElementById("background").style.backgroundImage="url(images/images/misty-weather.jpeg)";
    } 
}