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
  document.getElementById('currentlap').innerHTML = `${currentlapNumber.toString().padStart(2, '0')} - ${formatLap(currentlaptime)}`;
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
    let currentLapLetter = document.createElement('div');
    currentLapLetter.setAttribute("id","currentlapletter")
    currentLapLetter.textContent = 'Lap';
    // currentLapLetter.style.color = 'green';
    // currentLapLetter.setAttribute('id , currentlapletter');
    document.getElementById('currentlapsection').prepend(currentLapLetter);

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
  let lapRow = document.createElement('tr');
  document.getElementById('tableBody').prepend(lapRow);

  let lapTotalPrint = document.createElement('td');
  lapTotalPrint.setAttribute("id","totalLapTime");
  lapTotalPrint.textContent = `${formatTime(time)}`;
  document.getElementById('tableBody').prepend(lapTotalPrint);

  let lapPrint = document.createElement('td');
  lapPrint.setAttribute("id","lapTime");
  lapPrint.textContent = `${formatTime(lapTime)}`;
  document.getElementById('tableBody').prepend(lapPrint);

  let lapsName = document.createElement('td');
  lapsName.setAttribute("id","lapNumber");
  lapsName.textContent = `${lapNumber.toString().padStart(2, '0')}`
  document.getElementById('tableBody').prepend(lapsName);
  
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