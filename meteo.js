const apiKey="f16b60b8995ae688faa177084cf9be38"
const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const search =document.querySelector("#input");
const searchbtn =document.querySelector(".but");
const weathericon =document.querySelector(".img");

async function chektWeather(name){
    const response = await fetch(apiUrl + name +`&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML= data.main.temp +"C°";
    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".wind").innerHTML=data.wind.speed +"km/H";
    document.querySelector(".weather-description").innerHTML = data.weather[0].description;

 
    if (data.weather[0].main == "Clouds") {
        weathericon.src = "asset/icon/animated/cloudy.svg";
    } else if (data.weather[0].main == "Clear") {
        weathericon.src = "asset/icon/animated/clear.svg";
    } else if (data.weather[0].main == "Rain") {
        weathericon.src = "asset/icon/animated/rainy.svg";
    } else if (data.weather[0].main == "Snow") {
        weathericon.src = "asset/icon/animated/snowy.svg";
    } else {
        weathericon.src = "asset/icon/animated/default.svg";
    }
}
    

searchbtn.addEventListener("click", function(event) {
    event.preventDefault();
    chektWeather(search.value);
})


