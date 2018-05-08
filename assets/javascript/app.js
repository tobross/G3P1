//  // Initialize Firebase
//  var config = {
//     apiKey: "AIzaSyBeMkHv3bt0v0tXoc6UikMbHoZTtEMU-v0",
//     authDomain: "g3p1-66142.firebaseapp.com",
//     databaseURL: "https://g3p1-66142.firebaseio.com",
//     projectId: "g3p1-66142",
//     storageBucket: "g3p1-66142.appspot.com",
//     messagingSenderId: "127127300038"
//   };
//   firebase.initializeApp(config);

//  var database = firebase.database();



$(document).ready(function(){


  // $(".parallax").parallax();

  //   $('.sidenav').sidenav();




// Weather aPi

var zip= "";

var APIKey = "11d3ec545af75db253dcba87baa3df79";

var queryURL= "https://api.openweathermap.org/data/2.5/weather?zip=78728,us&units=imperial&appid=11d3ec545af75db253dcba87baa3df79";



"https://api.openweathermap.org/data/2.5/weather?" + "zip=" + "78728" + ",us&units=imperial" +"appid=" + APIKey;

$.ajax({
  url: queryURL,
  method: "GET"
})

.then(function(response) {
  console.log(queryURL);
  console.log(response);

  console.log("Current Temp: " + response.main.temp);

var theWeather = response.main.temp


if (response.main.temp >= "Clear") {

console.log("I work");

// img = '<img src ="../images/sun.png">';

  };


$(".info").text("Currently in " + response.name + ": " +  response.main.temp);

});
});





