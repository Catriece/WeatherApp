//BACKGROUND

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
function submitInfo() {
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("hello")
        const query_params =`${city.value},${state.value},${country.value}`;

        fetch(weather_url + query_params + api_key)
        .then((res) => {
            cityIdStorage(res);
            return res.json();
        }).then((weather) => {
            displayWeather(weather);
            storeWeather(weather);
            newSaveButton(weather);
            form.reset();
        }).catch((err) => {
            console.error(err);
            alert("Please Enter a Proper Location");
        })});
        
    }
const addButton = document.getElementById("save-button");
const saveButton = document.createElement("button");

const submitBtn = document.getElementById("submit-button");
submitBtn.addEventListener("submit", submitInfo());


// FUNCTIONS FOR ONSCREEN DISPLAY
let x = 0
function newSaveButton (weather) {
    
    saveButton.textContent = "+";
    saveButton.id = "Button" + x;
    console.log(saveButton.id);
    x++

    addButton.appendChild(saveButton);

    saveButton.addEventListener("click", (event) => {
        event.preventDefault();
        savedOnscreenData(weather);
        addButton.removeChild(saveButton);
    });
        
};

function displayWeather(weather){   
    
    cityName.textContent = weather.name;
    cityTemp.textContent = Math.round(weather.main.temp);
    citySky.textContent = weather.weather[0].description;
    tempHigh.textContent = `H: ${Math.round(weather.main.temp_max)}`;
    tempLow.textContent = `L: ${Math.round(weather.main.temp_min)}`; 

} 

//FUNCTIONS FOR OFFSCREEN INFO STORAGE

let urlStorage = [];
function cityIdStorage(res) {
    let url = res.url;
    urlStorage.push(url);
    };

let cityWeatherData = [];
let cityData = {};
function storeWeather(weather) {
    cityData = {
        cityName : weather.name,
        cityTemp : Math.round(weather.main.temp),
        citySky : weather.weather[0].description,
        tempHigh : `H: ${Math.round(weather.main.temp_max)}`,
        tempLow : `L: ${Math.round(weather.main.temp_min)}` 
     }
    cityWeatherData.push(cityData);
    console.log(cityWeatherData);
};

//FUNCTION FOR SAVING ONSCREEN DATA
let i = 0

function savedOnscreenData(weather) {
    const table = document.getElementById("savedCitiesTable");
    let newTr = document.createElement("tr");
    newTr.classList.add([i]);
    newTr.id = "cityRow" + [i];
    console.log(newTr.id);
    i++
    let tdName = document.createElement("td");
    let tdTemp = document.createElement("td");
    const showBtnHome = document.createElement("td");
    const showBtn = document.createElement("button")
    showBtn.classList.add([i]);
    showBtn.id = "Show" + [i];
    console.log(showBtn.id);
    showBtn.textContent = "^";
    const removeBtnHome = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.id = "remove" + [i];
    console.log(removeBtn.id);
    removeBtn.classList.add([i]);
    removeBtn.textContent ="x";
    /*removeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        let cityWeatherData = cityWeatherData.filter((city) => {
            return city.id != id;
        });
    })*/

    tdName.textContent = weather.name;
    tdTemp.textContent = Math.round(weather.main.temp);

    newTr.appendChild(tdName);
    newTr.appendChild(tdTemp);
    showBtnHome.appendChild(showBtn);
    newTr.appendChild(showBtnHome);
    removeBtnHome.appendChild(removeBtn);
    newTr.appendChild(removeBtnHome);
    table.appendChild(newTr);
}




/*
function savedOnscreenData(weather) {
        newTr.classList.add([i]);
        newTr.id = "cityRow" + [i];
        console.log(newTr.id);
        i++
        let tdName = document.createElement("td");
        let tdTemp = document.createElement("td");
        const showBtnHome = document.createElement("td");
        const showBtn = document.createElement("button")
        showBtn.classList.add([i]);
        showBtn.id = "Show" + [i];
        console.log(showBtn.id);
        showBtn.textContent = "^"
        showBtn.addEventListener("click", (event) => {
            if(newTr.id == urlStorage[i]) {
                //displayWeather(weather);
                submitInfo()
            }
        })
        const removeBtnHome = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.id = "remove" + [i];
        console.log(removeBtn.id);
        removeBtn.classList.add([i]);
        removeBtn.textContent ="x"
        //removeBtn.addEventListener("click", (event) => { })


        tdName.textContent = weather.name;
        tdTemp.textContent = Math.round(weather.main.temp)

        newTr.appendChild(tdName);
        newTr.appendChild(tdTemp);
        showBtnHome.appendChild(showBtn);
        newTr.appendChild(showBtnHome);
        removeBtnHome.appendChild(removeBtn);
        newTr.appendChild(removeBtnHome);
        table.appendChild(newTr);

    }; */
