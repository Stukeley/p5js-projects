let values;
let sorted;
let i = 0,
  j = 0;
let rectSajz = 30;
let counter = 0;

//config:
let bogoMode = 0;
/*
 * 0 - 5 prostokątów, duża szansa na powodzenie algorytmu
 * 1 - 600 linii, szansa na powodzenie jest niemalże zerem
 */
let fps = 20; //zalecane 15 lub 20 - zawsze wykonuje się 5 zamian na klatkę !
//end config.


function setup() {
  createCanvas(600, 400);
  frameRate(fps);
  values = [];

  if (bogoMode == 0) {
    for (i = 0; i < 5; i++) {
      values[i] = random(height);
    }
  } else if (bogoMode == 1) {
    for (i = 0; i < width; i++) {
      values[i] = random(height);
    }
  }

  sorted = values.slice();//! chcemy skopiować przez wartość, a nie referencję !
  sort(sorted);
  i = 0;
}

function draw() {
  background(0);
  stroke(235);
  fill(235);
  rectMode(CORNER);


  if (bogoMode == 0) {
    for (i = 0; i < 3; i++) {
      randomize();
      counter++;

      for (let k = 0; k < values.length; k++) {
        let t = 205 + (k * rectSajz) + (k * 10);
        rect(t, height-values[k], rectSajz, values[k]);
      }


      if (isSorted(values)) {
        congrats();
        break;
      }
    }

  } else if (bogoMode == 1) {
    for (i = 0; i < 2; i++) {
      randomize();
      counter++;

      for (let k = 0; k < values.length; k++) {
        line(k, height, k, height - values[k]);
      }

      if (isSorted(values)) {
        congrats();
        break;
      }
    }
  }

}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function randomize() {
  for (let k = values.length - 1; k >= 0; k--) {
    let rand = Math.round(random(0, values.length - 1));
    swap(values, k, rand);
  }
}

function isSorted(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != sorted[i]) {
      return false;
    }
  }
  return true;
}

function congrats() {
  noLoop();
  print("Whoa! You achieved the unexpected and impossible!");
  background(0);

  if (bogoMode == 0) {
    for (let k = 0; k < values.length; k++) {
      let t = 205 + (k * rectSajz) + (k * 10);
      rect(t, height-values[k], rectSajz, values[k]);

    }
  } else if (bogoMode == 1) {
    for (let k = 0; k < values.length; k++) {
      line(k, height, k, height - values[k]);
    }
  }

  textSize(40);
  stroke(255,0,0);
  fill(255,0,0);
  text(counter, width / 6, height / 2);
}