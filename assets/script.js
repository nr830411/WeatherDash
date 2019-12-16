    // function displayWXInfo() {
    var APIKey = "8e03668d7e9ea45db9f3e50290b81597";
    
    // Function to get input field text
    $("#button").on("click", function() {

      var cityName = $("input:text").val();
        document.getElementById("weather-input").innerHTML = cityName; 

      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log(queryURL);
        console.log(response);
    
        var wxDiv = $("<div>");
        var city = response.name;
        var pOne = $("<p>").text("City: " + city);
        var wind = response.wind.speed;
        var pTwo = $("<p>").text("Wind Speed: " + wind);
        
        
        wxDiv.append(pOne);
        console.log(city)
        wxDiv.append(pTwo);
        console.log(wind)

      $("#weather").prepend(wxDiv)
    
      })
    })
    
        // var hummidDiv = $("<div class='weather'>");
    
        // var tempDiv = $("<div class='weather'>");
        
        // var uvDiv = $("<div class='weather'>");