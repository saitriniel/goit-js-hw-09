const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);
let timerId = null;


function onStartClick () {
    timerId = setInterval(() => {
        changeDisabled(true, false);
        const color = getRandomHexColor();
        refs.body.style.backgroundColor = color;
      }, 1000);
}

function onStopClick () {
    changeDisabled(false, true);    
    clearInterval(timerId);
}

function changeDisabled (start, stop) {
    refs.start.disabled = start;
    refs.stop.disabled = stop;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }