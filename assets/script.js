var inputEl = document.querySelector('#search');
var submitBtn = document.querySelector('button');
var searchPanelEl = document.querySelector('#search-panel');
var resultsEl = document.getElementById('results')
var APIKey = 'd70706b4d4dcc056e7ad4c740cdfbe3a';
var date = dayjs().format('MMM D YYYY');
var dateEl = document.getElementById('date-El')
var listEl = document.querySelector('ul')
var city;
var cityName = document.querySelector('h3');
var tempEl = document.querySelector('#temp');
var humidEl = document.querySelector('#humidity');
var windEl = document.querySelector('#wind');
var locations = []
var day1El = document.getElementById('day1')
var day2El = document.getElementById('day2')
var day3El = document.getElementById('day3')
var day4El = document.getElementById('day4')
var day5El = document.getElementById('day5')

// var locationBtnEl = document.querySelector('p .location-btn')
// var searchPanelBtn = document.querySelector('p')
var cityNameEl = document.getElementById('city-nameEl')


var newCityCap;
var latitude;
var longitude;


var formSubmitHandler = function(event) {
    event.preventDefault();

    city = inputEl.value;
    locations.push(city)
    

    if (city) {
        getWeather(city);
        
        var loggedCity = document.createElement('p')
        loggedCity.addEventListener('click', reloadData)
        var cityArray = city.split(' ')
        for (var i = 0; i < cityArray.length; i++) {
            
            cityArray[i] = cityArray[i].charAt(0).toUpperCase() + cityArray[i].slice(1)
            
        }
        newCityCap = cityArray.join(' ')
        cityName.textContent = newCityCap;
        loggedCity.textContent = newCityCap;
        loggedCity.className = 'location-btn';
        searchPanelEl.appendChild(loggedCity);

        
     
    }

    inputEl.value = ' ';
}


var getWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayWeather(data);
                getFiveDayForecast(data);
              
                
                
            });
        } else {
            var errMsg = document.createElement('p')
            errMsg.textContent = 'Error: ' + response.statusText;
            searchPanelEl.appendChild(errMsg)
        }
       
        
    })
    .catch(function (error) {
        alert('Unable to connect to WeatherAPI')
        
    });
    
   
    
}
var displayWeather = function(data) {
    cityName.textContent = newCityCap.trim()
    dateEl.textContent = date;

    // var dateEl = document.createElement('p')
    // var parentDiv = document.querySelector('ul').parentNode
    // parentDiv.insertBefore(dateEl, listEl)
    // dateEl.textContent = date

    
    // cityName.textContent = newCityCap + ' ' + date;
    tempEl.textContent = ~~(data.main.temp) + "°";
    humidEl.textContent = ~~(data.main.humidity) + "%";
    windEl.textContent = ~~(data.wind.speed) +" mph";
    latitude = data.coord.lat;
    longitude = data.coord.lon;
    window.localStorage.setItem('latitude', latitude)
    window.localStorage.setItem('longitude', longitude)
    
}

var getFiveDayForecast = function() {
    latitude = localStorage.getItem('latitude')
    longitude = localStorage.getItem('longitude')
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayForecast(data);
            });
        } else {
            return
        }
        
    })
    .catch(function (error) {
        alert('Unable to connect to WeatherAPI')
    });
}



var displayForecast = function(data) {
   

    for (var i = 0; i < 40; i+=8 ) {
        var unix_timestamp = data.list[i].dt;
        var date = new Date(unix_timestamp *1000);
        document.getElementById('date'+[i/8+1]).innerHTML = dayjs(date).format('dddd </br> MMM D');
        document.getElementById('icon'+[i/8+1]).src="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon +"@2x.png";
        document.getElementById('temp'+[i/8+1]).innerHTML = 'Temp: ' + ~~(data.list[i].main.temp) + '°';
        document.getElementById('wind'+[i/8+1]).innerHTML = 'Wind: ' + ~~(data.list[i].wind.humidity) + ' mph';
        document.getElementById('humid'+[i/8+1]).innerHTML = 'Humidity: ' + ~~(data.list[i].wind.speed) + '%';
        

    }

    // for (var i = 1; i < 5; i++ ) {
    //     var unix_timestamp = data.list[i].dt;
    //     var date = new Date(unix_timestamp *1000);
    //     document.getElementById('date'+[i+1]).innerHTML = dayjs(date).format('dddd </br> MMM D');
    //     document.getElementById('icon'+[i+1]).src="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon +"@2x.png";
    //     document.getElementById('temp'+[i+1]).innerHTML = 'Temp: ' + ~~(data.list[i].main.temp) + '°';
    //     document.getElementById('wind'+[i+1]).innerHTML = 'Wind: ' + ~~(data.list[i].wind.humidity) + ' mph';
    //     document.getElementById('humid'+[i+1]).innerHTML = 'Humidity: ' + ~~(data.list[i].wind.speed) + '%';
        
    // }

 
}

var reloadData = function (event) {
    console.log('helo')
    event.preventDefault();
    
        city = this.textContent;
        city = city.toLowerCase()
        console.log(city)
       
        getWeather(city);
        
        var cityArray = city.split(' ')
        for (var i = 0; i < cityArray.length; i++) {
            
            cityArray[i] = cityArray[i].charAt(0).toUpperCase() + cityArray[i].slice(1)
            
        }
        newCityCap = cityArray.join(' ')
        cityName.textContent = newCityCap;
        

        
     
    

    inputEl.value = ' ';
}
  

   


submitBtn.addEventListener('click', formSubmitHandler);



