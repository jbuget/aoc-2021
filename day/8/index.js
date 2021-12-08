String.prototype.sort = function() {
  return this.split('').sort().join('');
}

String.prototype.union = function(str) {
  if (!str || str.length === 0) return this;
  return str.split('').reduce((r, c) => {
    if (!r.includes(c)) r += c;
    return r.sort();
  }, this);
}

function partOne(data) {
  const lines = data.split('\n');
  const nb1478 = lines.reduce((count, line) => {
    const [uniqueSignalPatternsValue, fourDigitOutputValue] = line.split(' | ');
    const digits = fourDigitOutputValue.trim().split(' ');
    digits.forEach(digit => {
      if (digit.length === 2 || digit.length === 3 || digit.length === 4 || digit.length === 7) {
        count++;
      }
    });
    return count;
  }, 0);
  return nb1478;
}

function partTwo(data) {
  const lines = data.split('\n');
  return lines.reduce((count, line) => {
    const [uniqueSignalPatternsValue, fourDigitOutputValue] = line.split(' | ');

    // compute Segments
    const signalPatterns = uniqueSignalPatternsValue.split(' ').map((signal) => signal.sort());

    const segments = Array(10);
    segments.fill('');

    // 8 always equals 'abcdefg'
    segments[8] = 'abcdefg';

    // First, find 1, 4, 7
    signalPatterns.forEach((signalPattern) => {
      switch (signalPattern.length) {
        case 2: segments[1] = signalPattern; break;
        case 3: segments[7] = signalPattern; break;
        case 4: segments[4] = signalPattern; break;
      }
    });

    // Then, find 0, 2, 3, 6, 9
    signalPatterns.forEach((signalPattern) => {
      if (signalPattern.length === 5) {
        if (signalPattern.union(segments[4]).length === 7) {
          segments[2] = signalPattern;
        } else {
          if (signalPattern.union(segments[1]).length === 6) {
            segments[5] = signalPattern;
          } else {
            segments[3] = signalPattern;
          }
        }
      }
      if (signalPattern.length === 6) {
        if (signalPattern.union(segments[4]).length !== 7) {
          segments[9] = signalPattern;
        } else {
          if (signalPattern.union(segments[1]).length !== 7) {
            segments[0] = signalPattern;
          } else {
            segments[6] = signalPattern;
          }
        }
      }
    });

    const valueBySignal = new Map();
    for (let i = 0 ; i < 10 ; i++) {
      valueBySignal.set(segments[i], i);
    }

    function decode(digit) {
      return valueBySignal.get(digit.sort());
    }

    let outputValue = parseInt(fourDigitOutputValue.split(' ').reduce((result, digit) => result + decode(digit), ''));
    return count + outputValue;
  }, 0);
}

module.exports = { partOne, partTwo };
