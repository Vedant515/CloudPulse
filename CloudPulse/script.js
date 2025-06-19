

  const apikey = 'd11ab01531f25c2be3bb800fe0fd545e';
  

  
  document.getElementById("city34").addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
      const city = document.getElementById("city34").value;
      checkWeatherByCity(city);
      document.querySelector("#city22").innerHTML=city;
    }
  });

  async function checkWeatherByCity(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    fetchWeatherData(apiurl);
  }

  async function checkWeatherByCoords(lat, lon) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
    fetchWeatherData(apiurl);
  }

  async function fetchWeatherData(apiurl) {
    try {
      const response = await fetch(apiurl);
      const data = await response.json();
      const weatherIcon = document.querySelector(".weather-png");

document.querySelector(".c1").innerHTML = data.clouds.all;
document.querySelector(".c2").innerHTML = data.main.humidity;
document.querySelector(".c3").innerHTML = convertUnixToTime(data.sys.sunrise);
document.querySelector(".c4").innerHTML = convertUnixToTime(data.sys.sunset);
  document.querySelector(".c5").innerHTML = data.wind.speed ;
  document.querySelector("#temp").innerHTML = Math.round(data.main.temp);
    document.querySelector("#normal").innerHTML = data.weather[0].description;
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src="https://media.discordapp.net/attachments/1366684973293371442/1384963154974605342/cloud.png?ex=6855a873&is=685456f3&hm=81d402c784cd8500747d969f56d7f52fc1bc5435cf9c330a7f930e121b72c5b0&=&format=webp&quality=lossless&width=875&height=673";
    }else if(data.weather[0].main == "Clear"){
        weatherIcon.src="https://media.discordapp.net/attachments/1366684973293371442/1384963154718625874/clear.png?ex=6855a873&is=685456f3&hm=61ffe1108f25ed75b6dc5d93b12f65f2207da74de4b750159fca24e009b01839&=&format=webp&quality=lossless&width=875&height=673";
    }else if(data.weather[0].main == "Rain"){
        weatherIcon.src="https://media.discordapp.net/attachments/1366684973293371442/1384963155486314610/rain.png?ex=6855a873&is=685456f3&hm=851b04285d53bb12fba614f278bbfa3086019cd60a434d889b5ac3159907e497&=&format=webp&quality=lossless&width=875&height=673";
    }else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src="https://media.discordapp.net/attachments/1366684973293371442/1384963155486314610/rain.png?ex=6855a873&is=685456f3&hm=851b04285d53bb12fba614f278bbfa3086019cd60a434d889b5ac3159907e497&=&format=webp&quality=lossless&width=875&height=673";
    }else if(data.weather[0].main == "Mist"){
        weatherIcon.src="https://media.discordapp.net/attachments/1366684973293371442/1384963155205161053/mist.png?ex=6855a873&is=685456f3&hm=d9b7581131b731fea98a12391628a54807e7693b8bda2ee122a72d62b76561e7&=&format=webp&quality=lossless&width=875&height=673";
    }


    } catch (error) {
      alert("Enter a valid city name or allow location access.");
      console.error("Error:", error);
    }
  }

 
  function updateDateTime() {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById("clock").textContent = timeString;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    document.getElementById("date").textContent = dateString;
  }


  function convertUnixToTime(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Run on load
  window.onload = function () {
  
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Try location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          checkWeatherByCoords(lat, lon);
        },
        error => {
          console.error("Location error:", error);
          document.querySelector(".city").textContent = " Allow location access or enter city";
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  };

