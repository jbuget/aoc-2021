function partOne(data) {

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
      return (this.countZeros > this.countOnes) ? '0' : '1';
    }
  }

  class AnalysisReport {
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

    get binaryResult() {
      return this.bits.reduce((result, bit) => {
        result += bit.mostCommonValue;
        return result;
      }, '');
    }
  }

  function getBinaryGammaRateFromDiagnosticReport(binaryNumbers) {
    const analysisReport = new AnalysisReport(12);
    analysisReport.computeBinaryNumbers(binaryNumbers);
    return analysisReport.binaryResult;
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

  const diagnosticReport = data.split('\n');
  const binaryGammaRate = getBinaryGammaRateFromDiagnosticReport(diagnosticReport);
  const binaryEpsilonRate = getBinaryEpsilonRateFromBinaryGammaRate(binaryGammaRate);
  return getPowerConsumption(binaryGammaRate, binaryEpsilonRate);
}

function partTwo(data) {
  // TODO
}

module.exports = [partOne, partTwo];
