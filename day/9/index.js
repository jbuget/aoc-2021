function key(x, y) {
  return `${x}:${y}`;
}

class Point {

  x;
  y;
  height;
  isMarked;

  constructor(x, y, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.isMarked = false;
  }

  mark() {
    this.isMarked = true;
  }

  get isWall() {
    return this.height === 9;
  }
}

class Basin {

  constructor() {
    this.points = [];
  }

  addPoint(point) {
    this.points.push(point);
  }

  get size() {
    return this.points.length;
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

  get basins() {
    return this.lowerPoints.reduce((basins, lowerPoint) => {
      const basin = new Basin();
      const nodes = [];

      nodes.push(lowerPoint);
      while (nodes.length > 0) {
        const point = nodes.shift();
        if (!point.isMarked) {
          point.mark();
          basin.addPoint(point);

          const up = this.points.get(key(point.x, point.y - 1));
          const down = this.points.get(key(point.x, point.y + 1));
          const left = this.points.get(key(point.x - 1, point.y));
          const right = this.points.get(key(point.x + 1, point.y));

          if (up && !up.isMarked && !up.isWall) nodes.push(up);
          if (down && !down.isMarked && !down.isWall) nodes.push(down);
          if (left && !left.isMarked && !left.isWall) nodes.push(left);
          if (right && !right.isMarked && !right.isWall) nodes.push(right);
        }
      }

      basins.push(basin);
      return basins;
    }, []);
  }

  getSumOfRiskLevelsOfAllLowerPoints() {
    return this.lowerPoints.reduce((sum, point) => {
      return sum + 1 + point.height;
    }, 0);
  }

  getMultiplicationOfTheSizesOfTheThreeLargestBasins() {
    const basins = this.basins.sort((a, b) => b.size - a.size);
    return basins[0].size * basins[1].size * basins[2].size;
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
