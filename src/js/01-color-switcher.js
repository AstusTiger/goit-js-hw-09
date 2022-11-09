function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

function interval() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
}

function toggleBtn() {
  if (startBtn.getAttribute('disabled')) {
    stopBtn.setAttribute('disabled', 'true');
    startBtn.removeAttribute('disabled');
  } else {
    startBtn.setAttribute('disabled', 'true');
    stopBtn.removeAttribute('disabled');
  }
}

startBtn.addEventListener('click', () => {
  timerId = setInterval(interval, 1000);
  interval();
  toggleBtn();
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  toggleBtn();
});
