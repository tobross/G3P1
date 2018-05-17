 // Initialize Firebase
 $(document).ready(function () {
     var starDiv = "<br><br><div class='stars'><img class='starRating one' id='one' src='assets/images/greystar.png' alt='1' value='1'><img class='starRating two' id='two' src='assets/images/greystar.png' alt='2' value='2'><img class='starRating three' id='three' src='assets/images/greystar.png' alt='3' value='3'><img class='starRating four' id='four' src='assets/images/greystar.png' alt='4' value='4'><img class='starRating five' id='five' src='assets/images/greystar.png' alt='5' value='5'></div>"
     var stars = function () {
         var gold = "assets/images/star.png";
         var grey = "assets/images/greystar.png";
         $(".one").hover(function () {
             $(".one").attr("src", gold);
         }, function () {
             $(".one").attr("src", grey);
         })
         $(".two").hover(function () {
             $(".two").attr("src", gold);
             $(".one").attr("src", gold);
         }, function () {
             $(".two").attr("src", grey);
             $(".one").attr("src", grey);
         })
         $(".three").hover(function () {
             $(".three").attr("src", gold);
             $(".two").attr("src", gold);
             $(".one").attr("src", gold);
         }, function () {
             $(".three").attr("src", grey);
             $(".two").attr("src", grey);
             $(".one").attr("src", grey);
         })
         $(".four").hover(function () {
             $(".four").attr("src", gold);
             $(".three").attr("src", gold);
             $(".two").attr("src", gold);
             $(".one").attr("src", gold);
         }, function () {
             $(".four").attr("src", grey);
             $(".three").attr("src", grey);
             $(".two").attr("src", grey);
             $(".one").attr("src", grey);
         })
         $(".five").hover(function () {
             $(".five").attr("src", gold);
             $(".four").attr("src", gold);
             $(".three").attr("src", gold);
             $(".two").attr("src", gold);
             $(".one").attr("src", gold);
         }, function () {
             $(".five").attr("src", grey);
             $(".four").attr("src", grey);
             $(".three").attr("src", grey);
             $(".two").attr("src", grey);
             $(".one").attr("src", grey);
         })
     }
     var clicky = function () {
         $(document).on("click", ".starRating", function () {
             var rating = parseInt($(this).attr("value"));
             var cardID = $(this).parent().parent().parent().attr("data-cardid");
             var count;
             database.ref("/" + cardID + "/Count").on("value", function (snapshot) {
                 if (snapshot.val()) {
                     count = snapshot.val();
                     count++;
                 } else {
                     count = 1;
                 }
             });

             var ratingBlob;
             database.ref("/" + cardID + "/Rating").on("value", function (snapshot) {
                 if (snapshot.val()) {
                     ratingBlob = snapshot.val();
                     ratingBlob += rating;
                     blobMath();
                 } else {
                     ratingBlob = 0 + rating;
                     blobMath();
                 }
             }, function (error) {
                 console.log("the error: " + error);
             })
             var blobRating;

             function blobMath() {
                 blobRating = ratingBlob / count;
             };

             database.ref("/" + cardID).set({
                 Current: blobRating,
                 Rating: ratingBlob,
                 Count: count
             })
             $(this).parents(".stars").hide();
         })
     }
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

     database.ref("/").on("value", function (snapshot) {
         console.log(snapshot.val());
     }, function (error) {
         console.log("the error: " + error);
     });
     var apiKey = "AIzaSyAK1-Fn90pNHF4kGlanbTpaWZRh7i-5E9o";
     var pos;

     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             pos = {
                 lat: position.coords.latitude,
                 lng: position.coords.longitude
             };

             console.log(pos);

         }, function () {
             handleLocationError(true, infoWindow, map.getCenter());
         });
     } else {
         // Browser doesn't support Geolocation
         handleLocationError(false, infoWindow, map.getCenter());
     }
     
    
        //  Vegas 
        
        $("body").vegas({
            slides: [
                { src:"assets/images/citybonnets.jpg"},
                { src:"assets/images/skyline.jpg"},
                { src:"assets/images/lake.jpg"},
                { src:"assets/images/nights.jpg"},
                { src:"assets/images/cota.jpg"}
                ],
                transition: [ 'fade', 'zoomOut', 'blur' ]
        });


// Weather aPi

var now = moment().format('LLL');

var nowTime = moment().format('h:mma');
var nightTime = moment('6:00pm', 'h:mma');

