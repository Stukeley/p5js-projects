let values;

let startIndex;
let endIndex;
let topp;
let stack;

function setup() {
  createCanvas(600, 400);//600,400
  background(0);
  frameRate(30);
  
  values = [];
  for (let i = 0; i < width; i++) {
    values[i] = random(height);
  }

  startIndex = 0;
  endIndex = values.length - 1;
  topp = -1;
  stack = new Array(values.length);

  stack[++topp] = startIndex;
  stack[++topp] = endIndex;

  stroke(235);
  for (let i = 0; i < values.length; i++) {
    line(i, height, i, height - values[i]);
  }
}

function draw() {
  background(0);
	
  if (topp >= 0) {
    quickSort();
  } else {
    for (let elem of values) { //debug only
      print(elem);
    }
  }

  for (let i = 0; i < values.length; i++) {
    line(i, height, i, height - values[i]);
  }
}

function swap(arr, a, b) { //zamień 2 wartości na wybranych indeksach w tablicy
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function quickSort() {

  endIndex = stack[topp--];
  startIndex = stack[topp--];

  let p = podzial(values, startIndex, endIndex);
  if (p - 1 > startIndex) {
    stack[++topp] = startIndex;
    stack[++topp] = p - 1;
  }

  if (p + 1 < endIndex) {
    stack[++topp] = p + 1;
    stack[++topp] = endIndex;
  }

}

function podzial(arr, lewy, prawy) {
  let x = arr[prawy];
  let i = lewy - 1;

  for (let j = lewy; j <= prawy - 1; ++j) {
    if (arr[j] <= x) {
      ++i;
      swap(arr, i, j);
    }
  }

  swap(arr, (i + 1), prawy);

  return (i + 1);
}