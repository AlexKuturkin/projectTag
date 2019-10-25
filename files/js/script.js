//объявляем переменные
const count = document.querySelector(".count");
const button = document.querySelector(".button");

const base = 60;
let clocktimer, dateObj, dh, dm, ds, ms;
let h = 1, m = 1, tm = 1, s = 0, ts = 0, init = 0;

//функция для очистки поля
function ClearСlock() {
  clearTimeout(clocktimer);
  let readout = '00:00:00';
  MyForm.stopwatch.value = readout;
}

//функция для старта секундомера
function StartTIME() {
  const cdateObj = new Date();
  const t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
  if (t > 999) {
    s++;
  }
  if (s >= (m * base)) {
    ts = 0;
    m++;
  } else {
    ts = parseInt((ms / 100) + s);
    if (ts >= base) {
      ts = ts - ((m - 1) * base);
    }
  }
  if (m > (h * base)) {
    tm = 1;
    h++;
  } else {
    tm = parseInt((ms / 100) + m);
    if (tm >= base) {
      tm = tm - ((h - 1) * base);
    }
  }
  ms = Math.round(t / 10);
  if (ms > 99) {
    ms = 0;
  }
  if (ms == 0) {
    ms = '00';
  }
  if (ms > 0 && ms <= 9) {
    ms = '0' + ms;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = '0' + ts;
    }
  } else {
    ds = '00';
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = '0' + dm;
    }
  } else {
    dm = '00';
  }
  dh = h - 1;
  if (dh > 0) {
    if (dh < 10) {
      dh = '0' + dh;
    }
  } else {
    dh = '00';
  }
  readout = dh + ':' + dm + ':' + ds;
  document.MyForm.stopwatch.value = readout;
  clocktimer = setTimeout(StartTIME, 1);
}

//Функция запуска секундомера
function Start() {
  ClearСlock();
  dateObj = new Date();
  StartTIME();
  init = 1;
}

function Stop() {
  clearTimeout(clocktimer);
  init = 0;
}

// функция запуска скрипта
function startGame() {
  // создаем поле с блоками
  create();
  // добавляем поддержку клавиатуры
  window.addEventListener('keydown', keyboardEvent, true);
  // добавляем события для кнопок
  document.getElementById('new').onclick = newGame;

  // мешаем блоки для начала игры
  newGame();
}

// функция для получения класса вида xNyN для позиций от 1 до 15
function getXY(i) { return 'x' + (((i - 1) % 4) + 1) + 'y' + Math.ceil((i) / 4); }

// создаем поле внутри блока с классом board
function create() {
  for (let i = 1; i <= 15; i++) {
    $('.board').append('<div class="block block-' + i + ' ' + getXY(i) + '">' + i + '</div>');
  }
}

// обрабатываем нажатие по клавиатуре
function keyboardEvent(e) {
  switch (e.keyCode) {
    case 38: key('up'); break;
    case 40: key('down'); break;
    case 37: key('left'); break;
    case 39: key('right'); break;
  }
  checkWin();
}

// обрабатываем сдвиг одного блока по направлениям up/down/left/right
function key(type) {
  for (let a = 1; a <= 4; a++)
    for (let b = 1; b <= 3; b++) {
      switch (type) {
        case 'up':
          from = 'x' + a + 'y' + (b + 1);
          to = 'x' + a + 'y' + b;
          break;
        case 'down':
          from = 'x' + a + 'y' + (4 - b);
          to = 'x' + a + 'y' + (5 - b);
          break;
        case 'left':
          from = 'x' + (b + 1) + 'y' + a;
          to = 'x' + b + 'y' + a;
          break;
        case 'right':
          from = 'x' + (4 - b) + 'y' + a;
          to = 'x' + (5 - b) + 'y' + a;
          break;
      }
      if (!$('.' + to).length) { $('.' + from).removeClass(from).addClass(to); return }
    }
}

// получение случайного числа от min до max
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// мешаловка блоков
function newGame() {
  for (let a = 1; a <= 1000; a++) {
    switch (getRandomInt(1, 4)) {
      case 1: key('up'); break;
      case 2: key('down'); break;
      case 3: key('left'); break;
      case 4: key('right'); break;
    }
  }

  count.textContent = '0';
  Start();

}

// проверка, а вдруг вы уже победили
function checkWin() {
  let good = 0;
  for (let i = 1; i <= 15; i++) {
    if ($('.block-' + i).hasClass(getXY(i))) good++;
  }
  if (good == 15) {
    alert('Ура! Победа!');
    Stop();
  }
}

// запускаем игру
startGame();

//Обработчики
//слушатель на кнопку "Новая игра", сбрасывающий время секундомера
button.addEventListener("click", function () {
  Start();
})

//слушатель, считающий количество ходов
document.addEventListener('keyup', function (event) {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    count.textContent = (count.textContent | 0) + 1;

  }
}
);
