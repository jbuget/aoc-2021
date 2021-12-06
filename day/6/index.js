function evaluatePopulation(values, nbDays) {
  const fishesByAge = Array(9).fill(0);

  values.forEach(value => fishesByAge[value]++);

  let population = values.length;

  for (let d = 0; d < nbDays; d++) {
    const pregnants = fishesByAge[0];
    for (let age = 0 ; age < 8 ; age++) {
      fishesByAge[age] = fishesByAge[age + 1];
    }
    fishesByAge[6] = fishesByAge[6] + pregnants;
    fishesByAge[8] = pregnants;
    population += pregnants;
  }

  return population;
}

function partOne(data) {
  let values = data.split(',').map((value) => parseInt(value, 10));
  return evaluatePopulation(values, 80);
}

function partTwo(data) {
  let values = data.split(',').map((value) => parseInt(value, 10));
  return evaluatePopulation(values, 256);
}

module.exports = { partOne, partTwo };
