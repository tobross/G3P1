   // Initialize Firebase
   $(document).ready(function () {
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

       $(document).on("click", "#thisIsATest", function () {

           //heroku workaround for Cors
           event.preventDefault();
           var apiKey = "41bafd3ec7103aeebada67a1c933a210";
           var search = $("#textForm").val();
           var queryURL = "https://food2fork.com/api/search?key=" + apiKey + "&q=" + search;
           var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
           var targetUrl = queryURL;

           $.get(proxyUrl + targetUrl, function (response) {
               var result = JSON.parse(response);
               var recipes = result.recipes;

               for (i = 0; i < 6; i++) {

                   var image = "<img class='recipePic' src='" + recipes[i].image_url + "' alt='Recipe Image'>";

                   var recipeName = recipes[i].title;

                   var recipeContent = "<a href='" + recipes[i].source_url + "'>" + recipes[i].title + "</a>";

                   var recipeRating = Math.floor(recipes[i].social_rank);

                   var link = "<a href=" + recipes[i].publisher_url + ">" + recipes[i].publisher + "</a>";

                   var recipeCard = $("<div class='card'><div class='card-image'>" + image + "<span class='card-title'>" + recipeName + "</span></div><div class='card-content'>" + recipeContent + "<br>Rating: " + recipeRating + "%" + "</div><div class='card-action'>" + link + "</div></div></div></div>");

                   $(".recipeDiv").prepend(recipeCard);
               }
           });
       });
   })