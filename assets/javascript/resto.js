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
    var distance = $("#maxDistance").val();


    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // var targetUrl = queryURL;

    // $.get(proxyUrl + targetUrl, function(data) {
    //     console.log(data);
    // });

    console.log('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + JSON.stringify(pos.lat) + ',' + JSON.stringify(pos.lng), '&radius=' + distance + '&keyword=' + keyword + '&type=restaurant' + '&key=' + apiKey);

    $.get(proxyUrl + 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + JSON.stringify(pos.lat) + ',' + JSON.stringify(pos.lng) + '&radius=' + distance + '&keyword=' + keyword + '&type=restaurant' + '&key=' + apiKey,
        function (resto) {
            console.log(resto);
            // var result = JSON.parse(resto);
            // console.log("_______________________")
            // console.log(result)


            if (resto) {
                // for (i = 0; i < 10; i++) {

                //     $result.name.append(
                //         name
                //     );

                //     var name = name;


                // }
            } else {
                $events.html("<p>There are no restaraunts in your area</p>");
            }
        }
    );

}
);
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