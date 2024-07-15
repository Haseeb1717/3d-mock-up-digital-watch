let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let interval;

function updateTime() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const time = `${hours}:${minutes}:${seconds}`;
  const date = now.toDateString();

  document.getElementById('time').textContent = time;
  document.getElementById('date').textContent = date;
}

function startStop() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
  } else {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTimer, 10);
    isRunning = true;
  }
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  elapsedTime = 0;
  updateTimer();
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  const milliseconds = Math.floor(elapsedTime % 1000 / 10);
  const seconds = Math.floor(elapsedTime / 1000 % 60);
  const minutes = Math.floor(elapsedTime / 1000 / 60 % 60);
  const hours = Math.floor(elapsedTime / 1000 / 60 / 60);

  const secondsRotation = seconds * 6; // 360 degrees / 60 seconds = 6 degrees per second
  const minutesRotation = minutes * 6 + secondsRotation / 60; // 360 degrees / 60 minutes = 6 degrees per minute
  const hoursRotation = hours * 30 + minutesRotation / 12; // 360 degrees / 12 hours = 30 degrees per hour

  document.getElementById('second-hand').style.transform = `rotate(${secondsRotation}deg)`;
  document.getElementById('minute-hand').style.transform = `rotate(${minutesRotation}deg)`;
  document.getElementById('hour-hand').style.transform = `rotate(${hoursRotation}deg)`;

  updateTime();
}

// Initial call to display time immediately
updateTime();
