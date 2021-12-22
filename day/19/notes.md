setRelativeCoordinates(x0, y0, z0) {
this.relativeCoordinates = { x: x0, y: y0, z: z0 };
}

findSharedBeacon(overlappingScanner) {
const sharedDistancesA = this.sharedDistances.get(overlappingScanner.id);
const sharedDistancesB = overlappingScanner.sharedDistances.get(this.id);

    let distance1InA = sharedDistancesA[0];
    let distance1InB = sharedDistancesB.find(d => d.fingerprint === distance1InA.fingerprint);
    let distance2InB = sharedDistancesB.find(d => (d.beaconA === distance1InB.beaconA || d.beaconB === distance1InB.beaconA) && d.fingerprint !== distance1InB.fingerprint);
    let distance2InA = sharedDistancesA.find(d => d.fingerprint === distance2InB.fingerprint);
    let sharedBeacon = { a: null, b: distance1InB.beaconA };
    if (distance1InA.beaconA.id === distance2InA.beaconA.id) {
      sharedBeacon.a = distance1InA.beaconA;
    } else {
      if (distance1InA.beaconB.id === distance2InA.beaconA.id) {
        sharedBeacon.a = distance1InA.beaconB;
      } else {
        sharedBeacon.a = distance2InA.beaconB;
      }
    }
    return sharedBeacon;
}
