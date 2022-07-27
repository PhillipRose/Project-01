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
            // deal with all the weather data inside here
            // call functions and pass them any needed data here

            // day of the week data to parse with momentJS
            date = data.data;
            showDay(date);
            // console.log('This is the date:  ' + date);
            // console.log(moment(date).format('dddd'));



            // This data is for the map api url 
            apiLat = Number(data.lat);
            apiLon = Number(data.lon); 
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
            // deal with all the map data here 
            // call any needed functions and pass them the data from here 
            console.log(data);
            return data;
         }
       )
      }
      })
      .catch(err => console.log(err));
      return shopData;
};

// var title = document.createElement('<p>')
// var street = document.createElement('<p>')

// title.append(data)
// street.append(data);

// var card = document.getElementById("max-" + i)
// var value = data.data[i].max_temp;
// card.append(value);

function showDay(date) {
   for (var i =0; i <= 5; i++){
      console.log(i);
      var daySlot = document.getElementById('day-' + i)
      var days = moment(date[i].datetime).format('dddd');
      daySlot.append(days);
      console.log(days + ' is the day');
   }
}


