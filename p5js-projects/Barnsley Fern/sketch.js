//DO NOT CHANGE THESE//
let x = 0,
  y = 0;
let nextX, nextY;
let colours = [];
let r;
let currentI = 0;
let iterator = 0;
let ile = 0;
let trybKoloru;
//END//

//USER CONFIG//
//
//default:4000
let z = 4000; //do 4. trybu kolorów, ilość punktów w jednym kolorze

//default:15000
let limit = 15000; //do 5., ilość punktów przed zmianą koloru

//default:2000 lub 200 lub 20
let dilej = 2000; //do 5., jest to delay przed wyczyszczeniem tła po rysowaniu

//default:30
let frames = 30; //określa ilość klatek na sekundę

//default:100
let v = 100; //określa ilość rysowanych punktów na klatkę

//
// END USER CONFIG //

function setup() {
  createCanvas(600, 600);
  frameRate(frames);
  background(0);
  colours[0] = color(148, 0, 211);
  colours[1] = color(75, 0, 130);
  colours[2] = color(0, 0, 255);
  colours[3] = color(0, 255, 0);
  colours[4] = color(255, 255, 0);
  colours[5] = color(255, 127, 0);
  colours[6] = color(255, 0, 0);

  pickRandomColorMode();
}

function draw() {
  for (let i = 0; i < v; i++) {
    switch (trybKoloru) {
      case '1':
        stroke(pickColour1());
        break;
      case '2':
        stroke(pickColour2());
        break;
      case '3':
        stroke(pickColour3());
        break;
      case '4':
        stroke(pickColour4());
        break;
      case '5':
        stroke(pickColour5());
        break;
    }
    drawPoint();
    nextPoint();
    ile++;
  }
}

function nextPoint() {
  r = random(1);

  if (r < 0.01) {
    //1
    nextX = 0;
    nextY = 0.16 * y;
  } else if (r < 0.86) {
    //2
    nextX = 0.85 * x + 0.04 * y;
    nextY = -0.04 * x + 0.85 * y + 1.6;
  } else if (r < 0.93) {
    //3
    nextX = 0.20 * x + -0.26 * y;
    nextY = 0.23 * x + 0.22 * y + 1.6;
  } else {
    //4
    nextX = -0.15 * x + 0.28 * y;
    nextY = 0.26 * x + 0.24 * y + 0.44;
  }

  x = nextX;
  y = nextY;
}

function drawPoint() {
  let px = map(x, -2.1820, 2.6558, 0, width);
  let py = map(y, 0, 9.9983, height, 0);

  strokeWeight(2);
  point(px, py);
}

function pickRandomColorMode() {
  let ran = random(1);
  if (ran < 0.20) {
    trybKoloru = '1';
  } else if (ran < 0.40) {
    trybKoloru = '2';
  } else if (ran < 0.60) {
    trybKoloru = '3';
  } else if (ran < 0.80) {
    trybKoloru = '4';
  } else {
    trybKoloru = '5';
  }
}

function pickColour1() { //wersja początkowa - "paski tęczy"
  let currentColour;
  if (x < -1.491) {
    currentColour = colours[0];
  } else if (x < -0.8) {
    currentColour = colours[1];
  } else if (x < -0.109) {
    currentColour = colours[2];
  } else if (x < 0.582) {
    currentColour = colours[3];
  } else if (x < 1.274) {
    currentColour = colours[4];
  } else if (x < 1.965) {
    currentColour = colours[5];
  } else {
    currentColour = colours[6];
  }
  return currentColour;
}

function pickColour2() { //uboga, 4-kolorowa tęcza - nie działa do końca
  let currentColour;

  if (r < 0.01) {
    currentColour = colours[1];
  } else if (r < 0.86) {
    currentColour = colours[3];
  } else if (r < 0.93) {
    currentColour = colours[4];
  } else {
    currentColour = colours[6];
  }

  return currentColour;
}

function pickColour3() { //losowe kolory - nie polecam
  let currentColour;

  let ran = random(1);
  if (ran < 0.143) {
    currentColour = colours[0];
  } else if (ran < 0.286) {
    currentColour = colours[1];
  } else if (ran < 0.429) {
    currentColour = colours[2];
  } else if (ran < 0.571) {
    currentColour = colours[3];
  } else if (ran < 0.714) {
    currentColour = colours[4];
  } else if (ran < 0.857) {
    currentColour = colours[5];
  } else {
    currentColour = colours[6];
  }

  return currentColour;
}

function pickColour4() { //zmiana koloru co z punktów
  let currentColour;
  currentColour = colours[iterator];
  currentI++;
  if (currentI == z) {
    currentI = 0;
    iterator++;
  }
  if (iterator > 6) {
    iterator = 0;
  }

  return currentColour;
}

function pickColour5() { //zmiana koloru co limit punktów z czyszczeniem tła i krótkim
  //delayem pomiędzy
  let currentColour;
  currentColour = colours[iterator];

  if (ile > limit) {
    iterator++;
    ile = 0;
    setTimeout(dilej);
    background(0);
  }
  if (iterator > 6) {
    iterator = 0;
  }

  return currentColour;
}