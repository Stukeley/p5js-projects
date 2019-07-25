let symbolSize = 24;
let streams = [];
let fadeInterval = 1.6;
let colours; //różne schematy kolorów, każdy "drugi wymiar" zawiera te kolory
let colourMode = 0; //0 - base, 1 - purple, 2 - rainbow

function setup() {
  createCanvas(window.innerWidth, window.innerHeight); //"fullscreen"
  background(0);
  textSize(symbolSize);
  textFont("Consolas"); //
  
  colours = new Array(3);
  for (let i=0;i<3;i++){
   colours[i] = []; 
  }

  colours[0][0] = color(0, 255, 70); //[x][0] - kolor bazowy
  colours[0][1] = color(140, 255, 170); //[x][1] - kolor pierwszego znaku

  colours[1][0] = color(138, 33, 209);
  colours[1][1] = color(206, 152, 242);

  colours[2][0] = color(148, 0, 211); //7 kolorów, wybór losowego
  colours[2][1] = color(75, 0, 130);
  colours[2][2] = color(0, 0, 255);
  colours[2][3] = color(0, 255, 0);
  colours[2][4] = color(255, 255, 0);
  colours[2][5] = color(255, 127, 0);
  colours[2][6] = color(255, 0, 0);
  colours[2][7] = color(200); //first

  let x = 0;
  for (let i = 0; i <= width / symbolSize; i++) {
    let stream = new Stream(colours[2][round(random(0,6))]);//słaba optymalizacja
    																		//bo przesyła kolor zawsze, niezależnie od trybu
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize;
  }
}

function draw() {
  background(0, 150);

  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 25));

  this.setToRandomSymbol = function() {
    let charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        //Katakana
        this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
      } else {
        //numery
        this.value = round(random(0, 9));
      }
    }
  };

  this.rain = function() {
    if (this.y >= height) {
      this.y = 0;
    } else {
      this.y += this.speed;
    }
  };
}

function Stream(colour) {
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = random(5, 22);

  this.generateSymbols = function(x, y) {

    let opacity = 255;
    let first = round(random(0, 4)) == 1;
    for (let i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  };

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        if (colourMode == 2) {
          fill(colours[2][7], symbol.opacity);
        } else {
          fill(colours[colourMode][1], symbol.opacity);
        }
      } else {
        if (colourMode == 2) {
          fill(colour, symbol.opacity);
        } else {
          fill(colours[colourMode][0], symbol.opacity);
        }
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  };
}