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

        console.log(response)
    
        var wxDiv = $("<div>");
        var city = response.name;
        var country = response.sys.country
        var pOne = $("<p>").text("City: " + city + ", " + country);
        var wind = response.wind.speed;
        var pTwo = $("<p>").text("Wind Speed: " + wind + "mph");
        var tempF = (response.main.temp - 273.15) * 1.80 + 32
        var pThree = $("<p>").text("Temp: " + tempF + " (F)")
        var humidity = response.main.humidity
        var pFour = $("<p>").text("Humidity: " + humidity + "%")
        //
        var iconCode = response.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        //
        console.log(iconCode)
        
        
        
        
        //var date = response.dt
        
        
        
        wxDiv.append(pOne);
        wxDiv.append(pTwo);
        wxDiv.append(pThree);
        wxDiv.append(pFour);
        // wxDiv.append(pSix);
      $("#weather").prepend(wxDiv);
      $('#wicon').attr('src', iconUrl);
    
      })
    })
        
$("#button").on("click", function() {
      



var cityName = $("input:text").val();
 document.getElementById("weather-input").innerHTML = cityName; 
 // Here we are building the URL we need to query the database
 var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37" + "&appid=" + APIKey;
//   "q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;

          
      
    $.ajax({
    url: queryURL,
    method: "GET"
    })
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
   })})



// FIVE DAY FORECAST

$("#button").on("click", function() {

  var cityName = $("input:text").val();
  document.getElementById("weather-input").innerHTML = cityName; 
  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
  // "q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;
  

    $.ajax({
      url: queryURL,
      method: "GET"
    })


      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        // console.log(queryURL);

        // Log the resulting object
        // console.log(response);
        
      })})