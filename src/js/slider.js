const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

let urlImg = "github"; 

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

let bgNum
function setBg() {
  let timeOfDay = getTimeOfDay();
  bgNum = getRandomNum(1, 20).toString().padStart(2, "0");
  const image = new Image();
    const url = `https://raw.githubusercontent.com/Voitko-Viacheslav/momentum-images/assets/images/${timeOfDay}/${bgNum}.jpg`;
    image.src = url;
  // ждем полную загрузку фотографии
    image.onload = () => {
    // и только после загрузки меням стиль
      document.body.style.backgroundImage = `url(${url})`;
    };
}
setBg();

function getSlideNext() {
  if (urlImg === "github") {
    bgNum < 20 ? bgNum++ : bgNum = 1;
    setBg();
 }
}
slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
  if (urlImg === "github") {
    bgNum > 1 ? bgNum-- : bgNum = 20;
    setBg();
  }
}
slidePrev.addEventListener('click', getSlidePrev);