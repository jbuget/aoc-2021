function getBeaconsFromDistances(distances) {
  return Array.from(distances.reduce((beacons, distance) => {
    if (!beacons.get(id(distance.beaconA))) {
      beacons.set(id(distance.beaconA), distance.beaconA);
    }
    if (!beacons.get(id(distance.beaconB))) {
      beacons.set(id(distance.beaconB), distance.beaconB);
    }
    return beacons;
  }, new Map()).values());
}

function id([x, y, z]) {
  return `${x}:${y}:${z}`;
}

function compare([x0, y0, z0], [x1, y1, z1]) {
  return x0 === x1 && y0 === y1 && z0 === z1;
}

function translate([x0, y0, z0], [x1, y1, z1]) {
  return [x0 + x1, y0 + y1, z0 + z1];
}

function rotate(A, [x, y, z]) {
  return [
    x * A[0][0] + y * A[0][1] + z * A[0][2],
    x * A[1][0] + y * A[1][1] + z * A[1][2],
    x * A[2][0] + y * A[2][1] + z * A[2][2],
  ];
}

/* http://www.euclideanspace.com/maths/algebra/matrix/transforms/examples/index.htm */
const rotations = [
  (v) => rotate([[1, 0, 0], [0, 1, 0], [0, 0, 1]], v),
  (v) => rotate([[1, 0, 0], [0, 0, -1], [0, 1, 0]], v),
  (v) => rotate([[1, 0, 0], [0, -1, 0], [0, 0, -1]], v),
  (v) => rotate([[1, 0, 0], [0, 0, 1], [0, -1, 0]], v),
  (v) => rotate([[0, -1, 0], [1, 0, 0], [0, 0, 1]], v),
  (v) => rotate([[0, 0, 1], [1, 0, 0], [0, 1, 0]], v),
  (v) => rotate([[0, 1, 0], [1, 0, 0], [0, 0, -1]], v),
  (v) => rotate([[0, 0, -1], [1, 0, 0], [0, -1, 0]], v),
  (v) => rotate([[-1, 0, 0], [0, -1, 0], [0, 0, 1]], v),
  (v) => rotate([[-1, 0, 0], [0, 0, -1], [0, -1, 0]], v),
  (v) => rotate([[-1, 0, 0], [0, 1, 0], [0, 0, -1]], v),
  (v) => rotate([[-1, 0, 0], [0, 0, 1], [0, 1, 0]], v),
  (v) => rotate([[0, 1, 0], [-1, 0, 0], [0, 0, 1]], v),
  (v) => rotate([[0, 0, 1], [-1, 0, 0], [0, -1, 0]], v),
  (v) => rotate([[0, -1, 0], [-1, 0, 0], [0, 0, -1]], v),
  (v) => rotate([[0, 0, -1], [-1, 0, 0], [0, 1, 0]], v),
  (v) => rotate([[0, 0, -1], [0, 1, 0], [1, 0, 0]], v),
  (v) => rotate([[0, 1, 0], [0, 0, 1], [1, 0, 0]], v),
  (v) => rotate([[0, 0, 1], [0, -1, 0], [1, 0, 0]], v),
  (v) => rotate([[0, -1, 0], [0, 0, -1], [1, 0, 0]], v),
  (v) => rotate([[0, 0, -1], [0, -1, 0], [-1, 0, 0]], v),
  (v) => rotate([[0, -1, 0], [0, 0, 1], [-1, 0, 0]], v),
  (v) => rotate([[0, 0, 1], [0, 1, 0], [-1, 0, 0]], v),
  (v) => rotate([[0, 1, 0], [0, 0, -1], [-1, 0, 0]], v),
];

class Distance {
  beaconA;
  beaconB;

  constructor(beaconA, beaconB) {
    this.beaconA = beaconA;
    this.beaconB = beaconB;
  }

  get value() {
    const euclideanDistance = (this.beaconA[0] - this.beaconB[0]) ** 2
      + (this.beaconA[1] - this.beaconB[1]) ** 2
      + (this.beaconA[2] - this.beaconB[2]) ** 2;

    const dx = this.beaconA.x - this.beaconB.x;
    const dy = this.beaconA.y - this.beaconB.y;
    const dz = this.beaconA.z - this.beaconB.z;

    const min = Math.min(Math.abs(dx), Math.abs(dy), Math.abs(dz));
    const max = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));

    return `${euclideanDistance}:${min}:${max}`;
  }
}

class Scanner {
  id;
  beacons;
  coordinates;

  constructor(id) {
    this.id = id;
    this.beacons = [];
    this.coordinates = null;
  }

  get distances() {
    let distances = [];
    for (let i = 0; i < this.beacons.length; i++) {
      const beaconA = this.beacons[i];
      for (let j = i + 1; j < this.beacons.length; j++) {
        if (i !== j) {
          const beaconB = this.beacons[j];
          const distance = new Distance(beaconA, beaconB);
          distances.push(distance);
        }
      }
    }
    return distances;
  }
}

