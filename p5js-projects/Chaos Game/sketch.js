let points;
let current;

function reset() {
  points = [];
  for (let i = 0; i < 3; i++) {
    let v = createVector(random(width), random(height));
    points.push(v);
  }

  current = createVector(random(width), random(height))

  background(0);
  stroke(255);
  strokeWeight(8);

  for (let p of points) {
    point(p.x, p.y);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  reset();


}

function draw() {

  if (frameCount % 100 == 0) {
    reset();
  }

  for (let i = 0; i < 200; i++) {
    strokeWeight(2);


    // let next = random(points);
    // current.x=lerp(current.x,next.x,0.5);
    //     current.y=lerp(current.y,next.y,0.5);

    let next = floor(random(3));

    if (next == 0) {
      stroke(255, 0, 255, 200);
      current.x = lerp(current.x, points[0].x, 0.5);
      current.y = lerp(current.y, points[0].y, 0.5);

    } else if (next == 1) {
      stroke(0, 255, 255, 200);
      current.x = lerp(current.x, points[1].x, 0.5);
      current.y = lerp(current.y, points[1].y, 0.5);
    } else if (next == 2) {
      stroke(255, 255, 0, 200);
      current.x = lerp(current.x, points[2].x, 0.5);
      current.y = lerp(current.y, points[2].y, 0.5);
    }

    point(current.x, current.y);
  }
}