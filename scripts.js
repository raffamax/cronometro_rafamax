let timerInterval = null; 
let lapInterval = null; 
let running = false; 
let time = 0; 
let currentlaptime = 0;
let lapTimes = [];
let currentlapNumber = 1;


function formatTime(time) {
  let hours = Math.floor(time / 360000);
  let minutes = Math.floor((time % 360000) / 6000);
  let seconds = Math.floor((time % 6000) / 100);
  let milliseconds = time % 100;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
  time++;
  document.getElementById('timer').textContent = formatTime(time);
}

function formatLap(currentlaptime){
  let laphours = Math.floor(currentlaptime / 360000);
  let lapminutes = Math.floor((currentlaptime % 360000) / 6000);
  let lapseconds = Math.floor((currentlaptime % 6000) / 100);
  let lapmilliseconds = currentlaptime % 100;
  return `${laphours.toString().padStart(2, '0')}:${lapminutes.toString().padStart(2, '0')}:${lapseconds.toString().padStart(2, '0')}:${lapmilliseconds.toString().padStart(2, '0')}`;
}

function updatelap() {
  currentlaptime++;
  document.getElementById('currentlap').innerHTML = `Lap ${currentlapNumber.toString().padStart(2, '0')} -> ` + formatLap(currentlaptime);
}

function startStop() {
  if (running) {
    clearInterval(timerInterval);
    clearInterval(lapInterval);
    running = false;
    document.getElementById('startStopButton').textContent = 'Start';
    document.getElementById('startStopButton').style = 'background-color: green;';
    document.getElementById('lapButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'inline';
  } else {
    timerInterval = setInterval(updateTimer, 10);
    lapInterval = setInterval(updatelap, 10);
    running = true;
    document.getElementById('startStopButton').textContent = 'Stop';
    document.getElementById('startStopButton').style = 'background-color: red;';
    document.getElementById('lapButton').style.display = 'inline';
    document.getElementById('resetButton').style.display = 'none';
  }
}

function lap() {
  currentlaptime = 0;
  currentlapNumber ++;
  let lapTime = time;
  if (lapTimes.length > 0) {
    lapTime -= lapTimes[lapTimes.length - 1];
  }
  lapTimes.push(time);
  let lapNumber = lapTimes.length;
  let lapDiv = document.createElement('div');
  lapDiv.textContent = `Lap ${lapNumber.toString().padStart(2, '0')} ->  ${formatTime(lapTime)}`;
  document.getElementById('laps').prepend(lapDiv);
}

function reset() {
  clearInterval(timerInterval);
  clearInterval(lapInterval);
  running = false;
  time = 0;
  currentlaptime = 0;
  currentlapNumber = 1;
  lapTimes = [];
  document.getElementById('timer').textContent = '00:00:00:00';
  document.getElementById('currentlap').innerHTML = '';
  document.getElementById('laps').innerHTML = '';
  document.getElementById('startStopButton').textContent = 'Start';
  document.getElementById('resetButton').style.display = 'none';
}