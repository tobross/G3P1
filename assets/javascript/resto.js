// Initialize Firebase
var config = {
    apiKey: "AIzaSyD-om-CdRV78LyR--qwwlWmh8JsOoV9pNY",
    authDomain: "group-3-1525371162108.firebaseapp.com",
    databaseURL: "https://group-3-1525371162108.firebaseio.com",
    projectId: "group-3-1525371162108",
    storageBucket: "",
    messagingSenderId: "1057921532236"
};
firebase.initializeApp(config);


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




// var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/key=" + apiKey + "&location=" + pos + "&radius=" + distance + "&keyword=" + keyword + "&type=restaurant";


console.log(document);
$(document).on("click", "#restoSearchBtn", function () {
    event.preventDefault()


    var keyword = $("#searchTerm").val();
    var maxDistance = $("#maxDistance").val();
    var distance = maxDistance / 0.00062137;

    // function distance(valNum) {
    //     document.innerHTML=valNum/0.00062137;
    //   }


    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // var targetUrl = queryURL;

    // $.get(proxyUrl + targetUrl, function(data) {
    //     console.log(data);
    // });

    console.log('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + JSON.stringify(pos.lat) + ',' + JSON.stringify(pos.lng), '&radius=' + distance + '&keyword=' + keyword + '&type=restaurant' + '&key=' + apiKey);

    $.get(proxyUrl + 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + JSON.stringify(pos.lat) + ',' + JSON.stringify(pos.lng) + '&radius=' + distance + '&keyword=' + keyword + '&type=restaurant' + '&key=' + apiKey,
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
                }
            });
            console.log('result====>', normalizeResults)
            for (var i = 0; i < normalizeResults.length; i++) {
                
                var name = normalizeResults[i].name;
                var price_level = normalizeResults[i].price_level;
                var rating = normalizeResults[i].rating;
                var opening_hours = normalizeResults[i].opening_hours;
                var vicinity = normalizeResults[i].vicinity;
                var photo_reference = normalizeResults[i].photo_reference;

                
                console.log(name);
                console.log(price_level);
                console.log(rating);
                console.log(opening_hours);
                console.log(vicinity);
                console.log(photo_reference);
                console.log('https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=' + photo_reference + '&key=AIzaSyAK1-Fn90pNHF4kGlanbTpaWZRh7i-5E9o');

                
                
                // var p = $("<p>").text("Name:" + normalizeResults[i].name)
                // $("#name").append(p);
                // var p = $("<p>").text("Photos:" + normalizeResults[i].photos)
                // $("#photos").append(p);
                // var p = $("<p>").text("Price:" + normalizeResults[i].price_level)
                // $("#price_level").append(p);
                // var p = $("<p>").text("Rating:" + normalizeResults[i].rating)
                // $("#rating").append(p);

            }
        }
    );

}
);



// name
// opening hours
// photos
// price_level
// rating
// vicinity

// geometry
// name
// opening_hours

    //Parameters

    // var location = "15miles"


    // var rankby = distance
    // var keyword = ""
    // var minprice = ""
    // var maxprice = ""
    // var types = restaraunt
    // var price_level
    // var rating



    // var service = new google.maps.places;
    // service.nearbySearch({
    //     location: rak,
    //     radius: 5500,
    //     type: ['restuarant']
    // }, callback);

    // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=30.296170800000002,-97.73895429999999&radius=50&keyword=tacos&type=restaurant&key=AIzaSyAK1-Fn90pNHF4kGlanbTpaWZRh7i-5E9o

    //   https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyAK1-Fn90pNHF4kGlanbTpaWZRh7i-5E9o

    //  https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={%22lat%22:30.296170800000002,%22lng%22:-97.73895429999999}&radius=50&keyword=tacos&type=restaurant&key=AIzaSyAK1-Fn90pNHF4kGlanbTpaWZRh7i-5E9o

    // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=30.3008356,-97.7246229&radius=50&keyword=tacos&type=restaurant&key=AIzaSyAK1-Fn90pNHF4kGlanbTpaWZRh7i-5E9o

    // %7B%22lat%22:

    // %7B%22lat%22:

    // %7D




    // https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA9c6MZiG7rAsbixKwNJpDD5RB5U8S35fkKi0VY2cb_ZHBI75mu8gT4cb_Am5REBR8WREyPtgxuTFXYlciSZMZ54z1Os3v6mHdW8WFrpdh0sEpvZueDMeBQXlBtPqCHFjQEhCHzpiN5kKKJ1uGeT4kX2wyGhQdnaClnA_4uX5EZ0lM1gR7PuGLnw&key=AIzaSyAK1-Fn90pNHF4kGlanbTpaWZRh7i-5E9o