// Test JavaScript to retrieve information from EventBrite for Group Project 1

$(document).ready(function() {
    /*Anonymous access OAuth token*/
          var token = 'DMQKETLG6NYVC2DVFB42';
          var timeFrame = "tomorrow";
          $("button").on("click", function() {
            // In this case, the "this" keyword refers to the button that was clicked
            timeFrame = $(this).attr("time-frame");
             console.log(timeFrame);

          var $events = $("#events");
          
          $events.html("<i>Loading events, please stand by...</i>");
      $.get('https://www.eventbriteapi.com/v3/events/search/?token='+token+'&expand=venue'+'&location.address=78613'+'&location.within=10mi'+'&price=free'+'&start_date.keyword='+timeFrame, 
      function(res) {
              if(res.events.length) {
                  var s = "";
                  for(var i=0;i<res.events.length;i++) {
                      var event = res.events[i];
                      var eventTime = moment(event.start.local).format('M/D/YYYY h:mm A');
                      console.dir(event);
                      //console.log(event.logo.url);
                      if (event.logo) {
                          var eventImage = "<img src='" + event.logo.url + "' alt='EventLogo'>";
                      }
                      else {var eventImage = "<img src='" + "assets/images/eventbrite-logo-dribble.gif'";
                      }
                      s += "<div class='eventList'>";
                      s += "<h3><a href='" + event.url + "'>" + event.name.text + "</a></h3>";
                      s += "<p><b>Location: " + event.venue.address.address_1 + "</b><br/>";
                      s += "<b>Date/Time: " + eventTime + "</b></p>";
                      s += "<b>Logo: " + eventImage + "</b><br/>";
                      s += "<p><b>is_free: " + event.is_free + "<b><br/>";
                      s += "</div>";
                  }
                  $events.html(s);
              } else {
                  $events.html("<p>Sorry, there are no upcoming events.</p>");
              }
          });
      }); 
});//ready.function
    