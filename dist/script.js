let city = "Ostrava";

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", passNewParameters);

getWeatherData()

function passNewParameters() {
    city = document.getElementById("input").value;
    getWeatherData()
    document.getElementById("input").value = null;
}

function getWeatherData() {
    fetch(`/.netlify/functions/weatherData?city=${city}`)
        .then(apiResponse => apiResponse.json())
        .then(weatherData => displayWeatherData(weatherData))
}

function displayWeatherData(weatherData) {
    displayCurrentWeather(weatherData);
    displayForthcomingWeather(weatherData)
    displayForthcomingDaysWeather(weatherData);
}

function displayCurrentWeather(weatherData) {

    let location = document.getElementById("location");
    location.innerHTML = weatherData.location.name;

    let region = document.getElementById("region");
    region.innerHTML = weatherData.location.region;

    let country = document.getElementById("country");
    country.innerHTML = weatherData.location.country;

    let currentIcon = document.getElementById("currentIcon");
    currentIcon.src = weatherData.current.condition.icon;

    let temperature = document.getElementById("temperature");
    temperature.innerHTML = Math.round(weatherData.current.temp_c) + "°";
}

function displayForthcomingWeather(weatherData) {

    let timeStamp = getCurrentHour(weatherData)

    getForthcomingWeatherDetails(1, 2);
    getForthcomingWeatherDetails(2, 4);
    getForthcomingWeatherDetails(3, 6);
    getForthcomingWeatherDetails(4, 8);
    getForthcomingWeatherDetails(5, 10);
    getForthcomingWeatherDetails(6, 12);


    function getForthcomingWeatherDetails(colNum, hoursToAdd) {
        if ((timeStamp + hoursToAdd) < 24) {
            let reqTime = timeStamp + hoursToAdd;

            let timeRaw = document.querySelector(`.timeC${colNum}`);
            timeRaw.innerHTML = reqTime + ":00"

            let iconRaw = document.querySelector(`.iconC${colNum}`);
            iconRaw.src = weatherData.forecast.forecastday[0].hour[reqTime].condition.icon

            let tempRaw = document.querySelector(`.tempC${colNum}`);
            tempRaw.innerHTML = Math.round(weatherData.forecast.forecastday[0].hour[reqTime].temp_c) + "°"
        }

        if((timeStamp + hoursToAdd) >= 24) {
            let remainder = 24 - timeStamp;
            let reqTime = hoursToAdd - remainder;

            let timeRaw = document.querySelector(`.timeC${colNum}`);
            timeRaw.innerHTML = reqTime + ":00"

            let iconRaw = document.querySelector(`.iconC${colNum}`);
            iconRaw.src = weatherData.forecast.forecastday[1].hour[reqTime].condition.icon

            let tempRaw = document.querySelector(`.tempC${colNum}`);
            tempRaw.innerHTML = Math.round(weatherData.forecast.forecastday[1].hour[reqTime].temp_c) + "°"
        }
    }
}

function displayForthcomingDaysWeather(weatherData) {

    //tomorrow
    let day1Date = new Date(weatherData.forecast.forecastday[1].date);
    let day1Num = day1Date.getDay();
    let tomorrow = document.getElementById("tomorrow");
    tomorrow.innerHTML = getDayName(day1Num);

    let tomorrowIcon = document.getElementById("tomorrowIcon");
    tomorrowIcon.src = weatherData.forecast.forecastday[1].day.condition.icon;

    let tomorrowTemperatureSpan = document.getElementById("tomorrowTemperatureSpan");
    tomorrowTemperatureSpan.innerHTML = Math.round(weatherData.forecast.forecastday[1].day.mintemp_c) + " to " + Math.round(weatherData.forecast.forecastday[1].day.maxtemp_c) + "°C"

    
    //after tomorrow
    let day2Date = new Date(weatherData.forecast.forecastday[2].date);
    let day2Num = day2Date.getDay();
    let afterTomorrow = document.getElementById("afterTomorrow");
    afterTomorrow.innerHTML = getDayName(day2Num);
    
    let afterTomorrowIcon = document.getElementById("afterTomorrowIcon");
    afterTomorrowIcon.src = weatherData.forecast.forecastday[2].day.condition.icon;

    let afterTomorrowTemperatureSpan = document.getElementById("afterTomorrowTemperatureSpan");
    afterTomorrowTemperatureSpan.innerHTML = Math.round(weatherData.forecast.forecastday[2].day.mintemp_c) + " to " + Math.round(weatherData.forecast.forecastday[2].day.maxtemp_c) + "°C"

}

function getDayName(dayNum) {

    if(dayNum === 0) {
        return "Sunday"
    }

    if (dayNum === 1) {
        return "Monday"
    }

    if (dayNum === 2) {
        return "Tuesday"
    }

    if (dayNum === 3) {
        return "Wednesday"
    }

    if (dayNum === 4) {
        return "Thursday"
    }

    if (dayNum === 5) {
        return "Friday"
    }

    if (dayNum === 6) {
        return "Saturday"
    }
    
}

function getCurrentHour(weatherData) {
    let currentTime = new Date(weatherData.current.last_updated);
    let currentHour = currentTime.getHours();

    return currentHour;
}