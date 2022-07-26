// make sure both the key const has a key inside the string.
// html elements saved to variables 
var inputEl = document.querySelector('input');
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
// on click for the weather button 
function weatherBtn(){
   // get input value from user 
   inputValue = inputEl.value;
   // add that value to the URL with correct syntax 
   var apiUrl = (`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${inputValue}&days=5&units=I&key=${weatherKey}`);
   // Pass the URL to the fetch function to get the data
   getWeather(apiUrl);   
 
};
// on click for the ice cream button takes in the Lon and Lat from weather api. Calls the Mapquest fetch.
function storeBtn(lon, lat){
   apiLon = lon;
   apiLat = lat;
   console.log(apiLon);
   console.log(apiLat);
   debugger;
   storeApi = `https://www.mapquestapi.com/search/v4/place?location=${apiLon}%2C%20${apiLat}&sort=distance&feedback=false&key=${mapKey}&pageSize=5&q=ice%20cream`;   

   getStores(storeApi);

}


// WORKING FETCH FOR WEATHER API
function getWeather(apiUrl){
    // add any extra variables here 
    // take in above URL to get data 
    var weatherData = fetch(apiUrl)
    //  once we get the data, add a .json() to make data readable 
     .then(function (response){
        // send out the readable data 
        return response.json();
     })
     .then(function(data){
      console.log(data);
     });
  return weatherData;
};
// fetch request from Mapquest api
function getStores(storeApi){
 var shopData =  fetch(storeApi)
    .then(function(response){
         return response.json();
      })
      .then(function(data){

         var shopData = data;
         console.log(data);
         return shopData;
      })
      return shopData;
};





