


// https://openweathermap.org/
// API CALL
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//my key 54998115eff0a06d035e53bfc4832d3c

/*
API CALLS

Standard (default)
api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335

Metric
api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335&units=metric

Imperial
api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335&units=imperial 

https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
*/

// COUNTRY CODES
// https://www.iso.org/obp/ui/#search/code/
// use alpha-2 codes
/*
fetch( `https://api.openweathermap.org/data/2.5/weather?q=BeerSheba&units=metric&appid=${API_KEY}` )
    //.then(response => console.log(response))
    .then(response => response.json())
    .then(weather => console.log(weather.name+", temperature as felt "+weather.main.feels_like+" degrees C"))

fetch( `https://api.openweathermap.org/data/2.5/weather?q=Aachen,DE&units=imperial&appid=${API_KEY}` )
    //.then(response => console.log(response))
    .then(response => response.json())
    .then(weather => console.log(weather.name+", temperature as felt "+weather.main.feels_like+" degrees F"))

fetch( `https://api.openweathermap.org/data/2.5/weather?q=Rome,IT&appid=${API_KEY}` )
    //.then(response => console.log(response))
    .then(response => response.json())
    .then(weather => console.log(weather.name+", temperature as felt "+weather.main.feels_like+" degrees Kelvin"))

fetch( `https://api.openweathermap.org/data/2.5/weather?q=Minsk,BY&appid=${API_KEY}` )
    //.then(response => console.log(response))
    .then(response1 => response1.json())
    .then(weather => console.log(weather.name+", temperature as felt "+weather.main.feels_like+" degrees Kelvin"))
*/

//VARIABLES
const API_KEY = "54998115eff0a06d035e53bfc4832d3c";

// READ LOCATION FROM INPUT
// FIND WEATHER IN THAT LOCATION
// DISPLAY THE WEATHER 

getWeatherButton.onclick = findWeather;

async function findWeather() {
    let location = locationInput.value.trim();
    location = location.toLowerCase();  
    console.log("Searching for weather in "+ location)  
    const li = document.createElement("li");
    li.classList.add("list-group-item", "list-group-item-action");
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        //DESTRUCTURING
        .then(function( { 
            name, 
            weather: [ { description, icon } ], 
            main : { temp, pressure, humidity }, 
            //alias
            wind: { speed : windSpeed }, 
            rain: { rainTime },  
            sys: {sunrise, sunset },
            cod 
        }) {
            if (cod == 404) {
                li.innerHTML = 
                `
                <h5>${location}: Location not found!<h5>
                `  
            } else {
                const sunriseTime = new Date(sunrise*1000); //
                const sunsetTime = new Date(sunset*1000); //
                li.innerHTML = 
                `
                <h3>Location: ${name}</h3>
                <p><img src="https://openweathermap.org/img/wn/${icon}.png"></p>
                <h5>Pressure: ${pressure} Pa</h5>
                <h5>Humidity: ${humidity} %</h5>
                <h5>Temperature: ${temp} °C</h5>
                <h5>Weather: ${description}</h5>
                <h5>Sunrise time: ${sunriseTime.getHours()}:${sunriseTime.getMinutes()}:${sunriseTime.getSeconds()}</h5>
                <h5>Sunset time: ${sunsetTime.getHours()}:${sunsetTime.getMinutes()}:${sunsetTime.getSeconds()}</h5>
                <h5>Wind: ${windSpeed} km/h</h5>                
                `    
            }
        } )
        .then(function() {
            if (weatherContainer.childNodes.length == 0) {
                weatherContainer.appendChild(li);                
            } else {
                weatherContainer.removeChild(weatherContainer.firstChild);
                weatherContainer.appendChild(li);    
            }
        })    
}












