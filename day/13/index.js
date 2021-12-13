function key(x, y) {
  return `${x}:${y}`;
}

class Dot {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get key() {
    return key(this.x, this.y);
  }
}

function extractData(data) {
  const [dotData, foldData] = data.split('\n\n');

  const dots = dotData.trim().split('\n').reduce((map, dotLine) => {
    const [x, y] = dotLine.split(',');
    map.set(key(x, y), new Dot(x, y));
    return map;
  }, new Map());

  const instructions = foldData.trim().split('\n').reduce((arr, foldLine) => {
    const [direction, lineNumber] = foldLine.replace('fold along ', '').split('=');
    arr.push({
      direction: (direction === 'y') ? 'up' : 'left',
      lineNumber: parseInt(lineNumber),
    });
    return arr;
  }, []);

  return { dots, instructions };
}

function fold(dotsMap, instruction) {
  const foldedDots = new Map();

  const dots = Array.from(dotsMap.values());

  if (instruction.direction === 'up') {
    // Upper dots
    const upperDots = dots.filter(d => d.y < instruction.lineNumber);
    for (const upperDot of upperDots) {
      foldedDots.set(key(upperDot.x, upperDot.y), upperDot);
    }
    // Lower dots
    const lowerDots = dots.filter(d => d.y > instruction.lineNumber);
    for (const lowerDot of lowerDots) {
      const newX = lowerDot.x;
      const newY = instruction.lineNumber - (lowerDot.y - instruction.lineNumber);
      foldedDots.set(key(newX, newY), new Dot(newX, newY));
    }
  } else {
    // Left dots
    const leftDots = dots.filter(d => d.x < instruction.lineNumber);
    for (const leftDot of leftDots) {
      foldedDots.set(key(leftDot.x, leftDot.y), leftDot);
    }
    // Right dots
    const rightDots = dots.filter(d => d.x > instruction.lineNumber);
    for (const rightDot of rightDots) {
      const newX = instruction.lineNumber - (rightDot.x - instruction.lineNumber);
      const newY = rightDot.y;
      foldedDots.set(key(newX, newY), new Dot(newX, newY));
    }
  }
  return foldedDots;
}

function print(dots, width, height) {
  for (let y = 0 ; y < height ; y++) {
    let line = '';
    for (let x = 0 ; x < width ; x++) {
      const dot = dots.get(key(x, y));
      line += dot ? '#' : '·';
    }
    console.log(line);
  }
  console.log('\n');
}

function partOne(data) {
  const { dots, instructions } = extractData(data);
  const foldedDots = fold(dots, instructions[0]);
  return foldedDots.size;
}

function partTwo(data) {
  const { dots, instructions } = extractData(data);
  let foldedDots = dots;
  for (let i = 0; i < instructions.length; i++) {
    foldedDots = fold(foldedDots, instructions[i]);
  }
  print(foldedDots, 39, 6);
}

module.exports = { partOne, partTwo };
