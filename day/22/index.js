function parseLine(line) {
  const [status, coordinates] = line.split(' ');
  const [xCoord, yCoord, zCoord] = coordinates.split(',');
  const [x0, x1] = xCoord.substring(2, xCoord.length).split('..');
  const [y0, y1] = yCoord.substring(2, yCoord.length).split('..');
  const [z0, z1] = zCoord.substring(2, zCoord.length).split('..');
  return {
    status,
    x: [parseInt(x0, 10), parseInt(x1, 10)],
    y: [parseInt(y0, 10), parseInt(y1, 10)],
    z: [parseInt(z0, 10), parseInt(z1, 10)],
  };
}

function partOne(data) {
  const steps = data.split('\n').map(parseLine).filter((step) => {
    return step.x[0] >= -50 && step.x[0] <= 50
      && step.x[1] >= -50 && step.x[1] <= 50
      && step.y[1] >= -50 && step.y[1] <= 50
      && step.y[1] >= -50 && step.y[1] <= 50
      && step.z[1] >= -50 && step.z[1] <= 50
      && step.z[1] >= -50 && step.z[1] <= 50;
  });
  console.table(steps);

  const structure = steps.reduce((cuboids, step) => {
    for (let i = step.x[0]; i < step.x[1] + 1; i++) {
      for (let j = step.y[0]; j < step.y[1] + 1; j++) {
        for (let k = step.z[0]; k < step.z[1] + 1; k++) {
          if (step.status === 'on') {
            // add cuboid
            cuboids.set(`${i}:${j}:${k}`);
          } else {
            // remove cuboid
            cuboids.delete(`${i}:${j}:${k}`);
          }
        }
      }
    }
    return cuboids;
  }, new Map());

  return structure.size;
}

function partTwo(data) {
  return 'TODO';
}

module.exports = { partOne, partTwo };
