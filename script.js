var inputEl = document.querySelector('input');
var saveData = localStorage.getItem('postal_code');
// e4d3b96206444e95a9c7ce98d06c55b0
const weatherKey = `e4d3b96206444e95a9c7ce98d06c55b0`
    // mapKey is: 28oyI0GbeI2xfeMfXGihR4g2FOlIRb4
const mapKey = '28oyI0GbeI2xfeMfXGihR4g2FOlIRb4p'
var apiLon;
var apiLat;

function init() {
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
    if (localData) {
        inputValue = localData;
    } else {
        inputValue = inputEl.value;
        localStorage.setItem('postal_code', inputValue);
    }

    var apiUrl = (`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${inputValue}&days=7&units=I&key=${weatherKey}`);
    getWeather(apiUrl);
};

function storeSearch(apiLon, apiLat) {
    var storeApi = `https://www.mapquestapi.com/search/v4/place?location=${apiLon}%2C%20${apiLat}&sort=distance&feedback=false&key=${mapKey}&pageSize=5&q=ice%20cream`;
    console.log(storeApi);

    getStores(storeApi);

}

function getWeather(apiUrl){
    var weatherData =  fetch(apiUrl)
     .then(function (response){
      if (response.ok){      
        var firstResponse = response.json();
        firstResponse.then(
         (data) => {
            // console.log(data);
            weatherArray = data.data;
            showWeather(weatherArray, data);
            return data;            
         }
         )
         .catch(err => console.log(err))
     }});
     return weatherData;
};

function showStores(storeArray) {
    for (var i = 0; i <= storeArray.length; i++) {
        console.log(i + ' loop count');
        var storeName = document.getElementById('name-' + i);
        var street = document.getElementById('street-' + i);
        storeName.append(storeArray[i].results.name);
        street.append(storeArray[i].results.street);


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
                        console.log(data);
                        return data;
                    }
                )
            }
        })
        .catch(err => console.log(err));
    return shopData;
};

function showWeather(weatherArray, data) {
   for (var i = 0; i < weatherArray.length; i++){
      console.log(i + ' is the loop count');
      console.log(weatherArray[i]);
      var daySlot = document.getElementById('day-' + i);
      var maxSlot = document.getElementById('max-' + i);
      var minSlot = document.getElementById('min-' + i);
      var days = moment(weatherArray[i].datetime).format('dddd');
      daySlot.textContent = days;
      maxSlot.textContent =('High: ' + Math.round(weatherArray[i].max_temp));
      minSlot.textContent =('Low: ' + Math.round(weatherArray[i].min_temp));
   };
   apiLat = Number(data.lat);
   apiLon = Number(data.lon);
};
init();