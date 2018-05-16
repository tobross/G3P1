 // Initialize Firebase
 $(document).ready(function () {
     var starDiv = "<br><br><div class='stars'><img class='starRating one' id='one' src='assets/images/greystar.png' alt='1' value='1'><img class='starRating two' id='two' src='assets/images/greystar.png' alt='2' value='2'><img class='starRating three' id='three' src='assets/images/greystar.png' alt='3' value='3'><img class='starRating four' id='four' src='assets/images/greystar.png' alt='4' value='4'><img class='starRating five' id='five' src='assets/images/greystar.png' alt='5' value='5'></div>"
     var stars = function() {
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
                         var event = "<a href='" + event.url + "'>" + event.name.text + "</a>";
                         var eventLink = "<a href='" + event.url + "><span>" + event.name + "</span></a>";
                         var eventCard = $("<div class='card' data-cardId='" + eventID + "'><div class='card-image'>" + eventImage + "<span class='card-title'>" + free + "</span></div><div class='card-content'>" + event + "<br><br>" + eventTime + "<br><br>Rate It!" +starDiv + "</div>");
                         //star hover function.
                        
                         $eventDiv.append(eventCard);
                         stars();
                     }
                 }
                 var rating;
                 $(document).on("click", ".starRating", function () {
                     rating = parseInt($(this).attr("value"));
                     var cardID;
                     database.ref("/" + eventID).set({
                         Rating: rating
                     })

                     $(this).parents(".stars").hide();
                 })
                 //  database.ref("/" + eventID).on("value", function (snap) {
                 //      if (snap.child("Rating").exists()) {
                 //          var ratingArray = [];
                 //          ratingArray.push(snap.val().Rating);
                 //          console.log(ratingArray);
                 //         //  ratingArray.push(rating);
                 //          database.ref("/" + eventID).set({
                 //              Rating: ratingArray
                 //          })
                 //  } else {
                 //      database.ref("/" + eventID).set({
                 //          Rating: [rating]
                 //      })
                 //  })
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
                     console.log("result=====>", normalizeResults);
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
                            $(".card-title").attr("style", "color:green !important;")
                        }
                        else {
                            restoOC = "Closed";
                            $(".card-title").attr("style", "color:green !important;")
                        };
                         var rating = normalizeResults[i].rating;
                         var opening_hours = normalizeResults[i].opening_hours;
                         var vicinity = normalizeResults[i].vicinity;
                         var restoImage = "<img src='"+"https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=" + normalizeResults[i].photo_reference + "&key=AIzaSyAK1-Fn90pNHF4kGlanbTpaWZRh7i-5E9o"+"' alt='restoImage'>"
                        //   "https://googleapis.com/maps/place/photo?maxwidth=200&photoreference="+normalizeResults[i].photo_reference+"&key="+restoKey;
                         var restoID = normalizeResults[i].id

                         var restoCard = $("<div class='card' data-cardId='" + restoID + "'><div class='card-image' style='max-height:200px'>" + restoImage + "<span class='card-title' style='#'>" + restoOC + "</span></div><div class='card-content'>" + restoName + "<br>" + price_level + "<br>Location:<br> " + "<a href='"+"https://www.google.com/maps/search/?api=1&query=Google&query_place_id="+restoID +"'>"+vicinity+"</a> <br>Rate It!" + starDiv + "</div>");

                        
                         $(".restoDiv").prepend(restoCard);
                         stars();
                         
                     }

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

                     var recipeCard = $("<div class='card' data-cardID='" + recipeID + "'><div class='card-image'>" + image + "<span class='card-title'>" + recipeName + "</span></div><div class='card-content'>" + recipeContent + "<br><br>Rating: " + recipeRating + "%<br><br>" + link + "<br><br>" + "Rate It!" + starDiv + "</div>");
                    
                     $(document).on("click", ".starRating", function () {
                         var rating = parseInt($(this).attr("value"));
                         var cardID;
                         database.ref().push({
                             ID: recipeID,
                             Rating: rating
                         })
                         $(this).parents(".stars").hide();
                     })
                     

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