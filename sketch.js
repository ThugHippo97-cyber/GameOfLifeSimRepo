let grid;
let cellSize = 5;
let area = 5;
let cols;
let rows;
let runSimulation = false;

function setup() {
  createCanvas(1000, 1000);
  frameRate(30);
  cols = width / cellSize;
  rows = height / cellSize;
  grid = createGrid(rows, cols);
  background(0);
  showIntroScreen();
}

function draw() {
  if (runSimulation == true){
    background(0);
    simulateLife();
    updateGrid();
    showPopulation();
  }
}

function keyPressed(){
  if (keyCode == ENTER){
    runSimulation = true;
  }
  if (keyCode == BACKSPACE){
    runSimulation = false;
  }
}

function mousePressed() {
  let plottedMatrix = new Array(area)
    .fill(0)
    .map(() => new Array(area).fill(0));

  for (let i = 0; i < plottedMatrix.length; i++) {
    for (let j = 0; j < plottedMatrix[i].length; j++) {
      plottedMatrix[i][j] = int(random(2));
    }
  }

  let row = floor(mouseX / cellSize);
  let col = floor(mouseY / cellSize);
  let a = 0;
  let b = 0;

  for (let i = row; i < row + area; i++) {
    for (let j = col; j < col + area; j++) {
      grid[i][j] = plottedMatrix[a][b];
      b++;
    }
    a++;
    b = 0;
  }
}

function updateGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      stroke(255);
      if (grid[i][j] == 1) {
        fill(255);
        let x = i * cellSize;
        let y = j * cellSize;
        rect(x, y, cellSize, cellSize);
      }
    }
  }
}

function simulateLife() {
  let newGrid = createGrid(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let curr = grid[i][j];

      if (curr == 1) {
        let neighborCount = countNeighbors(i, j);
        if (neighborCount < 2 || neighborCount > 3) {
          newGrid[i][j] = 0;
        } else {
          newGrid[i][j] = 1;
        }
      } else {
        if (countNeighbors(i, j) == 3) {
          newGrid[i][j] = 1;
        }
      }
    }
  }
  grid = newGrid;
}

function countNeighbors(r, c) {
  let count = 0;
  for (let cr = -1; cr <= 1; cr++) {
    for (let cc = -1; cc <= 1; cc++) {
      if (cr == 0 && cc == 0) continue;
      let nr = r + cr;
      let nc = c + cc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
        count++;
      }
    }
  }
  return count;
}

function createGrid(rows, cols) {
  let newGrid = [];
  for (let i = 0; i < rows; i++) {
    newGrid[i] = [];
    for (let j = 0; j < cols; j++) {
      newGrid[i][j] = 0;
    }
  }
  return newGrid;
}

function countPopulation(){
  let res = 0;
  for (let i = 0; i < rows; i++){
    for (let j = 0; j < cols; j++){
      if (grid[i][j] == 1){
        res += 1;
      }
    }
  }
  return res;
}

function showPopulation(){
  fill(255);
  textSize(20);
  textAlign(RIGHT, CENTER);
  text("Population: " + countPopulation(), width-200, 50);
}

function showIntroScreen(){
  fill(255);
  textSize(35);
  textAlign(LEFT, CENTER);
  text("How to Play: ", 100, 50);
  textSize(25);
  text("Game of Life Rules - \n 1. Any live cell with fewer than two live \n   neighbours dies, as if by underpopulation.", 100, 120);
  text(" 2. Any live cell with two or three live neighbours lives \n on to the next generation.", 100, 210);
  text(" 3. Any live cell with more than three live neighbours dies, \n as if by overpopulation.", 100, 290);
  text(" 4. Any dead cell with exactly three live neighbours becomes \n a live cell, as if by reproduction.", 100, 370);
  text("When the simulation begins you will be presented with a black screen. \n to plot some \"people\" just left click anywhere", 50, 500);
  text("To begin press ENTER", 50, 600);
  text("To stop press BACKSPACE", 400, 600);
}
