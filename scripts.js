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
  document.getElementById('currentLapNumber').textContent = `${currentlapNumber.toString().padStart(2, '0')}`;
  document.getElementById('currentLapTime').textContent = `${formatLap(currentlaptime)}`
  document.getElementById('currentLapTotal').textContent = `${formatTime(time)}`
}

function startStop() {
  if (running) {
    clearInterval(timerInterval);
    clearInterval(lapInterval);
    running = false;
    document.getElementById('startStopButton').textContent = 'Start';
    document.getElementById('startStopButton').style = 'background-color: #3E9C08;';
    document.getElementById('startStopButton').style = 'hover: #2f7407;';

    document.getElementById('lapButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'inline';
    
    document.getElementById('currentLapNumber').style.color = '#F2D70C';
    document.getElementById('currentLapTime').style.color = '#F2D70C';
    document.getElementById('currentLapTotal').style.color = '#F2D70C';


  } else {
    timerInterval = setInterval(updateTimer, 10);
    lapInterval = setInterval(updatelap, 10);
    running = true;
    document.getElementById('startStopButton').textContent = 'Stop';
    document.getElementById('startStopButton').style = 'background-color: #DB1619;';

    document.getElementById('lapButton').style.display = 'inline';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('thead').style.display = 'contents';

    document.getElementById('currentLapNumber').style.color = '#3E9C08';
    document.getElementById('currentLapTime').style.color = '#3E9C08';
    document.getElementById('currentLapTotal').style.color = '#3E9C08';


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
  location.reload()
}
