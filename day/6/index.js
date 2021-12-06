function evaluatePopulation(values, nbDays) {
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
  return evaluatePopulation(values, 80);
}

function partTwo(data) {
  let values = data.split(',').map((value) => parseInt(value));
  return evaluatePopulation(values, 256);
}

module.exports = { partOne, partTwo };
