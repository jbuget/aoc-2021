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

function partOne(data) {
  const lines = data.trim().split('\n');
  return lines.reduce((sum, line) => {
    const illegalCharacter = getIllegalCharacter(line);
    return illegalCharacter ? sum + getIllegalCharacterScore(illegalCharacter) : sum;
  }, 0);
}

function partTwo(data) {
  return 'TODO';
}

module.exports = { partOne, partTwo };
