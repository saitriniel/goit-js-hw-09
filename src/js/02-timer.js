import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#datetime-picker'),
    start: document.querySelector('button[data-start]'),
    daysSpan: document.querySelector('span[data-days]'),
    hoursSpan: document.querySelector('span[data-hours]'),
    minutesSpan: document.querySelector('span[data-minutes]'),
    secondsSpan: document.querySelector('span[data-seconds]')
}

let selectedTime = null;
let deltaTime = null;
isStartBtnDisabled(true);
refs.start.addEventListener('click', onStartBtn);

flatpickr(refs.input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedTime = selectedDates[0].getTime();
        const currentTime = Date.now();
        deltaTime = selectedTime - currentTime;

        if (deltaTime < 0) {
            Notiflix.Notify.failure("Please choose a date in the future")
        } else {isStartBtnDisabled(false)}
    },
})

function onStartBtn () {
    timerId = setInterval(() => {
        isStartBtnDisabled(true);
        const startTime = Date.now();
        deltaTime = selectedTime - startTime;
        const time = convertMs(deltaTime);
        
        if (time.seconds < 0) {
            Notiflix.Notify.success('Timer is over!');
            isStartBtnDisabled(false);
            clearInterval(timerId);
            return;
        }
        updateClockface(time);
    }, 1000);
}

function addLeadingZero(time) {
    return String(time).padStart(2, '0');
}

function isStartBtnDisabled (value) {
    refs.start.disabled = value;
}


function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        
        const days = addLeadingZero(Math.floor(ms / day));
        const hours = addLeadingZero(Math.floor((ms % day) / hour));
        const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
        return { days, hours, minutes, seconds };
}
  
function updateClockface({ days, hours, minutes, seconds }) {
    refs.daysSpan.textContent = `${days}`;
    refs.hoursSpan.textContent = `${hours}`;
    refs.minutesSpan.textContent = `${minutes}`;
    refs.secondsSpan.textContent = `${seconds}`;
}