// api key for Weatherbit
const weatherKey = `e4d3b96206444e95a9c7ce98d06c55b0`;
// backup Weatherbit api key
const weatherKeyBackup = 'a4152994ae054b67974dd6044c4ef7ec';
// Mapquest api key 
const mapKey = '28oyI0GbeI2xfeMfXGihR4g2FOlIRb4p';
// variables to target html elements for the functions to use when dealing with the display of data and fetches.
var inputEl = document.querySelector('input');
var apiLon;
var apiLat;
var iceCreamCol = document.getElementById("iceCreamCol");
var weatherCol = document.getElementById("weatherCol");
var reloadBtn = document.getElementById("resetBtn");
var iceCreamBtn = document.querySelector(".storeBtn");

// checks if there is any data in the local storage and if there is it runs the weather fetch using the stored data.
function init() {
    var saveData = localStorage.getItem('postal_code');
    if (saveData) {
        weatherBtn(saveData);
    }
};


// When the weather button is clicked, this will check local storage and use the provided data to call a GET fetch from the Weatherbit Api and set the local storage if it is not there. This will also display the weather cards, the ice cream button and the try again button.
function weatherBtn(localData) {
    if (localData) {
        inputValue = localData;
    } else {
        inputValue = inputEl.value;
        localStorage.setItem('postal_code', inputValue);
    }
    var apiUrl = (`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${inputValue}&days=7&units=I&key=${weatherKeyBackup}`);
    getWeather(apiUrl);
    weatherCol.style.display = "flex";
    iceCreamBtn.style.display = "flex";
    reloadBtn.style.display = "flex";
};

// the fetch for the weather api, passes the parsed data to the showWeather function.
function getWeather(apiUrl) {
    var weatherData = fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
            var firstResponse = response.json();
            firstResponse.then(
            (data) => {
                weatherArr = data.data;
                showWeather(weatherArr, data);
                return data;
                        })
        .catch(err => console.log(err))
            }
        });
    return weatherData;
};

// loops over the Weatherbit data to display to the user and stores the postal code coordinates to use in the Mapquest api fetch. 
function showWeather(weatherArr, data) {
    for (var i = 0; i < weatherArr.length; i++) {
        console.log(i + ' is the loop count');
        console.log(weatherArr[i]);
        var daySlot = document.getElementById('day-' + i);
        var maxSlot = document.getElementById('max-' + i);
        var minSlot = document.getElementById('min-' + i);
        var days = moment(weatherArr[i].datetime).format('dddd');
        daySlot.textContent = days;
        maxSlot.textContent = ('High: ' + Math.round(weatherArr[i].max_temp));
        minSlot.textContent = ('Low: ' + Math.round(weatherArr[i].min_temp));
    };
    apiLat = Number(data.lat);
    apiLon = Number(data.lon);
};

// When ice cream button is clicked, will run the url creation for the mapquest fetch with data from the weather api fetch. Also shows the ice cream row.
function storeBtn() {
    storeSearch(apiLon, apiLat);
    iceCreamCol.style.display = "flex";
};

// assembles the url for the mapquest fetch and passes it through to the fetch function.
function storeSearch(apiLon, apiLat) {
    storeApi = `https://www.mapquestapi.com/search/v4/place?location=${apiLon}%2C%20${apiLat}&sort=distance&feedback=false&key=${mapKey}&pageSize=5&q=ice%20cream`;
    getStores(storeApi);
}

// the fetch for the mapquest api that parses and passes the data to showStores for display to the user.
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


// loops through the mapquest api data to display the store names and streets to the user
function showStores(storeArr) {
    for (var i = 0; i < storeArr.length; i++) {
        console.log(i + ' loop count');
        var storeName = document.getElementById('name-' + i);
        var location = document.getElementById('street-' + i);
        storeName.append(storeArr[i].name);
        location.append(storeArr[i].place.properties.street);
    };
};

// when the try again button is clicked, this will clear the input and local storage then reload the page.
function resetBtn() {
    localStorage.removeItem('postal_code');
    inputEl.value = '';
    location.reload();
};

// Runs every time the page loads, causes a new weatherbit api fetch if there is a postal code in localStorage 
init();