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



let cityWeatherData = []
const form = document.getElementById("submission");
let urlStorage = []

class City {
    constructor(id, city, state, country) {
        this.id = id,
        this.city = city,
        this.state = state,
        this.country = country
    }
}

const saveBtn = document.getElementById("save");
class SavedCities {
    constructor(cities) {
        this.city_count = 0
        this.cities = cities
    }

    
    submitInfo() {
    
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
            const submitBtn = document.getElementById("submit-button");
            submitBtn.addEventListener("submit", (event) => {
                event.preventDefault();
                submitInfo();
            });
            const cityLibrary = new SavedCities(cities);
            saveBtn.addEventListener("click", (event) => {
                event.preventDefault();
                cityLibrary.saveData(weather);
                console.log(cityLibrary);
})
            //saveData(weather);
        }).catch((err) => {
            console.error(err);
            alert("Please Enter a Proper Location");
        })});
        
    }


    saveData(weather) {
        
    //saveBtn.addEventListener("click", (event) => {
      //  event.preventDefault();
       
        const table = document.getElementById("savedCitiesTable");
        const newTr = document.createElement("tr");
        newTr.id = [this.city_count] + city.value;
        //console.log(newTr.id);
        this.city_count++
        const newCity = new City(this.city_count, city.value, state.value, country.value);
        this.cities.push(newCity);
        console.log(newCity);

        const tdName = document.createElement("td");
        const tdTemp = document.createElement("td");
        const showBtnHome = document.createElement("td");
        const showBtn = document.createElement("button")
        showBtn.id = "show"
        showBtn.textContent = "^"
        const removeBtnHome = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.id = "remove"
        removeBtn.textContent ="x"
        removeBtn.addEventListener("click", (event) => {
            //
        })

        tdName.textContent = weather.name;
        tdTemp.textContent = Math.round(weather.main.temp)

        newTr.appendChild(tdName);
        newTr.appendChild(tdTemp);
        showBtnHome.appendChild(showBtn);
        newTr.appendChild(showBtnHome);
        removeBtnHome.appendChild(removeBtn);
        newTr.appendChild(removeBtnHome);
        table.appendChild(newTr);

        form.reset();
    }

    //FUNCTIONS

    displayWeather(weather){     
        //console.log(weather);
        cityName.textContent = weather.name;
        cityTemp.textContent = Math.round(weather.main.temp);
        citySky.textContent = weather.weather[0].description;
        tempHigh.textContent = `H: ${Math.round(weather.main.temp_max)}`;
        tempLow.textContent = `L: ${Math.round(weather.main.temp_min)}`;

        let cityWeather = new Set();
        cityWeather.add(weather.name)
        cityWeather.add(Math.round(weather.main.temp));
        cityWeather.add(weather.weather[0].description);
        cityWeather.add(`H: ${Math.round(weather.main.temp_max)}`);
        cityWeather.add(`L: ${Math.round(weather.main.temp_min)}`);

        //console.log(cityWeather);
        cityWeatherData.push(cityWeather);
        console.log(cityWeatherData);
} 



    cityIdStorage(res) {
        let url = res.url;
        urlStorage.push(url);
        console.log(urlStorage);
    }

    optionSaveInfo () {
        const save = getElementById("save");
        save.addEventListener("click", (event) => {
            cityIdStorage();
            createList();
        })
    }

}



