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


function displayTemperature(response){   
    let temp=document.querySelector("#tempID");
    let city=document.querySelector("#cityID");
    let status=document.querySelector("#statusID");
    let humidity=document.querySelector("#humidityID");
    let wind=document.querySelector("#windID");
    let datetime=document.querySelector("#datetimeID")
    let icon=document.querySelector("#iconID");
    let iconCode=(response.data.weather[0].icon);
    temp.innerHTML=Math.round(response.data.main.temp);
    city.innerHTML=(response.data.name);
    status.innerHTML=(response.data.weather[0].description)
    humidity.innerHTML=(response.data.main.humidity);
    wind.innerHTML=Math.round(response.data.wind.speed);
    datetime.innerHTML=formatDate(response.data.dt*1000);
    icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${iconCode}@2x.png`)
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

search("New York");

let searchForm=document.querySelector("#search-formID");
searchForm.addEventListener("submit",handleSubmit);