function partOne(data) {
  let horizontalPosition = 0;
  let depth = 0;
  data.split('\n').forEach((line) => {
    if (line[0] === 'f') {
      horizontalPosition += parseInt(line.split('forward ')[1]);
    }
    if (line[0] === 'u') {
      depth -= parseInt(line.split('up ')[1]);
    }
    if (line[0] === 'd') {
      depth += parseInt(line.split('down ')[1]);
    }
  });
  return horizontalPosition * depth;
}

function partTwo(data) {
  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;
  data.split('\n').forEach((line) => {
    if (line[0] === 'f') {
      const value = parseInt(line.split('forward ')[1]);
      horizontalPosition += value;
      depth += aim * value;
    }
    if (line[0] === 'u') {
      aim -= parseInt(line.split('up ')[1]);
    }
    if (line[0] === 'd') {
      aim += parseInt(line.split('down ')[1]);
    }
  });
  return horizontalPosition * depth;

}

module.exports = { partOne, partTwo };
