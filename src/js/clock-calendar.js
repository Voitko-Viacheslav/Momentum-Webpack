
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