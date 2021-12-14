function extractData(data) {
  return data.split('\n').reduce((result, line, index) => {
    if (index === 0) {
      result.polymerTemplate = line;
      return result;
    }
    if (line) {
      const [pair, element] = line.split(' -> ');
      result.pairInsertionRules[pair] = element;
      return result;
    }
    return result;
  }, { polymerTemplate: null, pairInsertionRules: {} });
}

function applySteps(polymerTemplate, pairInsertionRules, steps) {
  let polymer = polymerTemplate;
  console.log('polymer =', polymer);

  for (let s = 0; s < steps; s++) {
    let tmpPolymer = '';
    const nbInsertions = polymer.length - 1;
    for (let i = 0; i < nbInsertions; i++) {
      const elementA = polymer[i];
      const elementB = polymer[i + 1];
      tmpPolymer += elementA + pairInsertionRules[`${elementA}${elementB}`];
    }
    tmpPolymer += polymer[nbInsertions];
    polymer = tmpPolymer;
    console.log('polymer =', polymer);
  }
  return polymer;
}

function applySteps2(polymerTemplate, pairInsertionRules, steps) {
  let pairs = {};

  const nbInsertions = polymerTemplate.length - 1;
  for (let i = 0; i < nbInsertions; i++) {
    const elementA = polymerTemplate[i];
    const elementB = polymerTemplate[i + 1];
    const key = `${elementA}${elementB}`;
    if (!pairs[key]) {
      pairs[key] = { key, count: 0 };
    }
    pairs[key].count++;
  }

  for (let s = 0; s < steps; s++) {
    pairs = Object.values(pairs).reduce((newPairs, oldPair) => {
      const [elementA, elementB] = oldPair.key.split('');
      const newElement = pairInsertionRules[oldPair.key];

      let keyLeft = `${elementA}${newElement}`;
      if (!newPairs[keyLeft]) {
        newPairs[keyLeft] = { key: keyLeft, count: oldPair.count };
      } else {
        newPairs[keyLeft].count = newPairs[keyLeft].count + oldPair.count;
      }

      let keyRight = `${newElement}${elementB}`;
      if (!newPairs[keyRight]) {
        newPairs[keyRight] = { key: keyRight, count: oldPair.count };
      } else {
        newPairs[keyRight].count = newPairs[keyRight].count + oldPair.count;
      }

      return newPairs;
    }, {});
  }

  return pairs;
}

function partOne(data) {
  const { polymerTemplate, pairInsertionRules } = extractData(data);
  const pairs = applySteps1(polymerTemplate, pairInsertionRules, 10);
  const quantityByElement = Object.values(pairs).reduce((quantityByElement, pair) => {
    const char = pair.key[0];
    if (!quantityByElement[char]) {
      quantityByElement[char] = 0;
    }
    quantityByElement[char] = quantityByElement[char] + pair.count;
    return quantityByElement;
  }, {});
  const lastChar = polymerTemplate[polymerTemplate.length - 1];
  quantityByElement[lastChar]++;

  const quantities = Object.values(quantityByElement).sort((a, b) => a - b);
  let quantityOfTheLeastCommonElement = quantities[0];
  let quantityOfTheMostCommonElement = quantities[quantities.length - 1];
  return quantityOfTheMostCommonElement - quantityOfTheLeastCommonElement;
}

function partTwo(data) {
  const { polymerTemplate, pairInsertionRules } = extractData(data);
  const pairs = applySteps2(polymerTemplate, pairInsertionRules, 40);
  const quantityByElement = Object.values(pairs).reduce((quantityByElement, pair) => {
    const char = pair.key[0];
    if (!quantityByElement[char]) {
      quantityByElement[char] = 0;
    }
    quantityByElement[char] = quantityByElement[char] + pair.count;
    return quantityByElement;
  }, {});
  const lastChar = polymerTemplate[polymerTemplate.length - 1];
  quantityByElement[lastChar]++;

  const quantities = Object.values(quantityByElement).sort((a, b) => a - b);
  let quantityOfTheLeastCommonElement = quantities[0];
  let quantityOfTheMostCommonElement = quantities[quantities.length - 1];
  return quantityOfTheMostCommonElement - quantityOfTheLeastCommonElement;
}

module.exports = { partOne, partTwo };
