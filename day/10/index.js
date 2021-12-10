function isOpeningCharacter(char) {
  return (char === '(') || (char === '[') || (char === '{') || (char === '<');
}

function getClosingCharacter(char) {
  if (char === '(') return ')';
  if (char === '[') return ']';
  if (char === '{') return '}';
  if (char === '<') return '>';
  throw new Error(`Unknown character "${char}"`);
}

function getIllegalCharacter(line) {
  const expectedCharacters = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (isOpeningCharacter(char)) {
      expectedCharacters.unshift(getClosingCharacter(char));
    } else {
      const expectedClosingChar = expectedCharacters.shift();
      if (char !== expectedClosingChar) {
        return char;
      }
    }
  }
}

function getIllegalCharacterScore(char) {
  if (char === ')') return 3;
  if (char === ']') return 57;
  if (char === '}') return 1197;
  if (char === '>') return 25137;
  throw new Error(`Unknown character "${char}"`);
}

function getUncompletedCharacterScore(char) {
  if (char === ')') return 1;
  if (char === ']') return 2;
  if (char === '}') return 3;
  if (char === '>') return 4;
  throw new Error(`Unknown character "${char}"`);
}

function getUncompletedCharacters(line) {
  const expectedCharacters = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (isOpeningCharacter(char)) {
      expectedCharacters.unshift(getClosingCharacter(char));
    } else {
      expectedCharacters.shift();
    }
  }
  return expectedCharacters;
}

function getIncompleteLineScore(expectedChars) {
  return expectedChars.reduce((score, char) => {
    return (score * 5) + getUncompletedCharacterScore(char);
  }, 0);
}

function partOne(data) {
  const lines = data.trim().split('\n');
  return lines.reduce((sum, line) => {
    const illegalCharacter = getIllegalCharacter(line);
    return illegalCharacter ? sum + getIllegalCharacterScore(illegalCharacter) : sum;
  }, 0);
}

function partTwo(data) {
  const lines = data.trim().split('\n');
  const scores = lines.reduce((arr, line) => {
    const illegalCharacter = getIllegalCharacter(line);
    if (!illegalCharacter) {
      const uncompletedChars = getUncompletedCharacters(line);
      arr.push(getIncompleteLineScore(uncompletedChars));
    }
    return arr;
  }, []).sort((a, b) => a - b);
  return scores[Math.round((scores.length - 1) / 2)];
}

module.exports = { partOne, partTwo };
