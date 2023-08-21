
const startBtn = document.querySelector(`button[data-start]`);
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;



startBtn.addEventListener('click', backgroundChange);

stopBtn.addEventListener('click', backgroundChangeBreak);



function backgroundChange() {
  startBtn.disabled = true;

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function backgroundChangeBreak(e) {
  startBtn.disabled = false;

  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