function getScanners(data) {
  const lines = data.split('\n');

  const scanners = [];

  // Generate scanners
  let idx = 0;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i++];
    if (line.startsWith('--- scanner')) {
      const scanner = new Scanner(idx++);
      scanners.push(scanner);

      while (i < lines.length && lines[i] !== '') {
        const [x, y, z] = lines[i++].split(',');
        const beacon = [parseInt(x), parseInt(y), parseInt(z)];
        scanner.beacons.push(beacon);
      }
    }
  }

  // Compute absolute coordinates
  scanners[0].coordinates = [0, 0, 0];
  let todo = [];
  let visited = new Map();
  todo.push(scanners[0]);

  while (todo.length > 0) {
    const scannerA = todo.shift();
    visited.set(scannerA.id, scannerA);

    const distancesA = scannerA.distances;

    for (let i = 1; i < scanners.length; i++) {
      const scannerB = scanners[i];

      if (!visited.get(i)) {
        const distancesB = scannerB.distances;
        let overlappedDistances = 0;
        let overlappedDistancesA = [];
        let overlappedDistancesB = [];
        for (let j = 0; j < distancesA.length; j++) {
          const distanceA = distancesA[j];
          for (let k = 0; k < distancesB.length; k++) {
            const distanceB = distancesB[k];
            if (distanceA.value === distanceB.value) {
              overlappedDistances++;
              overlappedDistancesA.push(distanceA);
              overlappedDistancesB.push(distanceB);
            }
          }
        }
        if (overlappedDistances >= 66) {
          // 66 -> minimum number of distances in common that corresponds to 12 common beacons
          const beaconsA = getBeaconsFromDistances(overlappedDistancesA);
          const beaconsB = getBeaconsFromDistances(overlappedDistancesB);

          let transformation = null;
          for (let l = 0; l < 24 && !transformation; l++) {
            const rotate = rotations[l];
            const rotatedBeaconsB = beaconsB.map(rotate);

            const beaconA0 = beaconsA[0];
            for (let m = 0; m < rotatedBeaconsB.length && !transformation; m++) {
              const beaconBj = rotatedBeaconsB[m];
              const translation = [beaconA0[0] - beaconBj[0], beaconA0[1] - beaconBj[1], beaconA0[2] - beaconBj[2]];

              const transformedBeaconsB = rotatedBeaconsB.map(b => translate(b, translation));
              const matchingBeacons = [];
              for (let n = 1; n < beaconsA.length && !transformation; n++) {

                const beaconAk = beaconsA[n];
                const matchingBeacon = transformedBeaconsB.find(b => compare(b, beaconAk));

                if (matchingBeacon) {
                  matchingBeacons.push(matchingBeacon);
                }

                if (matchingBeacons.length > 10) {
                  transformation = { rotate, translation };
                }
              }
            }
          }
          if (!transformation) {
            throw new Error('Transformation not found');
          }

          // Find inverse transformation

/*
          let opposedTranslation = [-transformation.translation[0], -transformation.translation[1], -transformation.translation[2]];
          let inverseRotation;
          let b0 = beaconsB[0];
          for (let p = 0; p < rotations.length && !inverseRotation; p++) {
            const r = rotations[p];
            for (let q = 0; q < beaconsA.length && !inverseRotation; q++) {
              const a = beaconsA[q];
              if (compare(r(translate(a, opposedTranslation)), b0)) {
                inverseRotation = r;
              }
            }
          }
          if (!inverseRotation) throw new Error('Inverse rotation not found');
*/

          if (!scannerB.coordinates) {
            scannerB.coordinates = translate(transformation.rotate([0, 0, 0]), transformation.translation);
            scannerB.beacons = scannerB.beacons.map(b => translate(transformation.rotate(b), transformation.translation));
          }
          todo.push(scannerB);
        }
      }
    }
  }
  return scanners;
}

function partOne(data) {
  const scanners = getScanners(data);

  const uniqueBeacons = scanners.reduce((beacons, scanner) => {
    scanner.beacons.forEach((beacon) => {
      if (!beacons.get(id(beacon))) {
        beacons.set(id(beacon), beacon);
      }
    });
    return beacons;
  }, new Map());

  console.log(uniqueBeacons);

  return uniqueBeacons.size;
}

function partTwo(data) {
  const scanners = getScanners(data);

  let largestManhattanDistance = 0;
  for (let i = 0; i < scanners.length; i++) {
    const scannerA = scanners[i];
    for (let j = i + 1; j < scanners.length; j++) {
      const scannerB = scanners[j];
      const manhattanDistance =
        Math.abs(scannerB.coordinates[0] - scannerA.coordinates[0]) +
        Math.abs(scannerB.coordinates[1] - scannerA.coordinates[1]) +
        Math.abs(scannerB.coordinates[2] - scannerA.coordinates[2]);
      console.log(`scannerA=${scannerA.id}, scannerB=${scannerB.id}, manhattanDistance=${manhattanDistance}`);
      if (manhattanDistance > largestManhattanDistance) {
        largestManhattanDistance = manhattanDistance;
      }
    }
  }
  return largestManhattanDistance;
}

module.exports = { partOne, partTwo };