var backChange = (moment().isSameOrAfter(moment(nightTime)));
console.log("Is it after 6pm? -- " + backChange);

     // Weather code.
     var zip = 78705;
     var weatherKey = "11d3ec545af75db253dcba87baa3df79";
     var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&units=imperial&appid=11d3ec545af75db253dcba87baa3df79";


     "https://api.openweathermap.org/data/2.5/weather?" + "zip=" + zip + ",us&units=imperial" + "appid=" + weatherKey;

     $.ajax({
             url: queryURL,
             method: "GET"
         })
    

        .then(function (response) {

            var theWeather = Math.ceil(response.main.temp);
            // console.log(theWeather + " I am a rounded temp");
        
            var theClouds = response.weather[0].main;
        
            // console.log(queryURL);
            // console.log(response);
            // console.log("Current Temp: " + theWeather  + ' \xB0F.');
            console.log("Skies: " + theClouds);
        
            if (theClouds === "Clear") {
              // console.log("If statement works - it's clear");
              img = "<img class='sun'id='bright' src ='assets/images/sun.png' >";
        
              $(".card-image").prepend(img);
        
            } if (theClouds === "Clear" && backChange === true) {
        
              img6 = "<img class='sun' id='night' src ='assets/images/clearnight.png'>";
        
                 $(".card-image").html(img6);
                 $(".card-image").css("img", "display:none");
        
        
            } else if (theClouds == "Rain") {
              // console.log("If statement works - it's rainy");
        
              img2 = "<img class='sun' src ='assets/images/rain.jpg' >";
        
              $(".card-image").html(img2);
        
            } else if (theClouds == "Thunderstorm") {
              // console.log("If statement works - THUNDAH");
        
              img3 = "<img class='sun' src ='assets/images/thunder.png' >";
        
              $(".card-image").prepend(img3);
        
            } else if (theClouds == "Mist") {
              //  console.log("If statement works - it's foggy");
        
              img4 = "<img class='sun' src ='assets/images/fog.png' >";
        
              $(".card-image").prepend(img4);
        
            } else if (theClouds == "Clouds") {
              // console.log("If statement works - it's Cloudy");
        
              img5 = "<img class='clouds' src ='assets/images/cloudy.png' >";
        
              $(".card-image").prepend(img5);
        
        
        
            } if (backChange === true) {
        
              $("#cardWeather").css("background-image", " linear-gradient(to top, #30cfd0 0%, #330867 100%)")
              $("#city").css("color", "whitesmoke")
              $("#temp").css("color", "whitesmoke")
        
            }
        
            // city  name in card-title
            $(".card-stacked").html("<p> " + response.name + "</p>");
            // weather info in card-content
            $(".card-content").html("<p><h4>" + theWeather + ' \xB0F' + "</h4></p>" + "<p><h7> " + now + "</h7></p>");
        
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
                 if (res.events.length) {
                     var s = "";
                     for (var i = 0; i < res.events.length; i++) {
                         var event = res.events[i];
                         var eventTime = moment(event.start.local).format('M/D/YYYY h:mm A');
                         if (event.logo) {
                             var eventImage = "<img id='recipePic' src='" + event.logo.url + "' alt='EventLogo'>";

                         } else {
                             res.events[-1];
                         }
                         if (event.is_free) {
                             var free = "Free!";
                         } else {
                             var free = "Paid";
                         }
                         var eventID = res.events[i].id;
                         database.ref("/" + eventID + "/Current").on("value", function (snapshot) {
                            if (snapshot.val()) {
                                currentRating = snapshot.val();
                            } else {
                                currentRating = 4.5;
                            }
                        });
                         var event = "<a href='" + event.url + "'>" + event.name.text + "</a>";
                         var eventLink = "<a href='" + event.url + "><span>" + event.name + "</span></a>";
                         var eventCard = $("<div class='card' data-cardId='" + eventID + "'><div class='card-image'>" + eventImage + "<span class='card-title'>" + free + "</span></div><div class='card-content'>" + event + "<br><br>" + eventTime + "<br><br>Rate It!" + starDiv + "</div>" + "<div class='currentRating'>" + "<span>" + "RoS User Rating: " + currentRating + "</span>" + "</div>");
                        //appending each card.
                         $eventDiv.append(eventCard);
                         //stars hover function.
                         stars();
                     }
                     clicky();
                 }
             })
     });
     $(document).on("click", "#eatOut", function () {
         $("#foodPage").addClass("hide");
         $("#restaurantFinder").removeClass("hide");

         $(document).on("click", "#restoSearchBtn", function () {
             event.preventDefault();

             var keyword = $("#searchTerm").val();
             var maxDistance = $("#maxDistance").val();
             //distance converted into miles from meters.
             var restoDistance = maxDistance / 0.00062137;
             var proxyURL = "https://cors-anywhere.herokuapp.com/";
             var restoKey = "AIzaSyAK1-Fn90pNHF4kGlanbTpaWZRh7i-5E9o";
             // make API call.
             $.get(proxyURL + 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + JSON.stringify(pos.lat) + ',' + JSON.stringify(pos.lng) + '&radius=' + restoDistance + '&keyword=' + keyword + '&type=restaurant' + '&key=' + restoKey,
                 function (res) {
                     var results = res.results

                     var normalizeResults = results.map(result => {
                         return {
                             name: result.name,
                             opening_hours: result.opening_hours,
                             photos: result.photos,
                             price_level: result.price_level,
                             rating: result.rating,
                             vicinity: result.vicinity,
                             photo_reference: result.photos[0].photo_reference,
                             id: result.place_id
                         }
                     });
                     for (var i = 0; i < normalizeResults.length; i++) {
                         var restoIcon = "<img src='assets/images/restaurant.png' alt='icon'>"
                         var restoName = normalizeResults[i].name;
                         var price_level = [];
                         for (x = 0; x < parseInt(normalizeResults[i].price_level); x++) {
                             price_level.push("<img src='assets/images/money.png' alt='money' style='width:20px'>");
                         };
                         var restoOC;
                         if (normalizeResults[i].opening_hours.open_now == true) {
                             restoOC = "Open";
                             $(".card-title").attr("style", "color:orange !important;")
                         } else {
                             restoOC = "Closed";
                             $(".card-title").attr("style", "color:green !important;")
                         };
                         var restoID = normalizeResults[i].id;
                         var rating = normalizeResults[i].rating;
                         var currentRating;
                         database.ref("/" + restoID + "/Current").on("value", function (snapshot) {
                             if (snapshot.val()) {
                                 currentRating = snapshot.val();
                             } else {
                                 currentRating = 4.5;
                             }
                         });
                         var opening_hours = normalizeResults[i].opening_hours;
                         var vicinity = normalizeResults[i].vicinity;
                         var restoImage = "<img src='" + "https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=" + normalizeResults[i].photo_reference + "&key=AIzaSyAK1-Fn90pNHF4kGlanbTpaWZRh7i-5E9o" + "' alt='restoImage'>"
                         //   "https://googleapis.com/maps/place/photo?maxwidth=200&photoreference="+normalizeResults[i].photo_reference+"&key="+restoKey;


                         var restoCard = $("<div class='card col s12 m6 l12' data-cardId='" + restoID + "'><div class='card-image' style='max-height:100px'>" + restoImage + "<span class='card-title' style='#'>" + restoOC + "</span></div><div class='card-content'>" + restoName + "<br>" + price_level + "<br>Location:<br> " + "<a href='" + "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=" + restoID + "'>" + vicinity + "</a> <br>Rate It!" + starDiv + "</div>" + "<div class='currentRating'>" + "<span>" + "RoS User Rating: " + currentRating + "</span>" + "</div>");
                         // console.log(currentRating);


                         $(".restoDiv").prepend(restoCard);
                         stars();

                     }
                     clicky();

                 })


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

                     var recipeID = recipes[i].recipe_id;
                     database.ref("/" + recipeID + "/Current").on("value", function (snapshot) {
                        if (snapshot.val()) {
                            currentRating = snapshot.val();
                        } else {
                            currentRating = 4.5;
                        }
                    });


                     var recipeCard = $("<div class='card col s6 m6 l12' data-cardID='" + recipeID + "'><div class='card-image'>" + image + "<span class='card-title'>" + recipeName + "</span></div><div class='card-content'>" + recipeContent + "<br><br>Rating: " + recipeRating + "%<br><br>" + link + "<br><br>" + "Rate It!" + starDiv + "</div>" + "<div class='currentRating'>" + "<span>" + "RoS User Rating: " + currentRating + "</span>" + "</div>");

                     clicky();

                     $(".recipeDiv").prepend(recipeCard);
                     stars();
                 }
             })
         });

     })
 });

 $(document).on("click", "#eatOut", function () {
     $("#foodPage").addClass("hide");
     $("#restaurantFinder").removeClass("hide");
 })