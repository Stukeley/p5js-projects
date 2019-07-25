let values;
let i = 0,
  j = 0;

function setup() {
  createCanvas(600, 400);
  values = [];
  for (i = 0; i < width; i++) {
    values[i] = random(height);
  }
  i=0;
}

function draw() {
  background(0);

  if (i < values.length) {
    for (j = 0; j < values.length - i - 1; j++) {
      let a = values[j];
      let b = values[j + 1];
      if (a > b) {
        swap(values, j, j + 1);
      }
    }
  } else {
    print("Finished");
    noLoop();
  }
  i++;

  for (let k = 0; k < values.length; k++) {
    stroke(255);
    line(k, height, k, height - values[k]);
  }
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}