import '../css/common.css';
import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

let selectedTime = null;

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};

class Timer {
  constructor() {
    this.timerID = null;
    this.isActive = false;
    refs.startBtn.disabled = true;
  }

  startTimer() {
    if (this.isActive) {
      return;
    }
    refs.inputDate.disabled = true;
    refs.startBtn.disabled = true;
    this.isActive = true;

    this.timerID = setInterval(() => {
      // const currentTime = Date.now();
      const deltaTime = selectedTime - new Date();
      const componentsTimer = convertMs(deltaTime);
      this.updateComponentsTimer(componentsTimer);
      
      if (deltaTime < 1000) {
        clearInterval(this.timerID);
      }
      
    }, 1000);
  }

  updateComponentsTimer({ days, hours, minutes, seconds }) {
    refs.days.innerHTML = days;
    refs.hours.innerHTML = hours;
    refs.minutes.innerHTML = minutes;
    refs.seconds.innerHTML = seconds;

  }

}

const timer = new Timer();
flatpickr(refs.inputDate, options);
refs.startBtn.addEventListener('click', () => timer.startTimer());