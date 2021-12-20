class Area {
  x0;
  x1;
  y0;
  y1;

  constructor(x0, x1, y0, y1) {
    this.x0 = x0;
    this.x1 = x1;
    this.y0 = y0;
    this.y1 = y1;
  }
}

class Probe {

  position;
  velocity;
  targetArea;
  maxHeight;

  constructor(targetArea, initialVelocity) {
    this.position = { x: 0, y: 0 };
    this.targetArea = targetArea;
    this.velocity = { x: initialVelocity.x, y: initialVelocity.y };
    this.maxHeight = -9999;
  }

  nextStep() {
    // Update position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y > this.maxHeight) {
      this.maxHeight = this.position.y;
    }

    // Update velocity
    if (this.velocity.x > 0) {
      this.velocity.x--;
    } else {
      if (this.velocity < 0) {
        this.velocity.x++;
      } else {
        this.velocity.x = 0;
      }
    }
    this.velocity.y--;

    // console.log(this.position);
  }

  canReachedTargetArea() {
    while (this.position.x <= this.targetArea.x1 && this.position.y >= this.targetArea.y0) {
      if (this.position.x >= this.targetArea.x0
        && this.position.x <= this.targetArea.x1
        && this.position.y <= this.targetArea.y1
        && this.position.y >= this.targetArea.y0) {
        return true;
      }
      this.nextStep();
    }
    return false;
  }
}

function partOne(data) {
  const axis = data.split('target area: ')[1].split(', ');
  const [x0, x1] = axis[0].replace('x=', '').split('..');
  const [y0, y1] = axis[1].replace('y=', '').split('..');
  const targetArea = new Area(parseInt(x0), parseInt(x1), parseInt(y0), parseInt(y1));

  const successfulProbes = [];
  for (let x = 0; x <= x1; x++) {
    for (let y = 1000; y >= y0 ; y--) {
      const probe = new Probe(targetArea, {x, y });
      if (probe.canReachedTargetArea()) {
        successfulProbes.push(probe);
      }
    }
  }

  successfulProbes.sort((a, b) => b.maxHeight - a.maxHeight);
  return successfulProbes[0].maxHeight;
}

function partTwo(data) {
  const axis = data.split('target area: ')[1].split(', ');
  const [x0, x1] = axis[0].replace('x=', '').split('..');
  const [y0, y1] = axis[1].replace('y=', '').split('..');
  const targetArea = new Area(parseInt(x0), parseInt(x1), parseInt(y0), parseInt(y1));

  const successfulProbes = [];
  for (let x = 0; x <= x1; x++) {
    for (let y = Math.abs(y0); y >= y0 ; y--) {
      const probe = new Probe(targetArea, {x, y });
      if (probe.canReachedTargetArea()) {
        successfulProbes.push(probe);
      }
    }
  }

  return successfulProbes.length;
}

module.exports = { partOne, partTwo };
