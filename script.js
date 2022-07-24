// Here's the TODO List kinda

// 1. get the data from the weather api using the user entered location and put that in local storage to use for the second API call. May want to limit it to just the next 5 or so days (because the weather forecast is never correct.)
// 2. get the data from the Mapquest api with the localStorage data from the weather API.
// 3. assign variables that target the html elements where our data will be displayed at the top of this page
// 4. create functions that look through the data and return the responses that we can then show to the user ie, "This(day) is the hottest day, eat your ice cream" or "This(day) is the coldest to buy your ice cream now" 
// 5. Make sure that the user clicking on the button starts the process with addEventListener.
// 6. Append the correct content to the HTML elements.

// Extras 
// Add in a function to store favorites and always puts them at the top.
// Make a function tied to a button to math in the humidity for the true hottest/coldest days of the forecast. 



// user input saved to variable 
// var inputValue = whatever the user enters
var apiUrl = ('https://reqres.in/api/users');

// template fetch request to the API
 var getData = function(apiUrl){
    // take in above URL to get data 
     fetch(apiUrl)
    //  once we get the data, add a .json() to make data readable 
     .then(function (response){
        // send out the readable data 
        return response.json();
     })
     .then(function(data){
        // look at how the data can be interacted with
        console.log(data.data[0].email);              
     })  
    //  do anything we need with the data  
    //  modify/show information to user send it to html
    
};

// addEventListener goes here for button press
getData(apiUrl);

