$(document).ready(function() {
  $("#weatherButton").on("click", function() {
    var searchValue = $("#weather-input").val();

    // clear input box
    $("#weather-input").val("");

    searchWeather(searchValue);
  });

  $(".history").on("click", "li", function() {
    searchWeather($(this).text());
  });

  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
  }

  function searchWeather(searchValue) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=8e03668d7e9ea45db9f3e50290b81597&units=imperial",
      dataType: "json",
      success: function(data) {

        if (history.indexOf(searchValue) === -1) {
          history.push(searchValue);
          window.localStorage.setItem("history", JSON.stringify(history));
    
          makeRow(searchValue);
        }
        
        $("#today").empty();

        var name = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
        var hum = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
        var cardBody = $("<div>").addClass("card-body");
        var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

      
        name.append(img);
        cardBody.append(name, temp, hum, wind);
        card.append(cardBody);
        $("#today").append(card);

      
        getForecast(searchValue)
        getUVIndex(data.coord.lat, data.coord.lon);
      }
    });
  }

function getForecast(searchValue) {
  $.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=8e03668d7e9ea45db9f3e50290b81597&units=imperial",
    dataType: "json",
    success: function(data) {
        
        $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

        for (var i = 0; i < data.list.length; i++) {
    
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            
            
            var col = $("<div>").addClass("col-md-2");
            var card = $("<div>").addClass("card");
            var body = $("<div>").addClass("card-body p-2");
            var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
            var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
            var pOne = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
            var pTwo = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");

          
            col.append(card.append(body.append(title, img, pOne, pTwo)));
            $("#forecast .row").append(col);
          }
        }
      }
    });
  }


function getUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/uvi?appid=7ba67ac190f85fdba2e2dc6b9d32e93c&lat=" + lat + "&lon=" + lon,
      dataType: "json",
      success: function(data) {
        var uv = $("<p>").text("UV Index: ");
        var btn = $("<button>").addClass("btn").text(data.value);
        
        $("#today .card-body").append(uv.append(btn));
      }
    });
  }



  var history = JSON.parse(window.localStorage.getItem("history")) || [];

  if (history.length > 0) {
    searchWeather(history[history.length-1]);
  }

  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }
});