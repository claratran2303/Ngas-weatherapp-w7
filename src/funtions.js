
function formatForecastDay(timestamp){
    let date=new Date(timestamp*1000);  
    let days=[
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"];
    return `${days[date.getDay()]}`;
}

function formatDate(timestamp){
    let date=new Date(timestamp);
    let hours=date.getHours();
    let minutes=date.getMinutes();
    let days=[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"];
    let day=days[date.getDay()];


    if(minutes<10){
        minutes=`0${minutes}`;
    }
    if(hours<10){
        hours=`0${hours}`;
    }
   
    return `${day} ${hours}:${minutes}`;
   
}

function showForecast(response){
    console.log(response.data.daily);
    let forecastData=response.data.daily;
    let forecast=document.querySelector("#forecastID");
    let forecastHTML="";
    forecastData.forEach(function(dailyForecastData,index){
       if (index<6){
            forecastHTML=forecastHTML+
            `    
            <div class="col-2 col-forecast">
                <div class="forecast-day">${formatForecastDay(dailyForecastData.dt)}</div>
                    <img src="http://openweathermap.org/img/wn/${dailyForecastData.weather[0].icon}@2x.png" alt="" width="42">
                    <div class="forecast-temp"> 
                        <span class="forecast-temp-max">${Math.round(dailyForecastData.temp.max)}°</span>
                        <span class="forecast-temp-min">${Math.round(dailyForecastData.temp.min)}°</span>
                    </div>
                </div>  
            </div>    
            `;
       };
    });
    forecast.innerHTML=forecastHTML;
}

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey="d3c8204f4c4db0d26947b9ed2cb7ac82";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lat}&exclude={part}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(showForecast);
}

function displayTemperature(response){   
    let temp=document.querySelector("#tempID");
    let city=document.querySelector("#cityID");
    let status=document.querySelector("#statusID");
    let humidity=document.querySelector("#humidityID");
    let wind=document.querySelector("#windID");
    let datetime=document.querySelector("#datetimeID")
    let icon=document.querySelector("#iconID");
    let iconCode=(response.data.weather[0].icon);
    let tempValue=Math.round(response.data.main.temp)
    if (tempValue<10){
        tempValue=`0${tempValue}`
    }
    CDegreeTemp= response.data.main.temp;
    
    temp.innerHTML=tempValue;
    city.innerHTML=(response.data.name);
    status.innerHTML=(response.data.weather[0].description)
    humidity.innerHTML=(response.data.main.humidity);
    wind.innerHTML=Math.round(response.data.wind.speed);
    datetime.innerHTML=formatDate(response.data.dt*1000);
    icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${iconCode}@2x.png`)

    getForecast(response.data.coord);
}

function search(city){
    let apiKey="d3c8204f4c4db0d26947b9ed2cb7ac82";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInput=document.querySelector("#cityInputID");
    search(cityInput.value);
    console.log(cityInput.value);
}

function displayCDegree(event){
    event.preventDefault();
    CDegreeLink.classList.add("active");
    FDegreeLink.classList.remove("active");
    let temp=document.querySelector("#tempID");
    temp.innerHTML=Math.round(CDegreeTemp);
}

function displayFDegree(event){
    event.preventDefault();
    let FDegreeTemp=(CDegreeTemp*9)/5+32;
   // remove the active class the C degree link
    CDegreeLink.classList.remove("active");
    FDegreeLink.classList.add("active");
    let temp=document.querySelector("#tempID");
    temp.innerHTML=Math.round(FDegreeTemp);
}

let CDegreeTemp=null;

let searchForm=document.querySelector("#search-formID");
searchForm.addEventListener("submit",handleSubmit);

let FDegreeLink=document.querySelector("#F-degreeID");
FDegreeLink.addEventListener("click", displayFDegree);

let CDegreeLink=document.querySelector("#C-degreeID");
CDegreeLink.addEventListener("click", displayCDegree);


    
search("Ho Chi Minh City");


