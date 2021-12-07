function getCheapestCost(positions, isPartOne) {

  function computeCostOfFuel_part1(targetPosition, positions) {
    return positions.reduce((sum, position) => sum + Math.abs(targetPosition - position), 0);
  }

  function computeCostOfFuel_part2(targetPosition, positions) {
    return positions.reduce((sum, position) => {
      const diff = Math.abs(targetPosition - position);
      const cost = diff * ((diff + 1) / 2);
      return sum + cost;
    }, 0);
  }

  const maxPosition = Math.max(...positions);

  const costsByPosition = Array(maxPosition);
  costsByPosition.fill(Infinity);
  for (let i = 0; i < maxPosition; i++) {
    if (isPartOne) {
      costsByPosition[i] = computeCostOfFuel_part1(i, positions);
    } else {
      costsByPosition[i] = computeCostOfFuel_part2(i, positions);
    }
  }
  return costsByPosition.reduce((cheapestCost, cost) => Math.min(cheapestCost, cost), Infinity);
}

function partOne(data) {
  const positions = data.split(',').map(x => parseInt(x));
  return getCheapestCost(positions, true);
}

function partTwo(data) {
  const positions = data.split(',').map(x => parseInt(x));
  return getCheapestCost(positions, false);
}

module.exports = { partOne, partTwo };
