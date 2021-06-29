//declare variables
var stuff = document.getElementById('stuff');
var searchBtn = document.getElementById("search");
var query = document.getElementById("query");
var display = document.querySelector(".display");
var today = document.querySelector(".today");
var fiveDay = document.querySelector(".five-day");
var lat = 0;
var lon = 0;
var city = "atlanta"

query.value = "atlanta";


stuff.textContent = "stuff";

// url = 'https://api.openweathermap.org/data/2.5/onecall?lat=34&lon=-85&appid=402e451bec985a02830bdf244193e68e&units=imperial';
// url = 'https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=402e451bec985a02830bdf244193e68e&units=imperial'

function populate(weather){
    today.innerHTML = "";
    fiveDay.innerHTML = "";

    // console.log(weather);

    var current = weather.current;
    var daily = weather.daily;

    var cityEl = document.createElement("h1")
    cityEl.textContent = city;
    today.appendChild(cityEl);

    var temp = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");
    var uvIndex = document.createElement("p");
    temp.textContent = "Temp: "+current.temp+" deg F";
    wind.textContent = "Wind: "+current.wind_speed+" MPH";
    humidity.textContent = "Humidity: "+current.humidity+" %";
    uvIndex.textContent = "UV Index: "+current.uvi;

    today.appendChild(temp);
    today.appendChild(wind);
    today.appendChild(humidity);
    today.appendChild(uvIndex);

    for(i=0; i<5; i++){
        var card = document.createElement("div");

        temp = document.createElement("p");
        wind = document.createElement("p");
        humidity = document.createElement("p");

        temp.textContent = "Temp: "+daily[i].temp.day+" deg F";
        wind.textContent = "Wind: "+daily[i].wind_speed+" MPH";
        humidity.textContent = "Humidity: "+daily[i].humidity+" %";

        card.appendChild(temp);
        card.appendChild(wind);
        card.appendChild(humidity);

        fiveDay.appendChild(card);
        
    }
    // console.log("current",current);
    // console.log(daily);

}





searchBtn.addEventListener("click", function(){
    stuff.textContent = query.value;
    var preCity = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var postCity = '&appid=402e451bec985a02830bdf244193e68e&units=imperial';
    city = query.value;
    var url = preCity + city + postCity;
     
    

    // display.textContent = "test";

  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    lat = data.coord.lat;
    lon = data.coord.lon;
    // console.log(data);
    console.log("1",lat, lon);
    return [lat, lon];
    
  })
  .then(function (data){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data[0] + '&lon=' + data[1] + '&appid=402e451bec985a02830bdf244193e68e&units=imperial')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        populate(data);
        // console.log(data)
    })
    // return weather;
  })
  


//   console.log(weather);

})

// console.log(lat, lon);
