const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

let call = 0;
import json from '../assets/englishquote.json';
let quoteslanguages = json; 

function getQuotes() {  
  quote.textContent = quoteslanguages[call].text;
  author.textContent = quoteslanguages[call].author;
}

let max = 20;
let min = 1;


function randomQuotes() {
  call = Math.floor(Math.random() * (max - min) + min);
  console.log(call)
  getQuotes();
};

changeQuote.addEventListener('click', randomQuotes);
window.onload = randomQuotes();