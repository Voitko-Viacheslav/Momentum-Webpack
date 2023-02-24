// Импорт треков
import playList from '../playList.js';


// Для Webpack смог сделать работу песен с помощью import
import soundfile1 from '../assets/sounds/Aqua Caelestis.mp3'; 
let sound1 = new Audio(soundfile1);

import soundfile2 from '../assets/sounds/Ennio Morricone.mp3'; 
let sound2 = new Audio(soundfile2);

import soundfile3 from '../assets/sounds/River Flows In You.mp3'; 
let sound3 = new Audio(soundfile3);

import soundfile4 from '../assets/sounds/Summer Wind.mp3'; 
let sound4 = new Audio(soundfile4);

// Array songs
let arrayMusic = [sound1, sound2, sound3, sound4];


const play = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');

let isPlay = false;
let playNum = 0;

const songTitle = document.querySelector('.song-title');
songTitle.textContent = playList[playNum].title;


// Create player
const audio = document.querySelector('.audio');
function playAudio() {
  audio.src = arrayMusic[playNum].src;
  audio.currentTime = 0;
  setInterval(updateProgressValue, 500);
  songTitle.textContent = playList[playNum].title;
  // start and stop player
  if (!isPlay) {
    liAllMarker[playNum].classList.add("sound-active")
    audio.play();
    play.classList.add('pause')
    isPlay = true;
 } else {
    audio.pause();
    play.classList.remove('pause')
    isPlay = false;
 }
}
// start function playAudio
play.addEventListener('click', playAudio)



// next Track
function myNextSong() {
  playNum++;
  if (playNum > arrayMusic.length - 1) {
    playNum = 0;
  }
  isPlay = false
  playAudio();
  soundNextActive();
}
playNextBtn.addEventListener('click', myNextSong);


//  previous Track
function myPrevSong() {
  playNum --;
  if (playNum < 0) {
    playNum = arrayMusic.length - 1;
  }
  isPlay = false
  playAudio()
  soundPrevActive()
}
playPrevBtn.addEventListener('click', myPrevSong);



// add Li in playList
const myPlayListMusic = document.querySelector('.play-list')
for( let i = 0; i < playList.length; i++ ) {
  let li = document.createElement('li');
  li.textContent = playList[i].title;
  myPlayListMusic.append(li);
} 


// add Marker
const liAllMarker = document.querySelectorAll('.play-list li');
liAllMarker.forEach(elem => {
   elem.classList.add("play-item");
});


// Active song
function soundNextActive() {
    if (playNum < arrayMusic.length && playNum > 0) {
      liAllMarker[playNum - 1].classList.remove("sound-active");
    } else {
      liAllMarker[arrayMusic.length -1].classList.remove("sound-active");
    }
}


// Active song
function soundPrevActive() {
  if (playNum === (arrayMusic.length - 1)) {
    liAllMarker[0].classList.remove("sound-active");
  } else {
    liAllMarker[playNum + 1].classList.remove("sound-active");
  }
}



const progressBar = document.querySelector('.progress-bar');
const durationTime = document.querySelector('.duration-time');
const currentTime = document.querySelector('.current-time');
currentTime.textContent = "0:00";
durationTime.textContent = "0:00";


// counts time
function updateProgressValue() {
  durationTime.textContent = (formatTime(audio.duration));
  currentTime.textContent = (formatTime(audio.currentTime));
}


// counts time
function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10) {
     sec = `0${sec}`;
  };
  return `${min}:${sec}`;
}

// progress bar
const progress = document.querySelector('.progress')
function updateProgress(data) {
   const { duration, currentTime } = data.srcElement
   const progressPercent = (currentTime / duration) * 100;
   progress.style.width = `${progressPercent}%`;
}
audio.addEventListener('timeupdate', updateProgress);


// active progress bar
function setProgress(data) {
  const width = this.clientWidth;
  const clickX = data.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
progressBar.addEventListener('click', setProgress);


// Sound
const volumeOnOff = document.querySelector('.audio-on');
function volumeOff() {
   volumeOnOff.classList.toggle('audio-off');
   progressVolume.classList.toggle('progress-volume');
   if (audio.muted === true) {
      audio.muted = false;
   } else {
      audio.muted = true;
   }
}
volumeOnOff.addEventListener('click', volumeOff);


// Active sound
const volumeBar = document.querySelector('.volume-bar');
const progressVolume = document.querySelector('.progress-volume');
progressVolume.style.width = '50%';
audio.volume = 0.5;
function audioVolume(elem) {
   const width = this.clientWidth;
   const clickX = elem.offsetX;
   const volume = (clickX / width);
   progressVolume.style.width = `${clickX}px`;
   audio.volume = volume;
}
volumeBar.addEventListener('click', audioVolume);


// Auto play
audio.addEventListener('ended', function () {
  myNextSong();
});
