let angle;
let w = 60;
let rows, cols;
let d, r;
let curves;

function Make2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }

  return arr;
}

function setup() {
  createCanvas(600, 600);
  angle = -HALF_PI;
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  curves = Make2DArray(rows, cols);
  d = 0.8*w;
  r = d / 2;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i] = new Curve();
    }
  }

}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    stroke(255);
    noFill();
    strokeWeight(1);
    let cx = w + i * w + w / 2;
    let cy = w / 2;
    ellipse(cx, cy, d, d);

    let x = r * cos(angle * (i + 1) - HALF_PI);
    let y = r * sin(angle * (i + 1) - HALF_PI);

    strokeWeight(8);
    point(cx + x, cy + y);

    stroke(255, 50);
    strokeWeight(1);
    line(cx + x, 0, cx + x, height);

    for (let j = 0; j < rows; j++) {
      curves[j][i].setX(cx + x);
    }
  }

  for (let j = 0; j < rows; j++) {
    stroke(255);
    noFill();
    strokeWeight(1);
    let cx = w / 2;
    let cy = w + j * w + w / 2;
    ellipse(cx, cy, d, d);

    let x = r * cos(angle * (j + 1) - HALF_PI);
    let y = r * sin(angle * (j + 1) - HALF_PI);

    strokeWeight(8);
    point(cx + x, cy + y);

    stroke(255, 50);
    strokeWeight(1);
    line(0, cy + y, width, cy + y);

    for (let i = 0; i < cols; i++) {
      curves[j][i].setY(cy + y);
    }
  }
  
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i].addPoint();
      curves[j][i].show();
    }
  }

  angle -= 0.01;
  
  if (angle<-TWO_PI) {
    for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i].reset();
    }
  }
    angle=0;
  }
}