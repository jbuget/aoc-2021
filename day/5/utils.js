class Point {
  id;
  x;
  y;
  nbCoveringSegments;

  constructor(x, y, nbCoveringSegments) {
    this.id = `${x}:${y}`;
    this.x = x;
    this.y = y;
    this.nbCoveringSegments = nbCoveringSegments || 0;
  }

  increaseNbCoveringSegments() {
    this.nbCoveringSegments++;
  }
}

class Segment {
  x1;
  y1;
  x2;
  y2;

  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  get orientation() {
    if (this.x1 === this.x2) {
      return 'VERTICAL';
    }
    if (this.y1 === this.y2) {
      return 'HORIZONTAL';
    }
    return 'SKEW';
  }

  get length() {
    if (this.orientation === 'HORIZONTAL') {
      return Math.abs(this.x2 - this.x1) + 1;
    }
    if (this.orientation === 'VERTICAL') {
      return Math.abs(this.y2 - this.y1) + 1;
    }
    return null;
  }
}

class Diagram {
  points;
  multipleTimesOverlappedPoints;

  constructor() {
    this.points = Array(1000);
    for (let i = 0; i < 1000; i++) {
      this.points[i] = Array(1000);
    }
    this.multipleTimesOverlappedPoints = [];
  }

  computeSegments(segments) {
    segments.forEach((segment) => {
      for (let i = 0 ; i < segment.length ; i++) {
        let x, y;
        if (segment.orientation === 'HORIZONTAL') {
          if (segment.x1 > segment.x2) {
            x = segment.x1 - i;
          } else {
            x = segment.x1 + i;
          }
          y = segment.y1;
        } else {
          x = segment.x1;
          if (segment.y1 > segment.y2) {
            y = segment.y1 - i;
          } else {
            y = segment.y1 + i;
          }
        }

        if (!this.points[y][x]) {
          this.points[y][x] = new Point(x, y);
        }
        const point = this.points[y][x];
        point.increaseNbCoveringSegments();

        if (point.nbCoveringSegments >= 2) {
          const alreadyMarkedPoint = this.multipleTimesOverlappedPoints.find((mtop) => mtop.id === point.id);
          if (!alreadyMarkedPoint) {
            this.multipleTimesOverlappedPoints.push(point);
          }
        }
      }
    });
  }
}

function getSegmentsFromInput(data) {
  return data.trim().split('\n').map((line) => {
    const [s1, s2] = line.split(' -> ');
    const [x1, y1] = s1.split(',');
    const [x2, y2] = s2.split(',');
    return new Segment(parseInt(x1), parseInt(y1), parseInt(x2), parseInt(y2));
  });
}

function getHorizontalOrVerticalSegments(segments) {
  return segments.filter((segment) => segment.x1 === segment.x2 || segment.y1 === segment.y2);
}

module.exports = {
  Point,
  Diagram,
  Segment,
  getSegmentsFromInput,
  getHorizontalOrVerticalSegments,
}
