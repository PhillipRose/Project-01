// make sure both the key const has a key inside the string.
// html elements saved to variables 
var inputEl = document.querySelector('input');
var saveData = localStorage.getItem('postal_code');
// needed html variables list 
   // weather card class 





// my key if needed, you can use your own just assign it to the key below as a string. 
// e4d3b96206444e95a9c7ce98d06c55b0
const weatherKey = `e4d3b96206444e95a9c7ce98d06c55b0`
// mapKey is: 28oyI0GbeI2xfeMfXGihR4g2FOlIRb4
const mapKey = '28oyI0GbeI2xfeMfXGihR4g2FOlIRb4p'
// use these to hold the Lon and Lat values from the weather api for use in Mapquest api
var apiLon; 
var apiLat;


function init(){
   if (saveData){
      weatherBtn(saveData);
   }
}

// tied to clicking the reset button 
function localReset(){
   localStorage.removeItem('postal_code');
   inputEl.value = '';
   location.reload();
};

// on click for the weather button 
function weatherBtn(localData){
   if (localData){
      inputValue = localData;
   } else {
      inputValue = inputEl.value;
      localStorage.setItem('postal_code', inputValue);
   }
   

   var apiUrl = (`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${inputValue}&days=7&units=I&key=${weatherKey}`);
   // Pass the URL to the fetch function to get the data
   getWeather(apiUrl);
     
 
};
// on click for the ice cream button takes in the Lon and Lat from weather api. Calls the Mapquest fetch.
function storeBtn(){
   getStores(storeApi);
}


function storeSearch(apiLon, apiLat){   
   storeApi = `https://www.mapquestapi.com/search/v4/place?location=${apiLon}%2C%20${apiLat}&sort=distance&feedback=false&key=${mapKey}&pageSize=5&q=ice%20cream`;   
   console.log(storeApi);
   // debugger;
   getStores(storeApi);
}


// WORKING FETCH FOR WEATHER API
function getWeather(apiUrl){
    var weatherData =  fetch(apiUrl)
     .then(function (response){
      if (response.ok){      
        var firstResponse = response.json();
        firstResponse.then(
         (data) => {
            console.log(data);
            // Weather data array to parse with for loops
            weatherArray = data.data;
            showWeather(weatherArray, data);
 
            // This data is for the map api url 
            
            // storeSearch(apiLon, apiLat);

            return data;            
         }
         )
         .catch(err => console.log(err))
     }});
     return weatherData;
};



// fetch request from Mapquest api
function getStores(storeApi){
   console.log('getStores is hitting and url is: ' + storeApi);
 var shopData =  fetch(storeApi)
    .then(function(response){
      if (response.ok){
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

   for (var i = 0; i <= weatherArray.length; i++){
      console.log(i + ' is the loop count');
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