const { Diagram, getSegmentsFromInput, getHorizontalOrVerticalSegments } = require('./utils');

function partOne(data) {
  const segments = getSegmentsFromInput(data);
  const horizontalOrVerticalSegments = getHorizontalOrVerticalSegments(segments);
  const diagram = new Diagram();
  diagram.computeSegments(horizontalOrVerticalSegments);
  return diagram.multipleTimesOverlappedPoints.length;
}

function partTwo(data) {
  const segments = getSegmentsFromInput(data);
  const diagram = new Diagram();
  diagram.computeSegments(segments);
  return diagram.multipleTimesOverlappedPoints.length;
}

module.exports = [partOne, partTwo];
