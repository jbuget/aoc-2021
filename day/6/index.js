class Lanternfish {
  timer;
  children;

  constructor(timer) {
    this.timer = timer;
    this.children = [];
  }

  addChild(baby) {
    this.children.push(baby);
  }

  get length() {
    return this.children.reduce((result, child) => {
      return result + child.length;
    }, 1);
  }

  processADay() {
    this.timer--;

    this.children.forEach((child) => child.processADay());

    if (this.timer < 0) {
      this.timer = 6;
      this.addChild(new Lanternfish(8));
    }
  }
}

function partOne(data) {
  let values = data.split(',').map((value) => parseInt(value));

  const lanternfish = new Lanternfish(values.shift());
  for (let i = 0; i < values.length; i++) {
    lanternfish.addChild(new Lanternfish(values[i]));
  }

  for (let d = 0 ; d < 80 ; d++) {
    lanternfish.processADay();
  }

  return lanternfish.length;
}

function partTwo(data) {
  return 'TODO';
}

module.exports = { partOne, partTwo, Lanternfish };
