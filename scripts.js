// Variáveis globais
let timerInterval = null; // Intervalo do cronômetro
let running = false; // Indica se o cronômetro está rodando
let time = 0; // Tempo total
let lapTimes = []; // Tempos de volta


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


// Função para iniciar ou parar o cronômetro
function startStop() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
    document.getElementById('startStopButton').textContent = 'Start';
    document.getElementById('lapButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'inline'; // adiciona estilo display:inline para o botão Reset
  } else {
    timerInterval = setInterval(updateTimer, 10);
    running = true;
    document.getElementById('startStopButton').textContent = 'Stop';
    document.getElementById('lapButton').style.display = 'inline';
    document.getElementById('resetButton').style.display = 'none'; // remove estilo display:block do botão Reset
  }
}

// Função para resetar o cronômetro
function reset() {
  clearInterval(timerInterval);
  running = false;
  time = 0;
  lapTimes = [];
  document.getElementById('timer').textContent = '00:00:00';
  document.getElementById('laps').innerHTML = '';
  document.getElementById('startStopButton').textContent = 'Start';
  document.getElementById('resetButton').style.display = 'none'; // adiciona estilo display:none novamente ao botão Reset
}

// Função para adicionar uma volta
function lap() {
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


