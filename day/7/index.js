function partOne(data) {

  function computeCostOfFuel(targetPosition, positions) {
    return positions.reduce((sum, position) => sum + Math.abs(targetPosition - position), 0);
  }

  const positions = data.split(',').map(x => parseInt(x));
  const maxPosition = Math.max(...positions);

  const costsByPosition = Array(maxPosition);
  costsByPosition.fill(Infinity);
  for (let i = 0; i < maxPosition; i++) {
    for (let j = 0; j < positions.length; j++) {
      const position = positions[j];
      costsByPosition[position] = computeCostOfFuel(position, positions);
    }
  }
  return costsByPosition.reduce((cheapestCost, cost) => Math.min(cheapestCost, cost), Infinity);
}

function partTwo(data) {
  return 'TODO';
}

module.exports = { partOne, partTwo };
