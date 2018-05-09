 // Initialize Firebase
$(document).ready(function () {
  $("#landing").removeClass("hide");
  var config = {
    apiKey: "AIzaSyBeMkHv3bt0v0tXoc6UikMbHoZTtEMU-v0",
    authDomain: "g3p1-66142.firebaseapp.com",
    databaseURL: "https://g3p1-66142.firebaseio.com",
    projectId: "g3p1-66142",
    storageBucket: "g3p1-66142.appspot.com",
    messagingSenderId: "127127300038"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Weather code.
  var zip = 78660;
  var weatherKey = "11d3ec545af75db253dcba87baa3df79";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&units=imperial&appid=11d3ec545af75db253dcba87baa3df79";



  "https://api.openweathermap.org/data/2.5/weather?" + "zip=" + zip + ",us&units=imperial" + "appid=" + weatherKey;

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function (response) {
      console.log("Current Temp: " + response.main.temp);
      var theWeather = response.main.temp
      //temp currently.
      $(".info").text("Currently in " + response.name + ": " + response.main.temp);
    });
  //to food page.
  $(document).on("click", "#food", function () {
    $("#landing").addClass("hide");
    $("#foodPage").removeClass("hide");
  })
  //to activities page.
  $(document).on("click", "#activities", function () {
    $("#landing").addClass("hide");
    $("#activitiesPage").removeClass("hide");
  })
  //beginning of event code.
  var token = 'DMQKETLG6NYVC2DVFB42';
  var timeFrame = "tomorrow";
  var eventZip;
  $(document).on("click", ".time", function (event) {
    event.preventDefault();
    // In this case, the "this" keyword refers to the button that was clicked
    distance = parseInt($("#distance").val());
    timeFrame = $(this).attr("time-frame");
    var $eventDiv = $("#eventDiv");
    eventZip = parseInt($("#zipcode").val());
    $.get('https://www.eventbriteapi.com/v3/events/search/?token=' + token + '&expand=venue' + '&location.address=' + eventZip + '&location.within=' + distance + 'mi' + '&price=free' + '&start_date.keyword=' + timeFrame,
      function (res) {
        console.dir();
        if (res.events.length) {
          var s = "";
          for (var i = 0; i < res.events.length; i++) {
            var event = res.events[i];
            var eventTime = moment(event.start.local).format('M/D/YYYY h:mm A');
            if (event.logo) {
              var eventImage = "<img id='recipePic' src='" + event.logo.url + "' alt='EventLogo'>";
            } else {
              var eventImage = "<img id='recipePic' src='" + "assets/images/eventbrite-logo-dribble.gif'";
            }
            if (event.is_free) {
              var free = "Free!";
            } else {
              var free = "Paid";
            }
            var event = "<a href='" + event.url + "'>" + event.name.text + "</a>";
            var eventLink = "<a href='" + event.url + "><span>" + event.name + "</span></a>";
            var eventCard = $("<div class='card'><div class='card-image'>" + eventImage + "<span class='card-title'>" + free + "</span></div><div class='card-content'>" + event + "<br><br>" + eventTime + "</div>")

            $eventDiv.append(eventCard);
          }
        }
      })
  });
  $(document).on("click", "#eatIn", function () {
    $("#foodPage").addClass("hide");
    $("#recipeFinder").removeClass("hide");

    $(document).on("click", "#findRecipe", function () {

      //heroku workaround for Cors
      event.preventDefault();
      var recipeKey = "41bafd3ec7103aeebada67a1c933a210";
      var search = $("#recipeForm").val();
      var queryURL = "https://food2fork.com/api/search?key=" + recipeKey + "&q=" + search;
      var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      var targetUrl = queryURL;

      $.get(proxyUrl + targetUrl, function (response) {
        var result = JSON.parse(response);
        var recipes = result.recipes;
        var recipeCount = parseInt($("#recipeCount").val());
        for (i = 0; i < recipeCount; i++) {

          var image = "<img class='recipePic' src='" + recipes[i].image_url + "' alt='Recipe Image'>";

          var recipeName = recipes[i].title;

          var recipeContent = "<a href='" + recipes[i].source_url + "'>" + recipes[i].title + "</a>";

          var recipeRating = Math.floor(recipes[i].social_rank);

          var link = "<a href=" + recipes[i].publisher_url + ">" + recipes[i].publisher + "</a>";

          var recipeCard = $("<div class='card'><div class='card-image'>" + image + "<span class='card-title'>" + recipeName + "</span></div><div class='card-content'>" + recipeContent + "<br><br>Rating: " + recipeRating + "%<br><br>" + "<div class='card-action'>" + link + "</div></div></div></div>");

          $(".recipeDiv").prepend(recipeCard);
        }
      })
    });
  })
});
$(document).on("click", "#eatOut", function () {
  $("#foodPage").addClass("hide");
  $("#restaurantFinder").removeClass("hide");
})