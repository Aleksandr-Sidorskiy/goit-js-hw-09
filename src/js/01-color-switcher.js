import '../css/common.css';

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
console.log(btnStart)

btnStart.addEventListener("click", startChangeBGcolor);
btnStop.addEventListener('click', stopChangeBGcolor);

function updateBodyBGcolor() {
const colorRandom = getRandomHexColor();
  document.body.style.backgroundColor = colorRandom;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let isInterval = null;
let isActive = false;

function startChangeBGcolor() {
    if (isActive) {
        return;
    }
  
  btnStart.disabled = true;
  btnStop.disabled = false;
  isActive = true;
  
    isInterval = setInterval(() => updateBodyBGcolor(getRandomHexColor()), 1000);
    
    console.log(isInterval);
}

function stopChangeBGcolor() {
  clearInterval(isInterval);
  
    btnStart.disabled = false;
    btnStop.disabled = true;
    isActive = false;
    
}




