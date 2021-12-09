function key(x, y) {
  return `${x}:${y}`;
}

class Point {

  x;
  y;
  height;

  constructor(x, y, height) {
    this.x = x;
    this.y = y;
    this.height = height;
  }
}

class HeightMap {

  xSize;
  ySize;
  points;

  constructor(data) {
    this.points = data.trim().split('\n').reduce((map, line, y, a) => {
      if (!this.ySize) {
        this.ySize = a.length;
      }
      line.split('').forEach((c, x, a) => {
        if (!this.xSize) {
          this.xSize = a.length;
        }
        map.set(key(x, y), new Point(x, y, parseInt(c)));
      });
      return map;
    }, new Map());
  }

  get lowerPoints() {
    const lowerPoints = [];
    for (let x = 0; x < this.xSize; x++) {
      for (let y = 0; y < this.ySize; y++) {
        const point = this.points.get(key(x, y));

        const up = this.points.get(key(x, y - 1));
        const down = this.points.get(key(x, y + 1));
        const left = this.points.get(key(x - 1, y));
        const right = this.points.get(key(x + 1, y));

        if ((up ? point.height < up.height : true)
          && (down ? point.height < down.height : true)
          && (left ? point.height < left.height : true)
          && (right ? point.height < right.height : true)
        ) {
          lowerPoints.push(point);
        }
      }
    }
    return lowerPoints;
  }

  getSumOfRiskLevelsOfAllLowerPoints() {
    return this.lowerPoints.reduce((sum, point) => {
      return sum + 1 + point.height;
    }, 0);
  }

  getMultiplicationOfTheSizesOfTheThreeLargestBasins() {

  }
}

function partOne(data) {
  const heightmap = new HeightMap(data);
  return heightmap.getSumOfRiskLevelsOfAllLowerPoints();
}

function partTwo(data) {
  const heightmap = new HeightMap(data);
  return heightmap.getMultiplicationOfTheSizesOfTheThreeLargestBasins();
}

module.exports = { partOne, partTwo };
