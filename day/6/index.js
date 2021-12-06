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

function live1(values, nbDays) {
  const lanternfish = new Lanternfish(values.shift());
  for (let i = 0; i < values.length; i++) {
    lanternfish.addChild(new Lanternfish(values[i]));
  }
  for (let d = 0 ; d < nbDays ; d++) {
    lanternfish.processADay();
  }
  return lanternfish.length;
}

function live2(values, nbDays) {
  const colony = [];
  for (let i = 0; i < values.length; i++) {
    colony.push(values[i]);
  }
  for (let d = 0 ; d < nbDays ; d++) {
    let colonyLength = colony.length;
    for (let l = 0 ; l < colonyLength ; l++) {
      const fishTimer = --colony[l];
      if (fishTimer < 0) {
        colony[l] = 6;
        colony.push(8);
      }
    }
  }
  return colony.length;
}

function live3(values, nbDays) {
  const generations = [];

  const firstGeneration = [];
  for (let i = 0; i < values.length; i++) {
    firstGeneration.push(values[i]);
  }
  generations.push(firstGeneration);

  for (let d = 0 ; d < nbDays ; d++) {
    const newGeneration = [];

    for (let g = 0 ; g < generations.length ; g++) {
      const generation = generations[g];
      for (let f = 0 ; f < generation.length ; f++) {
        generation[f]--;
        if (generation[f] < 0) {
          generation[f] = 6;
          newGeneration.push(8);
        }
      }
    }
    generations.push(newGeneration);
  }

  return generations.reduce((result, generation) => result + generation.length, 0);
}

function live4(values, nbDays) {
  let colony = Uint8Array.from(values);
  for (let d = 0 ; d < nbDays ; d++) {
    let nbFishesToAdd = 0;
    for (let f = 0 ; f < colony.length ; f++) {
      let fishTimer = colony[f];
      fishTimer--;
      if (fishTimer < 0) {
        colony[f] = 6;
        nbFishesToAdd++;
      } else {
        colony[f] = fishTimer;
      }
    }

    const newColony = new Uint8Array(nbFishesToAdd);
    for (let j = 0 ; j < nbFishesToAdd ; j++) {
      newColony[j] = 8;
    }

    const nextColony = new Uint8Array(colony.length + nbFishesToAdd);
    nextColony.set(colony, 0);
    nextColony.set(newColony, colony.length);
    colony = nextColony;
  }
  return colony.length;
}

function live5(values, nbDays) {
  const generations = [];

  const firstGeneration = Uint8Array.from(values);
  generations.push(firstGeneration);

  for (let d = 0 ; d < nbDays ; d++) {
    let nbFishesToAdd = 0;
    for (let g = 0 ; g < generations.length ; g++) {
      const generation = generations[g];
      for (let f = 0 ; f < generation.length ; f++) {
        if (generation[f]-- === 0) {
          generation[f] = 6;
          nbFishesToAdd++;
        }
      }
    }
    const newGeneration = new Uint8Array(nbFishesToAdd);
    newGeneration.fill(8);
    generations.push(newGeneration);
  }

  return generations.reduce((result, generation) => result + generation.length, 0);
}

function live6(values, nbDays) {
  const fishesByAge = Array(9);
  fishesByAge.fill(0);

  values.forEach(value => {
    fishesByAge[value]++;
  });

  for (let d = 0 ; d < nbDays ; d++) {
    const pregnants = fishesByAge[0];
    for (let i = 0 ; i < 8 ; i++) {
      fishesByAge[i] = fishesByAge[i + 1];
    }
    fishesByAge[6] = fishesByAge[6] + pregnants;
    fishesByAge[8] = pregnants;
  }

  return fishesByAge.reduce((res, fishes) => res + fishes, 0);
}

function partOne(data) {
  let values = data.split(',').map((value) => parseInt(value));
  return live6(values, 80);
}

function partTwo(data) {
  let values = data.split(',').map((value) => parseInt(value));
  return live6(values, 256);
}

module.exports = { partOne, partTwo, Lanternfish };
