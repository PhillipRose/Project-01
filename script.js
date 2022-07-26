// make sure the key const has a key inside the string.
// html input element saved to variable 
var inputEl = document.querySelector('input');
// my key if needed, you can use your own just assign it to the key below as a string. 
// e4d3b96206444e95a9c7ce98d06c55b0
const key = `e4d3b96206444e95a9c7ce98d06c55b0`
// this will be how we show to data to the user 
var pTag = document.querySelector('p');

function clicker(){
   // get input value from user 
   inputValue = inputEl.value;
   // add that value to the URL with correct syntax 
   var apiUrl = (`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${inputValue}&days=5&key=${key}`);
   // Pass the URL to the fetch function to get the data
   storeApi = 'https://www.mapquestapi.com/search/v4/place?location=-111.8581%2C%2040.7372&sort=distance&feedback=true&key=28oyI0GbeI2xfeMfXGihR4g2FOlIRb4p&pageSize=20&q=ice%20cream' 
   getData(apiUrl);
   getStores(storeApi);
}


// WORKING FETCH FOR WEATHER API
 var getData = function(apiUrl){
    // add any extra variables here 
    // take in above URL to get data 
    var weatherData = fetch(apiUrl)
    //  once we get the data, add a .json() to make data readable 
     .then(function (response){
        // send out the readable data 
        return response.json();
     })
     .then(function(data){
      var forecastData = data
      weatherHolder(forecastData); 
     return forecastData;     
     });
     weatherHolder(weatherData);
  return weatherData;
};

// store fetch request from Mapquest api
function getStores(storeApi){
 var shopData =  fetch(storeApi)
    .then(function(response){
         return response.json();
      })
      .then(function(data){

         var shopData = data;
         console.log(data);
         shopHolder(shopData);
         return shopData;
      })
      return shopData;
};




