document.getElementById("search-button").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("city-input").value;
  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  const apiKey = "f3b3299107c49c7e27178ee9d98bab70"; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
    changeBackground(data.weather[0].main);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  document.getElementById("city-name").textContent = `Weather in ${data.name}`;
  document.getElementById(
    "temperature"
  ).textContent = `Temperature: ${data.main.temp} °C`;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.main.humidity} %`;
  document.getElementById(
    "wind-speed"
  ).textContent = `Wind Speed: ${data.wind.speed} m/s`;

  const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  document.getElementById(
    "weather-icon"
  ).innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;

  document.querySelector(".weather-info").style.display = "block";
  document.querySelector(".welcome-message").style.display = "none";
}

function changeBackground(weather) {
  const body = document.body;
  const container = document.querySelector(".container");
  switch (weather.toLowerCase()) {
    case "clear":
      body.style.backgroundImage = "url('sunny.jpg')";
      container.style.background = "rgba(255, 255, 255, 0.8)";
      break;
    case "clouds":
      body.style.backgroundImage = "url('cloudy.jpg')";
      container.style.background = "rgba(255, 255, 255, 0.8)";
      break;
    case "rain":
      body.style.backgroundImage = "url('rainy.jpg')";
      container.style.background = "rgba(255, 255, 255, 0.8)";
      break;
    case "snow":
      body.style.backgroundImage = "url('snowy.jpg')";
      container.style.background = "rgba(255, 255, 255, 0.8)";
      break;
    case "thunderstorm":
      body.style.backgroundImage = "url('stormy.jpg')";
      container.style.background = "rgba(255, 255, 255, 0.8)";
      break;
    default:
      body.style.backgroundImage = "url('normal.jpg')";
      container.style.background = "rgba(255, 255, 255, 0.8)";
      break;
  }
}
