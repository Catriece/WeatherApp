const cities = [
    {
        id: number,
        city: "",
        state: "",
        country: ""
    }
]


const cityWeatherData = [];
const urlStorage = [];

class City {
    constructor(id, city, state, country) {
        this.id = id,
        this.city = city,
        this.state = state,
        this.country = country
    }
}

class List {
    constructor(cities) {
        this.city_count = cities.length,
        this.cities = cities
    }

    displayCity () {
        const city_name = document.getElementById("city-input");
        const state_name = document.getElementById("state-input");
        const country_name = document.getElementById("country-input");
        this.city_count++
        const new_city = new City (this.city_count, city_name, state_name, country_name);
        this.cities.push(new_city);        
                
    }

    //FUNCTIONS

    displayWeather(weather) {     
        //console.log(weather);

        //ONSCREEN DATA ELEMENTS
        const cityTemp = document.getElementById("city-temp");
        const cityName = document.getElementById("city-name");
        const citySky = document.getElementById("city-sky");
        const tempHigh = document.getElementById("weather-hi");
        const tempLow = document.getElementById("weather-lo");

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
}

const list = new List(cities);
const form = document.getElementById("submission");
        
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const weather_url ="https://api.openweathermap.org/data/2.5/weather?q="
    const api_key = "&appid=1ebb37266d27bc74323d4653d3899d6f&units=imperial"
    //const units_url = `&units=${units}`
    const query_params =`${city.value},${state.value},${country.value}`;

    fetch(weather_url + query_params + api_key)
    .then((res) => {
        cityIdStorage(res);
        return res.json();
    }).then((weather) => {
        displayWeather(weather);
        //saveData(weather);
    }).catch((err) => {
        console.error(err);
        alert("Please Enter a Proper Location");
    })

    list.displayCity(weather);

});


