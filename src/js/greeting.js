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

// TODO Start Local Storage
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
// TODO End Local Storage
