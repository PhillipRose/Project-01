// e4d3b96206444e95a9c7ce98d06c55b0
const weatherKey = `e4d3b96206444e95a9c7ce98d06c55b0`
    // mapKey is: 28oyI0GbeI2xfeMfXGihR4g2FOlIRb4
const mapKey = '28oyI0GbeI2xfeMfXGihR4g2FOlIRb4p'
var apiLon;
var apiLat;

function init() {
    var saveData = localStorage.getItem('postal_code');
    if (saveData) {
        weatherBtn(saveData);
    }
}

function localReset() {
    localStorage.removeItem('postal_code');
    inputEl.value = '';
    location.reload();
};

function storeBtn(){
   storeSearch(apiLon, apiLat);
}


function storeSearch(apiLon, apiLat){   
   storeApi = `https://www.mapquestapi.com/search/v4/place?location=${apiLon}%2C%20${apiLat}&sort=distance&feedback=false&key=${mapKey}&pageSize=5&q=ice%20cream`;
   getStores(storeApi);
   }

function weatherBtn(localData) {
    var inputEl = document.querySelector('input');
    if (localData) {
        inputValue = localData;
    } else {
        inputValue = inputEl.value;
        localStorage.setItem('postal_code', inputValue);
    }
    var apiUrl = (`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${inputValue}&days=7&units=I&key=${weatherKey}`);
    getWeather(apiUrl);
};

function getWeather(apiUrl){
    var weatherData =  fetch(apiUrl)
     .then(function (response){
      if (response.ok){      
        var firstResponse = response.json();
        firstResponse.then(
         (data) => {
            // console.log(data);
            weatherArr = data.data;
            showWeather(weatherArr, data);
            return data;            
         })
         .catch(err => console.log(err))
     }});
     return weatherData;
};

function showStores(storeArr) {
    for (var i = 0; i < storeArr.length; i++) {
        console.log(i + ' loop count');
        var storeName = document.getElementById('name-' + i);
        var location = document.getElementById('street-' + i);
        storeName.append(storeArr[i].name);
        location.append(storeArr[i].place.properties.street);
    };
};

function getStores(storeApi) {
    console.log('getStores is hitting and url is: ' + storeApi);
    var shopData = fetch(storeApi)
        .then(function(response) {
            if (response.ok) {
                var secondResponse = response.json();
                secondResponse.then(
                    (data) => {
                        storeArr = data.results;
                        showStores(storeArr);
                        return data;
                    }
                )
            }
        })
        .catch(err => console.log(err));
    return shopData;
};

function showWeather(weatherArr, data) {
   for (var i = 0; i < weatherArr.length; i++){
      console.log(i + ' is the loop count');
      console.log(weatherArr[i]);
      var daySlot = document.getElementById('day-' + i);
      var maxSlot = document.getElementById('max-' + i);
      var minSlot = document.getElementById('min-' + i);
      var days = moment(weatherArr[i].datetime).format('dddd');
      daySlot.textContent = days;
      maxSlot.textContent =('High: ' + Math.round(weatherArr[i].max_temp));
      minSlot.textContent =('Low: ' + Math.round(weatherArr[i].min_temp));
   };
   apiLat = Number(data.lat);
   apiLon = Number(data.lon);
};
init();