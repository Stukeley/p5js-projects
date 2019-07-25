var grid;
var cols, rows;
var resolution = 10;
var populacja;

function tablica2D(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function policz(grid, x, y) {
  let suma = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {

      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      suma += grid[col][row];
    }
  }
  suma -= grid[x][y];
  return suma;
}

function sprawdzPopulacje(grid) {
  populacja = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] == 1) populacja++;
    }
  }
}

function setup() {
  createCanvas(600, 400);
  cols = width / resolution;
  rows = height / resolution;
  grid = tablica2D(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }

}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  let next = tablica2D(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let state = grid[i][j];

      let suma = 0;
      let sasiedzi = policz(grid, i, j);


      if (state == 0 && sasiedzi == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (sasiedzi < 2 || sasiedzi > 3)) {
        next[i][j] = 0;
      } else next[i][j] = state;
    }
  }
  grid = next;
  sprawdzPopulacje(grid);
}