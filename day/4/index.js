const BOARD_SIZE = 5;

class BoardNumber {
  value;
  isMarked;

  constructor(value) {
    this.value = value;
    this.isMarked = false;
  }

  mark() {
    this.isMarked = true;
  }
}

class Board {
  id;
  numbers;
  lastMarkedNumberValue;

  constructor(id) {
    this.id = id;
    this.numbers = new Array(BOARD_SIZE);
    for (let i = 0 ; i < BOARD_SIZE ; i++) {
      this.numbers[i] = new Array(BOARD_SIZE);
    }
    this.lastMarkedNumberValue = null;
  }

  addNumber(value, x, y) {
    this.numbers[x][y] = new BoardNumber(value);
  }

  get allNumbers() {
    return this.numbers.reduce((result, rows) => result.concat(rows), []);
  }

  markNumber(value) {
    const correspondingNumber = this.allNumbers.find((number) => number.value === value);
    if (correspondingNumber) {
      correspondingNumber.mark();
      this.lastMarkedNumberValue = value;
    }
  }

  isWinning() {
    // By rows
    for (let i = 0 ; i < BOARD_SIZE ; i++) {
      const firstUnmarkedNumber = this.numbers[i].find((number) => !number.isMarked);
      if (!firstUnmarkedNumber) {
        return true;
      }
    }
    // By columns
    for (let i = 0 ; i < BOARD_SIZE ; i++) {
      const columnNumbers = [];
      for (let j = 0 ; j < BOARD_SIZE ; j++) {
        columnNumbers.push(this.numbers[j][i]);
      }
      const firstUnmarkedNumber = columnNumbers.find((number) => !number.isMarked);
      if (!firstUnmarkedNumber) {
        return true;
      }
    }
    return false;
  }

  getScore() {
    const sumOfUnmarkedNumbers = this.allNumbers
      .filter((number) => !number.isMarked)
      .reduce((result, number) => result + parseInt(number.value), 0);
    return sumOfUnmarkedNumbers * parseInt(this.lastMarkedNumberValue);
  }
}

class Game {
  drawns;
  boards;

  constructor(drawns, boards) {
    this.drawns = drawns;
    this.boards = boards;
  }

  run() {
    let winningBoard = null;
    while (!winningBoard) {
      const currentDrawnNumber = this.drawns.shift();
      this.boards.forEach((board) => board.markNumber(currentDrawnNumber));
      winningBoard = this.boards.find((board) => board.isWinning());
    }
    return winningBoard;
  }

  runSquidMode() {
    while (this.boards.length > 1) {
      const currentDrawnNumber = this.drawns.shift();
      this.boards.forEach((board) => board.markNumber(currentDrawnNumber));
      this.boards = this.boards.filter((board) => !board.isWinning());
    }
    const lastBoard = this.boards[0];
    while (!lastBoard.isWinning()) {
      const currentDrawnNumber = this.drawns.shift();
      lastBoard.markNumber(currentDrawnNumber);
    }
    return lastBoard;
  }
}

function buildGameFromInput(data) {
  const lines = data.split('\n');
  const drawns = lines[0].split(',');
  const boards = [];
  let boardIdSequence = 1;

  for (let i = 2 ; i < lines.length ; i++) {
    const board = new Board(boardIdSequence++);
    for (let j = 0 ; j < BOARD_SIZE ; j++) {
      const line = lines[i+j].trim().replace(/\s+/g, ' ');
      line.split(' ').forEach((value, k) => {
        board.addNumber(value.trim(), j, k);
      });
    }
    i = i + BOARD_SIZE;
    boards.push(board);
  }
  return new Game(drawns, boards);
}

function partOne(data) {
  const game = buildGameFromInput(data);
  const winningBoard = game.run();
  return winningBoard.getScore();
}

function partTwo(data) {
  const game = buildGameFromInput(data);
  const lastWinningBoard = game.runSquidMode();
  return lastWinningBoard.getScore();
}

module.exports = { partOne, partTwo };
