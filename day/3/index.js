class Bit {
  countZeros;
  countOnes;

  constructor() {
    this.countZeros = 0;
    this.countOnes = 0;
  }

  increaseZeros() {
    this.countZeros++;
  }

  increaseOnes() {
    this.countOnes++;
  }

  get mostCommonValue() {
    if (!this.countZeros) return '1';
    if (!this.countOnes) return '0';
    return (this.countZeros > this.countOnes) ? '0' : '1';
  }

  get leastCommonValue() {
    if (!this.countZeros) return '1';
    if (!this.countOnes) return '0';
    return (this.countZeros <= this.countOnes) ? '0' : '1';
  }
}

class Analysis {
  bits;

  constructor(nbBits) {
    this.bits = [];
    for (let i = 0 ; i < nbBits ; i++) {
      this.bits.push(new Bit());
    }
  }

  computeBinaryNumbers(binaryNumbers) {
    binaryNumbers.forEach((binaryNumber) => {
      this.computeBinaryNumber(binaryNumber);
    });
  }

  computeBinaryNumber(binaryNumber) {
    for (let i = 0 ; i < binaryNumber.length ; i++) {
      const char = binaryNumber[i];
      this.increaseBit(i, char);
    }
  }

  increaseBit(index, char) {
    const bit = this.bits[index];
    (char === '0') ? bit.increaseZeros() : bit.increaseOnes();
  }
}

function partOne(data) {

  function getBinaryGammaRateFromDiagnosticReport(binaryNumbers) {
    const analysisReport = new Analysis(12);
    analysisReport.computeBinaryNumbers(binaryNumbers);
    return this.bits.reduce((result, bit) => {
      result += bit.mostCommonValue;
      return result;
    }, '');
  }

  function getBinaryEpsilonRateFromBinaryGammaRate(binaryGammaRate) {
    let binaryEpsilonRate = '';
    for (let i = 0 ; i < binaryGammaRate.length ; i++) {
      binaryEpsilonRate += (binaryGammaRate[i] === '0') ? '1' : '0';
    }
    return binaryEpsilonRate;
  }

  function getPowerConsumption(binaryGammaRate, binaryEpsilonRate) {
    return parseInt(binaryGammaRate, 2) * parseInt(binaryEpsilonRate, 2);
  }

  const binaryNumbers = data.split('\n');
  const binaryGammaRate = getBinaryGammaRateFromDiagnosticReport(binaryNumbers);
  const binaryEpsilonRate = getBinaryEpsilonRateFromBinaryGammaRate(binaryGammaRate);
  return getPowerConsumption(binaryGammaRate, binaryEpsilonRate);
}

function partTwo(data) {

  function getOxygenGeneratorRating(binaryNumbers) {

    function computeOxygenGeneratorRating(binaryNumbers, bitPosition) {
      if (binaryNumbers.length === 1) {
        return binaryNumbers[0];
      }
      const analysisReport = new Analysis(12);
      analysisReport.computeBinaryNumbers(binaryNumbers);
      const bit = analysisReport.bits[bitPosition];
      const bitCriteria = bit.mostCommonValue;
      const remainingNumbers = binaryNumbers.filter((binaryNumber) => binaryNumber[bitPosition] === bitCriteria);
      return computeOxygenGeneratorRating(remainingNumbers, bitPosition + 1);
    }

    const binaryCO2ScrubberRating = computeOxygenGeneratorRating(binaryNumbers, 0);
    return parseInt(binaryCO2ScrubberRating, 2);
  }

  function getCO2ScrubberRating(binaryNumbers) {

    function computeCO2ScrubberRating(binaryNumbers, bitPosition) {
      if (binaryNumbers.length === 1) {
        return binaryNumbers[0];
      }
      const analysisReport = new Analysis(12);
      analysisReport.computeBinaryNumbers(binaryNumbers);
      const bit = analysisReport.bits[bitPosition];
      const bitCriteria = bit.leastCommonValue;
      const remainingNumbers = binaryNumbers.filter((binaryNumber) => binaryNumber[bitPosition] === bitCriteria);
      return computeCO2ScrubberRating(remainingNumbers, bitPosition + 1);
    }

    const binaryCO2ScrubberRating = computeCO2ScrubberRating(binaryNumbers, 0);
    return parseInt(binaryCO2ScrubberRating, 2);
  }

  function getLifeSupportRating(oxygenGeneratorRating, cO2ScrubberRating) {
    return oxygenGeneratorRating * cO2ScrubberRating;
  }

  const binaryNumbers = data.split('\n');
  const oxygenGeneratorRating = getOxygenGeneratorRating(binaryNumbers);
  const cO2ScrubberRating = getCO2ScrubberRating(binaryNumbers);
  return getLifeSupportRating(oxygenGeneratorRating, cO2ScrubberRating);
}

module.exports = [partOne, partTwo];
