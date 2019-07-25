//not really finished
//Znane bugi:
// - Po skończeniu Quicksortu Radix nie działa Radix - i w drugą stronę

let sortMode = 0; //0 - bubble, 1 - quick, 2 - radix, 3 - bogo małe, 4 - bogo duże

let i = 0,
  j = 0;

let pos = 1;
let mostDigits = 0;
let mod = 10;
let div = 1;
let rectSajz = 30;
let licznik = 0;

let startIndex;
let endIndex;
let topp;
let stack;

let sorted;
let sortedBogo; //small bogo only

let digits = [];
let values = [];
let valuesBogo = []; //temporary fix, small bogo only
let counter = [
  []
];



function setup() {
  createCanvas(600, 400);
  background(0);
  stroke(235);

  for (let i = 0; i < 10; i++) {
    digits[i] = [];
  }


  let b1 = createButton("Bubble sort"); //działa
  b1.mouseClicked(function() {
    sortMode = 0;
    resetAll();
    prepareArray();
    frameRate(30);

  });

  let b2 = createButton("Quicksort"); //działa
  b2.mouseClicked(function() {
    sortMode = 1;
    resetAll();
    prepareArray();
    frameRate(30);

    //
    startIndex = 0;
    endIndex = values.length - 1;
    topp = -1;
    stack = new Array(values.length);
    
    stack[++topp] = startIndex;
    stack[++topp] = endIndex;

  });

  let b3 = createButton("Radix sort");
  b3.mouseClicked(function() {
    sortMode = 2;
    resetAll();
    prepareArray();
    frameRate(1);

    for (let i = 0; i < values.length; i++) {
      let temp = values[i];
      if (temp.toString().length > mostDigits) {
        print("obliczam mostdigits");
        mostDigits = values[i].toString().length;
      }
    }
    print(mostDigits);
    loop();//

  });

  let b4 = createButton("Bogosort"); //mały
  b4.mouseClicked(function() {
    sortMode = 3;
    resetAll();
    prepareArrayBogo();
    frameRate(20);
    sortedBogo = valuesBogo.slice();
    sort(sortedBogo);

  });

  let b5 = createButton("Bogosort#2"); //duży
  b5.mouseClicked(function() {
    sortMode = 4;
    resetAll();
    prepareArray();
    frameRate(20);
    sorted = values.slice();
    sort(sorted);

  });
  i = 0;

}

function draw() {
  background(0);

  if (values.length > 0 || valuesBogo.length > 0) {

    switch (sortMode) {
      case 0:

        if (i < values.length) {
          for (j = 0; j < values.length - i - 1; j++) {
            let a = values[j];
            let b = values[j + 1];
            if (a > b) {
              swap(values, j, j + 1);
            }
          }
          i++;

        } else {
          congrats();
        }

        break;

      case 1:

        if (topp >= 0) {
          quickSort();
        } else {
          congrats();
        }

        break;

      case 2:

        radixSort();
        i++;
        div *= 10;
        mod *= 10;
        // if (pos > mostDigits) {
        //   congrats();
        // }

        break;

      case 3:

        for (i = 0; i < 3; i++) {
          if (!isSorted(valuesBogo)) { //czemu to k* nie działało bez tego, przecież jest noLoop
            randomize();
            licznik++;
          }
        }

        break;

      case 4:

        for (i = 0; i < 2; i++) {
          randomize();
          licznik++;

          for (let k = 0; k < values.length; k++) {
            line(k, height, k, height - values[k]);
          }

          if (isSorted(values)) {
            congrats();
          }
        }

        break;


    }



    if (sortMode == 3) {
      if (isSorted(valuesBogo)) {
        congrats();
      } else {
        stroke(235);
        fill(235);
        rectMode(CORNER);

        for (let k = 0; k < valuesBogo.length; k++) {
          let t = 205 + (k * rectSajz) + (k * 10);
          rect(t, height - valuesBogo[k], rectSajz, valuesBogo[k]);
        }

      }

    } else {

      for (let i = 0; i < values.length; i++) {
        line(i, height, i, height - values[i]);
      }
    }
  }

}

function prepareArray() {
  for (let i = 0; i < width; i++) {
    values[i] = Math.round(random(height));
  }
}

function prepareArrayBogo() {
  for (let i = 0; i < 5; i++) {
    valuesBogo[i] = Math.round(random(height));
  }
}

function resetAll() {
  background(0);
  stroke(235);
  fill(235);
  if (values.length > 0) {
    for (let i = 0; i < values.length; i++) {
      values[i] = 0;
    }
  }
  if (valuesBogo.length > 0) {
    for (let i = 0; i < valuesBogo.length; i++) {
      valuesBogo[i] = 0;
    }
  }
  if (digits.length > 0) {
    for (let i = 0; i < digits.length; i++) {
      digits[i] = 0;
    }
  }
  div = 1;
  mod = 10;
  mostDigits = 0;
  pos = 1;
  licznik = 0;
  i = 0;
  j = 0;
  loop();
}

function swap(arr, a, b) { //zamień 2 wartości na wybranych indeksach w tablicy
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function randomize() {
  if (sortMode == 3) {
    for (let k = valuesBogo.length - 1; k >= 0; k--) {
      let rand = Math.round(random(0, valuesBogo.length - 1));
      swap(valuesBogo, k, rand);
    }
  } else {
    for (let k = values.length - 1; k >= 0; k--) {
      let rand = Math.round(random(0, values.length - 1));
      swap(values, k, rand);
    }
  }
}

function isSorted(arr) {
  if (sortMode != 3) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != sorted[i]) {
        return false;
      }
    }
    return true;
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != sortedBogo[i]) {
        return false;
      }
    }
    return true;
  }
}

function congrats() {
  print("end");
  noLoop();
  background(0);

  if (sortMode == 3) {
    for (let i = 0; i < valuesBogo.length; i++) {
      print(valuesBogo[i]);
    }
    stroke(255, 0, 0);
    fill(255, 0, 0);
    for (let k = 0; k < valuesBogo.length; k++) {
      let t = 205 + (k * rectSajz) + (k * 10);

      rect(t, height - valuesBogo[k], rectSajz, valuesBogo[k]);
    }
    textSize(40);
    text(licznik, width / 6, height / 2);

  } else if (sortMode == 4) {
    stroke(255, 0, 0); //235
    for (let k = 0; k < values.length; k++) {
      line(k, height, k, height - values[k]);
    }
  } else {
    stroke(255, 0, 0); //235
    // fill(235);

    for (let i = 0; i < values.length; i++) {
      line(i, height, i, height - values[i]);
    }
  }
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

function radixSort() {

  if (i < mostDigits) {
    for (let j = 0; j < values.length; j++) {
      let bucket = parseInt((values[j] % mod) / div);

      if (counter[bucket] == null) {
        counter[bucket] = [];
      }
      counter[bucket].push(values[j]);
    }

    let position = 0;
    for (let j = 0; j < counter.length; j++) {
      let value = null;

      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          values[position++] = value;
        }
      }
    }
  } else { //
    congrats();
  }
}