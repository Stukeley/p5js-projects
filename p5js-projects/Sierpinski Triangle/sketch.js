let n = 7; //recommended value <10
let x, y;
let kolor;
let v;

function setup() {
  createCanvas(400, 400);
  background(255);
  smooth();
  noStroke();
  colorMode(HSB, 255);
  x = width;
  y = height;
  if (n < 10) {
    v = 1;
  } else if (n < 13) {
    v = 3;
  } else {
    v = 45;
  }
  triangle(x / 2, 0, 0, y, x, y);
  rysuj(x / 2, 0, 0, y, x, y, n);
}

function draw() {
  background(255);
  if (kolor <= 254 - v) {
    kolor += v;
  } else {
    kolor = 0;
  }
  rysuj(x / 2, 0, 0, y, x, y, n);
}

function rysuj(x1, y1, x2, y2, x3, y3, n) {
  if (n > 0) {
    fill(kolor, 255 / n, 255);
    triangle(x1, y1, x2, y2, x3, y3);

    let h1 = (x1 + x2) / 2;
    let w1 = (y1 + y2) / 2;
    let h2 = (x2 + x3) / 2;
    let w2 = (y2 + y3) / 2;
    let h3 = (x3 + x1) / 2;
    let w3 = (y3 + y1) / 2;

    rysuj(x1, y1, h1, w1, h3, w3, n - 1);
    rysuj(h1, w1, x2, y2, h2, w2, n - 1);
    rysuj(h3, w3, h2, w2, x3, y3, n - 1);

  }
}