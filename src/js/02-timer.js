import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', () => {
  //console.log('picked date ', Date.parse(datePicker.value));
  //console.log('now ', new Date().getTime());

  //console.log('remain ', Date.parse(datePicker.value) - new Date());
  //startBtn.setAttribute('disabled', 'true');

  if (startBtn.textContent === 'Start') {
    startBtn.textContent = 'Stop';
    const intervalId = setInterval(() => {
      const remainigTime = Date.parse(datePicker.value) - new Date();
      const { days, hours, minutes, seconds } = convertMs(remainigTime);
      //console.log(`${days}, ${hours}, ${minutes}, ${seconds}`);
      daysSpan.textContent = days.toString().padStart(2, '0');
      hoursSpan.textContent = hours.toString().padStart(2, '0');
      minutesSpan.textContent = minutes.toString().padStart(2, '0');
      secondsSpan.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
    startBtn.dataset.intervalId = intervalId;
  } else {
    startBtn.textContent = 'Start';
    clearInterval(startBtn.dataset.intervalId);
  }
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function validation(time) {
  const currentTime = new Date();
  const pickerTime = time.getTime();
  if (currentTime > pickerTime) {
    Notiflix.Notify.failure('Please choose a date in the future', {
      timeout: 1000,
    });
    startBtn.setAttribute('disabled', 'true');
    return;
  }
  startBtn.removeAttribute('disabled');
}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validation(selectedDates[0]);
    clearInterval(startBtn.dataset.intervalId);
    startBtn.textContent = 'Start';
    daysSpan.textContent = '00'.toString().padStart(2, '0');
    hoursSpan.textContent = '00'.toString().padStart(2, '0');
    minutesSpan.textContent = '00'.toString().padStart(2, '0');
    secondsSpan.textContent = '00'.toString().padStart(2, '0');
  },
});
