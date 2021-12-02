function countValuesLargerThanThePreviousOne(values) {
  let lastValue = null;
  return values.reduce((result, currentValue) => {
    if (lastValue && currentValue > lastValue) {
      result++;
    }
    lastValue = currentValue;
    return result;
  }, 0);
}

function partOne(data) {
  const measurements = data.split('\n').map((line) => parseInt(line.trim()));
  return countValuesLargerThanThePreviousOne(measurements);
}

function partTwo(data) {

  function getSlidingWindows(data) {
    let beforeLastMeasurement = null;
    let lastMeasurement = null;

    const measurements = data.split('\n').map((line) => parseInt(line.trim()));

    return measurements.reduce((windows, currentMeasurement, index) => {
      if (index === 0) {
        beforeLastMeasurement = currentMeasurement;
        return windows;
      }
      if (index === 1) {
        lastMeasurement = currentMeasurement;
        return windows;
      }
      windows.push(beforeLastMeasurement + lastMeasurement + currentMeasurement);

      beforeLastMeasurement = lastMeasurement;
      lastMeasurement = currentMeasurement;

      return windows;
    }, []);
  }

  const windows = getSlidingWindows(data);
  return countValuesLargerThanThePreviousOne(windows);
}

module.exports = [partOne, partTwo];
