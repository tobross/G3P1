$(document).ready(function(){
    var gold = "assets/images/star.png";
    var grey = "assets/images/greystar.png"
$("#one").hover(function(){
    $("#one").attr("src", gold);
}, function(){
    $("#one").attr("src", grey);
})
$("#two").hover(function(){
    $("#two").attr("src", gold);
    $("#one").attr("src", gold);
}, function(){
    $("#two").attr("src", grey);
    $("#one").attr("src", grey);
})
$("#three").hover(function(){
    $("#three").attr("src", gold);
    $("#two").attr("src", gold);
    $("#one").attr("src", gold);
}, function(){
    $("#three").attr("src", grey);
    $("#two").attr("src", grey);
    $("#one").attr("src", grey);
})
$("#four").hover(function(){
    $("#four").attr("src", gold);
    $("#three").attr("src", gold);
    $("#two").attr("src", gold);
    $("#one").attr("src", gold);
}, function(){
    $("#four").attr("src", grey);
    $("#three").attr("src", grey);
    $("#two").attr("src", grey);
    $("#one").attr("src", grey);
})
$("#five").hover(function(){
    $("#five").attr("src", gold);
    $("#four").attr("src", gold);
    $("#three").attr("src", gold);
    $("#two").attr("src", gold);
    $("#one").attr("src", gold);
}, function(){
    $("#five").attr("src", grey);
    $("#four").attr("src", grey);
    $("#three").attr("src", grey);
    $("#two").attr("src", grey);
    $("#one").attr("src", grey);
})

$(".starRating").on("click", function(event) {
    var rating = parseInt($(this).attr("value"));
    console.log(rating);
    $(".starRating").hide();
})
})