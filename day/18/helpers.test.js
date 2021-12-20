const { sum, isReduced, reduction, explosion, splitting, magnitude } = require('./helpers');

describe('#sum', () => {

  [
    { input: ['[1,2]', '[[3,4],5]'], expected: '[[1,2],[[3,4],5]]' },
    { input: ['[1,1]', '[2,2]', '[3,3]', '[4,4]'], expected: '[[[[1,1],[2,2]],[3,3]],[4,4]]' },
    { input: ['[1,1]', '[2,2]', '[3,3]', '[4,4]', '[5,5]'], expected: '[[[[3,0],[5,3]],[4,4]],[5,5]]' },
    { input: ['[1,1]', '[2,2]', '[3,3]', '[4,4]', '[5,5]', '[6,6]'], expected: '[[[[5,0],[7,4]],[5,5]],[6,6]]' },
  ].forEach(usecase => {
    it(`adding "${usecase.input}" should return "${usecase.expected}"`, () => {
      // when
      const actual = sum(usecase.input);

      // then
      expect(actual).toStrictEqual(usecase.expected);
    });
  });


  it('should ', () => {
    // given
    const left = '[[[[4,3],4],4],[7,[[8,4],9]]]';
    const right = '[1,1]';

    // when
    const actual = sum(left, right);

    // then
    expect(actual).toStrictEqual('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]');
  });
});

describe('#isReduced', () => {

  [
    { input: '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]', expected: false },
    { input: '[[[[0,7],4],[7,[[8,4],9]]],[1,1]]', expected: false },
    { input: '[[[[0,7],4],[15,[0,13]]],[1,1]]', expected: false },
    { input: '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]', expected: false },
    { input: '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]', expected: false },
    { input: '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]', expected: true },
  ].forEach(usecase => {
    it(`exploding "${usecase.input}" should return "${usecase.expected}"`, () => {
      // when
      const actual = isReduced(usecase.input);

      // then
      expect(actual).toStrictEqual(usecase.expected);
    });
  });
});

describe('#reduction', () => {

  it('should ', () => {
    // given

    // when

    // then
  });
});


describe('#explosion', () => {

  [
    { input: '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]', expected: '[[[[0,7],4],[7,[[8,4],9]]],[1,1]]' },
    { input: '[[[[0,7],4],[7,[[8,4],9]]],[1,1]]', expected: '[[[[0,7],4],[15,[0,13]]],[1,1]]' },
    { input: '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]', expected: '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]' },
    { input: '[[[[[9,8],1],2],3],4]', expected: '[[[[0,9],2],3],4]' },
    { input: '[7,[6,[5,[4,[3,2]]]]]', expected: '[7,[6,[5,[7,0]]]]' },
    { input: '[[6,[5,[4,[3,2]]]],1]', expected: '[[6,[5,[7,0]]],3]' },
    { input: '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]', expected: '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]' },
    { input: '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]', expected: '[[3,[2,[8,0]]],[9,[5,[7,0]]]]' },
  ].forEach(usecase => {
    it(`exploding "${usecase.input}" should return "${usecase.expected}"`, () => {
      // when
      const actual = explosion(usecase.input);

      // then
      expect(actual).toStrictEqual(usecase.expected);
    });
  });
});

describe('#splitting', () => {

  [
    { input: '10', expected: '[5,5]' },
    { input: '11', expected: '[5,6]' },
    { input: '12', expected: '[6,6]' },
    { input: '[[[[0,7],4],[15,[0,13]]],[1,1]]', expected: '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]' },
    { input: '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]', expected: '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]' },
  ].forEach(usecase => {
    it(`splitting "${usecase.input}" should return "${usecase.expected}"`, () => {
      // when
      const actual = splitting(usecase.input);

      // then
      expect(actual).toStrictEqual(usecase.expected);
    });
  });
});

describe('#magnitude', () => {

  [
    { input: '[9,1]', expected: 29 },
    { input: '[1,9]', expected: 21 },
    { input: '[[9,1],[1,9]]', expected: 129 },
    { input: '[[1,2],[[3,4],5]]', expected: 143 },
    { input: '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]', expected: 1384 },
    { input: '[[[[1,1],[2,2]],[3,3]],[4,4]]', expected: 445 },
    { input: '[[[[3,0],[5,3]],[4,4]],[5,5]]', expected: 791 },
    { input: '[[[[5,0],[7,4]],[5,5]],[6,6]]', expected: 1137 },
    { input: '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]', expected: 3488 },
    { input: '[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]', expected: 4140 },
  ].forEach(usecase => {
    it(`magnitude of "${usecase.input}" should be "${usecase.expected}"`, () => {
      // when
      const actual = magnitude(usecase.input);

      // then
      expect(actual).toStrictEqual(usecase.expected);
    });
  });
});
