const apiKey = "4c965690ce744aee684b92f42ebf64fb";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");

  if (city === "") {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      weatherInfo.innerHTML = `<p>City not found. Try again.</p>`;
      document.body.className = ""; // remove weather bg
      return;
    }

    // Dynamic icon & background
    let weatherMain = data.weather[0].main.toLowerCase();
    let iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    // Change background based on weather
    document.body.className = ""; // reset
    if (weatherMain.includes("cloud")) document.body.classList.add("cloudy");
    else if (weatherMain.includes("rain")) document.body.classList.add("rainy");
    else if (weatherMain.includes("snow")) document.body.classList.add("snowy");
    else document.body.classList.add("sunny");

    weatherInfo.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${iconUrl}" alt="weather icon">
      <p><strong>${data.main.temp}°C</strong></p>
      <p>${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error fetching weather data</p>`;
    console.error(error);
  }
}
