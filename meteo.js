
const apiKey = "ba71f186309e4d93b5e4fb18dd830016";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const search = document.querySelector("#input");
const btn = document.querySelector(".but");

async function getWeather(name) {
    const response = await fetch(apiUrl + name + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerText = data.city.name;
    document.querySelector(".temp").innerText = Math.round(data.list[0].main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.list[0].main.humidity + " %";
    document.querySelector(".wind").innerText = data.list[0].wind.speed + " km/h";

    const weatherMain = data.list[0].weather[0].main;
    const weatherImg = document.querySelector(".img");

    if (weatherMain == "Clouds") {
        weatherImg.src = "/asset/icon/animated/cloudy-day-1.svg";
    } else if (weatherMain == "Clear") {
        weatherImg.src = "/asset/icon/animated/day.svg";
    } else if (weatherMain == "Rain") {
        weatherImg.src = "/asset/icon/animated/rainy-1.svg";
    } else if (weatherMain == "Snow") {
        weatherImg.src = "/asset/icon/animated/snowy-1.svg";
    } else if (weatherMain == "Thunderstorm") {
        weatherImg.src = "/asset/icon/animated/thunder.svg";
    } else {
        weatherImg.src = "/asset/icon/animated/cloudy-day-1.svg"; 
    }

   
    const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const cardsContainer = document.querySelector(".row");
    cardsContainer.innerHTML = ""; 

    for (let i = 1; i <= 4; i++) {
        const dayIndex = i * 8; 
        const dayData = data.list[dayIndex];
        const dayWeatherMain = dayData.weather[0].main;
        let dayWeatherIcon;

        if (dayWeatherMain == "Clouds") {
            dayWeatherIcon = "/asset/icon/animated/cloudy-day-1.svg";
        } else if (dayWeatherMain == "Clear") {
            dayWeatherIcon = "/asset/icon/animated/day.svg";
        } else if (dayWeatherMain == "Rain") {
            dayWeatherIcon = "/asset/icon/animated/rainy-1.svg";
        } else if (dayWeatherMain == "Snow") {
            dayWeatherIcon = "/asset/icon/animated/snowy-1.svg";
        } else if (dayWeatherMain == "Thunderstorm") {
            dayWeatherIcon = "/asset/icon/animated/thunder.svg";
        } else {
            dayWeatherIcon = "/asset/icon/animated/cloudy-day-1.svg"; 
        }                                        

        const date = new Date(dayData.dt_txt);
        const dayName = daysOfWeek[date.getDay()];

        const cardHTML = `
            <div class="col-md-2">
                <div class="weather-card">
                    <div class="info">
                        <h2 class="tod">${dayName}</h2>
                        <img src="${dayWeatherIcon}" alt="Weather Icon">
                        <div class="tem">
                            <p>Température: ${Math.round(dayData.main.temp)}°C</p>
                            <p>Vent: ${dayData.wind.speed} km/h</p>
                            <p>Humidité: ${dayData.main.humidity} %</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardsContainer.innerHTML += cardHTML;
    }



    
}



btn.addEventListener("click", function(event) {
    event.preventDefault(); 
    getWeather(search.value);
});




