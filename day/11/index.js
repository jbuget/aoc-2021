function key(x, y) {
  return `${x}:${y}`;
}

class Octopus {
  x;
  y;
  energyLevel;

  constructor(x, y, energyLevel) {
    this.x = x;
    this.y = y;
    this.energyLevel = energyLevel;
  }

  get key() {
    return key(this.x, this.y);
  }

  get isGoingToFlash() {
    return this.energyLevel > 9;
  }

  increaseEnergyLevel() {
    this.energyLevel++;
  }

  resetEnergyLevel() {
    this.energyLevel = 0;
  }
}

function buildOctopusesMap(data) {
  const octopuses = new Map();
  data.split('\n').forEach((line, y) => {
    line.split('').forEach((value, x) => {
      const octopus = new Octopus(x, y, parseInt(value, 10));
      octopuses.set(octopus.key, octopus);
    });
  });
  return octopuses;
}

function getOctopusAdjacents(octopuses, o) {
  const adjacents = [];

  const topLeft = octopuses.get(key(o.x - 1, o.y - 1));
  const top = octopuses.get(key(o.x, o.y - 1));
  const topRight = octopuses.get(key(o.x + 1, o.y - 1));
  const right = octopuses.get(key(o.x + 1, o.y));
  const bottomRight = octopuses.get(key(o.x + 1, o.y + 1));
  const bottom = octopuses.get(key(o.x, o.y + 1));
  const bottomLeft = octopuses.get(key(o.x - 1, o.y + 1));
  const left = octopuses.get(key(o.x - 1, o.y));

  if (topLeft) adjacents.push(topLeft);
  if (top) adjacents.push(top);
  if (topRight) adjacents.push(topRight);
  if (right) adjacents.push(right);
  if (bottomRight) adjacents.push(bottomRight);
  if (bottom) adjacents.push(bottom);
  if (bottomLeft) adjacents.push(bottomLeft);
  if (left) adjacents.push(left);

  return adjacents;
}

function partOne(data) {
  const octopuses = buildOctopusesMap(data);

  let countOfFlashes = 0;

  for (let step = 0; step < 100; step++) {
    const octopusToLevelUp = Array.from(octopuses.values());
    const highlightedOctopuses = new Map();
    while (octopusToLevelUp.length > 0) {
      const octopus = octopusToLevelUp.shift();
      octopus.increaseEnergyLevel();
      if (octopus.isGoingToFlash && !highlightedOctopuses.get(octopus.key)) {
        highlightedOctopuses.set(octopus.key, octopus);
        countOfFlashes++;
        octopusToLevelUp.push(...getOctopusAdjacents(octopuses, octopus));
      }
    }
    highlightedOctopuses.forEach((o) => o.resetEnergyLevel());
  }
  return countOfFlashes;
}

function partTwo(data) {
  const octopuses = buildOctopusesMap(data);

  let targetStep = 0;

  let highlightedOctopuses = new Map();
  while (highlightedOctopuses.size < 100) {
    const octopusToLevelUp = Array.from(octopuses.values());
    highlightedOctopuses.clear();
    while (octopusToLevelUp.length > 0) {
      const octopus = octopusToLevelUp.shift();
      octopus.increaseEnergyLevel();
      if (octopus.isGoingToFlash && !highlightedOctopuses.get(octopus.key)) {
        highlightedOctopuses.set(octopus.key, octopus);
        octopusToLevelUp.push(...getOctopusAdjacents(octopuses, octopus));
      }
    }
    highlightedOctopuses.forEach((o) => o.resetEnergyLevel());
    targetStep++;
  }

  return targetStep;
}

module.exports = { partOne, partTwo };
