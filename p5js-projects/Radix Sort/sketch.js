//chujowo to wyszło ale w/e
let values;
let digits;
let pos = 1;
let mostDigits = 0;
  let mod = 10;
  let div = 1;
let i=0;

let counter=[[]];


function setup() {
  createCanvas(600, 400);
  background(0);
  frameRate(2);

  // baton=createButton('iksde');//!!! do końcowego projektu

  values = [];
  for (let i = 0; i < width; i++) {
    values[i] = Math.round(random(height));
  }

  digits = [];
  for (let i = 0; i < 10; i++) {
    digits[i] = [];
  }

  stroke(235);
  for (let i = 0; i < values.length; i++) {
    line(i, height, i, height - values[i]);
  }

  for (let i = 0; i < values.length; i++) {
    let temp = values[i];
    if (temp.toString().length > mostDigits) {
      mostDigits = values[i].toString().length;
    }
  }
}

function draw() {
  background(0);
  
  radixSort();
  i++;
  div*=10;
  mod*=10;

  for (let i = 0; i < values.length; i++) {
    line(i, height, i, height - values[i]);
  }
  
  if (pos>mostDigits){
    print("pos, mostDigits:" + pos +" "+ mostDigits);
    congrats();
  }
}

function swap(arr, a, b) { //zamień 2 wartości na wybranych indeksach w tablicy
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function congrats(){
  print("end");
 background(0);
  noLoop();
  
  for (let i=0;i<values.length;i++){
   line(i,height,i,height-values[i]); 
  }
}

function radixSort(){

  if (i<mostDigits) {
    for (let j =0;j<values.length;j++){
      let bucket = parseInt((values[j] % mod)/div);
      
      if (counter[bucket]==null){
        counter[bucket] = [];
      }
      counter[bucket].push(values[j]);
    }
    
    let position = 0;
    for (let j=0;j<counter.length;j++){
     let value = null;
      
      if (counter[j]!=null){
        while((value=counter[j].shift()) != null){
          values[position++] = value;
        }
      }
    }
  }
}