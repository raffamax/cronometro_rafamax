// Variáveis globais
let timerInterval = null; // Intervalo do cronômetro
let lapInterval = null; // Intervalo da volta atual
let running = false; // Indica se o cronômetro está rodando
let time = 0; // Tempo total
let currentlaptime = 0; // Tempo da volta atual
let lapTimes = []; // Tempos de volta
let currentlapNumber = 1;


// Função para formatar o tempo em hh:mm:ss:ms
function formatTime(time) {
  let hours = Math.floor(time / 360000);
  let minutes = Math.floor((time % 360000) / 6000);
  let seconds = Math.floor((time % 6000) / 100);
  let milliseconds = time % 100;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}


// Função para atualizar o cronômetro a cada segundo
function updateTimer() {
  time++;
  document.getElementById('timer').textContent = formatTime(time);
}

// Função para formatar o tempo da volta atual
function formatLap(currentlaptime){
  let laphours = Math.floor(currentlaptime / 360000);
  let lapminutes = Math.floor((currentlaptime % 360000) / 6000);
  let lapseconds = Math.floor((currentlaptime % 6000) / 100);
  let lapmilliseconds = currentlaptime % 100;
  return `${laphours.toString().padStart(2, '0')}:${lapminutes.toString().padStart(2, '0')}:${lapseconds.toString().padStart(2, '0')}:${lapmilliseconds.toString().padStart(2, '0')}`;
}

function updatelap() {
  currentlaptime++;
  document.getElementById('currentlap').innerHTML = `Lap ${currentlapNumber} -> ` + formatLap(currentlaptime);
}


// Função para iniciar ou parar o cronômetro
function startStop() {
  if (running) {
    clearInterval(timerInterval);
    clearInterval(lapInterval);
    running = false;
    document.getElementById('startStopButton').textContent = 'Start';
    document.getElementById('lapButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'inline'; // adiciona estilo display:inline para o botão Reset
  } else {
    timerInterval = setInterval(updateTimer, 10);
    lapInterval = setInterval(updatelap, 10);
    running = true;
    document.getElementById('startStopButton').textContent = 'Stop';
    document.getElementById('lapButton').style.display = 'inline';
    document.getElementById('resetButton').style.display = 'none'; // remove estilo display:block do botão Reset
  }
}

// Função para resetar o cronômetro
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
  document.getElementById('resetButton').style.display = 'none'; // adiciona estilo display:none novamente ao botão Reset
}

// Função para adicionar uma volta
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
  lapDiv.textContent = `Lap ${lapNumber} -> ${formatTime(lapTime)}`;
  document.getElementById('laps').prepend(lapDiv);
}


