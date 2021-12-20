const { sum, magnitude } = require('./helpers');

function partOne(data) {
  const snailfishNumbers = data.split('\n');
  return magnitude(sum(snailfishNumbers));
}

function partTwo(data) {
  return 'TODO';
}

module.exports = { partOne, partTwo };
