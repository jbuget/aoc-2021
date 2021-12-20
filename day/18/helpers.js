class SnailfishNumber {

  left;
  right;

  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
}

class Token {
  type;
  value;

  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

function newOpeningHookToken() {
  return new Token('OPENING_HOOK', '[');
}

function newClosingHookToken() {
  return new Token('CLOSING_HOOK', ']');
}

function newCommaToken() {
  return new Token('COMMA', ',');
}

function newRegularNumberToken(value) {
  return new Token('REGULAR_NUMBER', value);
}

function isDigit(char) {
  return char >= '0' && char <= '9';
}

function tokenize(pair) {
  let tokens = [];
  for (let i = 0; i < pair.length; i++) {
    const char = pair[i];
    if (char === '[') tokens.push(newOpeningHookToken());
    if (char === ']') tokens.push(newClosingHookToken());
    if (char === ',') tokens.push(newCommaToken());
    if (isDigit(char)) {
      let regularNumber = `${char}`;
      if (isDigit(pair[i + 1])) {
        regularNumber += pair[i++ + 1];
      }
      tokens.push(newRegularNumberToken(parseInt(regularNumber)));
    }
  }
  return tokens;
}

function parse(expression, start, blockLevel) {
  let left = null;
  let right = null;

  let offset = start;
  let parsingLevel = blockLevel;

  while (offset < expression.length) {
    const char = expression[offset];

    if (isDigit(char)) {
      let i = offset;
      let regularNumber = '';
      while (isDigit(expression[i])) {
        regularNumber += expression[i++];
      }
      regularNumber = parseInt(regularNumber);
      return { number: regularNumber, offset: i };
    }

    if (char === ']') {
      parsingLevel--;
      offset++;
      if (parsingLevel === blockLevel) {
        return { number: new SnailfishNumber(left, right), offset };
      }
    }

    if (char === '[') {
      parsingLevel++;
      const { number, offset: i } = parse(expression, ++offset, parsingLevel);
      left = number;
      offset = i;
    }

    if (char === ',') {
      const { number, offset: i } = parse(expression, ++offset, parsingLevel);
      right = number;
      offset = i;
    }
  }
}

function sum(pairs) {
  return pairs.reduce((accu, pair) => {
    if (!accu) {
      return pair;
    }
    return reduce(`[${accu}, ${pair}]`);
  });
}

function reduce(pair) {
  let reducing = pair;
  let isReduced = false;

  // To reduce a snailfish number, you must repeatedly do the first action in
  // this list that applies to the snailfish number:
  while (!isReduced) {

    // If any pair is nested inside four pairs, the leftmost such pair explodes.
    const exploded = explode(reducing);
    if (exploded !== reducing) {
      reducing = exploded;
      continue;
    }

    // If any regular number is 10 or greater, the leftmost such regular number splits.
    const splitted = split(reducing);
    if (splitted !== reducing) {
      reducing = splitted;
      continue;
    }

    isReduced = true;
  }
  return reducing;
}

function explode(pair) {
  const tokens = tokenize(pair);

  let i = 0;
  let exploded = false;
  let nestingLevel = 0;
  let explodedTokens = [];
  while (i < tokens.length) {
    const token = tokens[i];

    if (exploded) {
      explodedTokens.push(token);
      i++;
      continue;
    }

    switch (token.type) {
      case 'OPENING_HOOK': {
        nestingLevel++;
        if (nestingLevel >= 5 && tokens[i + 1].type === 'REGULAR_NUMBER' && tokens[i + 3].type === 'REGULAR_NUMBER') {
          // … the pair's left value is added to the first regular number to the left of the exploding pair (if any), …
          const pairLeftToken = tokens[i + 1];
          explodedTokens.reverse();
          const leftmostRegularNumberToken = explodedTokens.find((t) => t.type === 'REGULAR_NUMBER');
          explodedTokens.reverse();
          if (leftmostRegularNumberToken) {
            leftmostRegularNumberToken.value += pairLeftToken.value;
          }

          // … and the pair's right value is added to the first regular number to the right of the exploding pair (if any)
          const pairRightToken = tokens[i + 3];
          const rightmostRegularNumberToken = tokens.find((t, index) => (index > i + 3 && t.type === 'REGULAR_NUMBER'));
          if (rightmostRegularNumberToken) {
            rightmostRegularNumberToken.value += pairRightToken.value;
          }

          // "Then, the entire exploding pair is replaced with the regular number"
          explodedTokens.push(newRegularNumberToken(0));

          i += 5;
          exploded = true;
        } else {
          explodedTokens.push(token);
          i++;
        }
        break;
      }
      case 'CLOSING_HOOK': {
        nestingLevel--;
        explodedTokens.push(token);
        i++;
        break;
      }
      case 'COMMA':
      case 'REGULAR_NUMBER':
      default:
        explodedTokens.push(token);
        i++;
    }
  }
  return explodedTokens.reduce((res, token) => res + token.value, '');
}

function split(pair) {
  const tokens = tokenize(pair);

  let i = 0;
  let splitted = false;
  let splittedTokens = [];
  while (i < tokens.length) {
    const token = tokens[i];

    if (splitted) {
      splittedTokens.push(token);
      i++;
      continue;
    }

    if (token.type === 'REGULAR_NUMBER' && token.value > 9) {
      splittedTokens.push(newOpeningHookToken());
      splittedTokens.push(newRegularNumberToken(Math.floor(token.value / 2)));
      splittedTokens.push(newCommaToken());
      splittedTokens.push(newRegularNumberToken(Math.ceil(token.value / 2)));
      splittedTokens.push(newClosingHookToken());

      splitted = true;
      i++;
    } else {
      splittedTokens.push(token);
      i++;
    }
  }
  return splittedTokens.reduce((res, token) => res + token.value, '');
}

function magnitude(pair) {
  return recursiveMagnitude(pair).number;
}

function recursiveMagnitude(expression, start = 0, blockLevel = 0) {
  let left = 0;
  let right = 0;

  let offset = start;
  let parsingLevel = blockLevel;

  while (offset < expression.length) {
    const char = expression[offset];

    if (isDigit(char)) {
      let i = offset;
      let regularNumber = '';
      while (isDigit(expression[i])) {
        regularNumber += expression[i++];
      }
      regularNumber = parseInt(regularNumber);
      return { number: regularNumber, offset: i };
    }

    if (char === ']') {
      parsingLevel--;
      offset++;
      if (parsingLevel === blockLevel) {
        return { number: (3 * left + 2 * right), offset };
      }
    }

    if (char === '[') {
      parsingLevel++;
      const { number, offset: i } = recursiveMagnitude(expression, ++offset, parsingLevel);
      left = number;
      offset = i;
    }

    if (char === ',') {
      const { number, offset: i } = recursiveMagnitude(expression, ++offset, parsingLevel);
      right = number;
      offset = i;
    }
  }
}

module.exports = { SnailfishNumber, parse, sum, reduce, explode, split, magnitude };
