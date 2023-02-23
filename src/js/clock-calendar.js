
//! Start part 1 **************************************************************
const ourtime = document.querySelector('.time');
const ourDate = document.querySelector('.date');

let language = "en";

function showDate() {
  const date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const currentDate = date.toLocaleDateString(language, options);
  ourDate.textContent = currentDate;
}

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  ourtime.textContent = currentTime;
  showDate();
  setTimeout(showTime, 1000); 
}
showTime();
//! End part 1 ________________________________________________________________


//! Start part 2 **************************************************************
const greeting = document.querySelector('.greeting');

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let result = '';
  if (hours >= 6 && hours < 12) {
    result = 'morning';
  } 
  if (hours >= 12 && hours < 18) {
    result = 'afternoon';
  } 
  if (hours >= 18 && hours <= 24 ) {
    result = 'evening';
  } 
  if (hours >= 0 && hours < 6 ) {
    result = 'night';
  } 
  return result;
}
 
const timeOfDay = getTimeOfDay();

function showGreeting() {
  greeting.textContent = `Good ${timeOfDay},`; 
}
setInterval(showGreeting, 1000);
showGreeting();

// ! Start Local Storage
function setUserFirstName() {
  const inputName = document.querySelector('.name');

  function setLocalStorage() {
    localStorage.setItem('inputName', inputName.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)
  
  function getLocalStorage() {
    if(localStorage.getItem('inputName')) {
      inputName.value = localStorage.getItem('inputName');
    }
  }
  window.addEventListener('load', getLocalStorage)
}
setUserFirstName();

// ! End Local Storage
//! End part 2 ________________________________________________________________