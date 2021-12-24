class Die {
  nbRolls = 0;
  lastValue = 100;

  rolls() {
    let result = 0;
    for (let i = 0; i < 3; i++) {
      this.lastValue++;
      if (this.lastValue > 100) {
        this.lastValue = 1;
      }
      result += this.lastValue;
      this.nbRolls++;
    }
    return result;
  }
}

class Player {
  id;
  currentPosition;
  score;

  constructor(id, currentPosition) {
    this.id = id;
    this.score = 0;
    this.currentPosition = currentPosition;
  }

  move(dieValue) {
    this.currentPosition = (this.currentPosition + dieValue) % 10;
    if (this.currentPosition === 0) {
      this.currentPosition = 10;
    }
    this.score += this.currentPosition;
  }

  hasWin(targetScore) {
    return this.score >= targetScore;
  }
}

function partOne(data) {

  const [position1, position2] = data.split('\n').map((line) => parseInt((line.split(': '))[1]));

  const p1 = new Player('player_1', position1);
  const p2 = new Player('player_2', position2);
  const players = [p1, p2];
  const die = new Die();

  let winner;
  while (!winner) {
    for (const player of players) {
      if (!winner) {
        const dieValue = die.rolls();
        player.move(dieValue);
        if (player.hasWin(1000)) {
          winner = player;
        }
      }
    }
  }
  const looser = (winner === p1) ? p2 : p1;
  return looser.score * die.nbRolls;
}

function partTwo(data) {
  return 'TODO';
}

module.exports = { partOne, partTwo };
