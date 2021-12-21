const { sum, magnitude } = require('./helpers');

function partOne(data) {
  const snailfishNumbers = data.split('\n');
  return magnitude(sum(snailfishNumbers));
}

function partTwo(data) {
  const snailfishNumbers = data.split('\n');

  let largestMagnitude = 0;
  for (let i = 0 ; i < snailfishNumbers.length ; i++) {
    for (let j = 0 ; j < snailfishNumbers.length ; j++) {
      if (i !== j) {
        const left = snailfishNumbers[i];
        const right = snailfishNumbers[j];
        const mag = magnitude(sum([left, right]));
        if (mag > largestMagnitude) {
          largestMagnitude = mag;
        }
      }
    }
  }
  return largestMagnitude;
}

module.exports = { partOne, partTwo };
