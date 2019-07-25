class Curve {
  constructor() {
    this.path = [];
    this.current = new createVector();
  }

  setX(x) {
    this.current.x = x;
  }

  setY(y) {
    this.current.y = y;
  }

  addPoint(x, y) {
    this.path.push(this.current);
  }

  reset() {
    this.path = [];
  }

  show() {
    stroke(255); //
    strokeWeight(1);

    beginShape();
    for (let v of this.path) {
      vertex(v.x, v.y);
    }
    endShape();

    strokeWeight(8);
    point(this.current.x, this.current.y);
    this.current = new createVector();

  }
}