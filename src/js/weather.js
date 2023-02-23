const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error')


let language = 'en'
// Получаю все данные для вывода
async function getWeather() {
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=b98fcdb472724a89f5211d6c08df43d5&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  // Если ввести ошибку 
  if (data.cod === '404') weatherError.textContent = `Error! City not found for '${city.value}'!`;
  if (data.cod === '400') weatherError.textContent = `Error! Field is empty`;
  if (data.cod !== 200) {
    weatherIcon.classList.remove('weather-icon');
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }

  // Если ввести правильно
  weatherIcon.className = 'weather-icon owf'; //Этой строкой мы удаляем все лишние классы перед добавлением нового, чтобы иконка погоды обновлялась корректно.
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.floor(data.main.temp)} °C`;
  wind.textContent = (language === "en") ? `Wind speed: ${Math.floor(data.wind.speed)} m/s` : `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
  humidity.textContent = (language === "en") ? `Humidity: ${Math.floor(data.main.humidity)} %` : `Влажность: ${Math.floor(data.main.humidity)} %`;
  weatherDescription.textContent = data.weather[0].description;
}


// TODO Start Local Storage
function setLocalStorageWeather() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageWeather)

// В начале вывожу Minsk запуская для него getWeather();
function getLocalStorageWeather() {
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
    city.value = 'Minsk';
  }
  getWeather();
}
window.addEventListener('load',getLocalStorageWeather)
// TODO End Local Storage


// При условии нажатия на Enter запускаю getWeather();
function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getLocalStorageWeather);
// Вещаю слушатель на keypress и запускаю setCity
city.addEventListener('keypress', setCity);


