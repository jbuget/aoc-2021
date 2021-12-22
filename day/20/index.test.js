const fs = require('fs');
const {
  partOne,
  partTwo,
  selectInputPixels,
  convertPixelsToBinaryNumberString,
  getOutputPixelFromBinaryNumber,
  countLitPixels
} = require('./index');

const data = fs.readFileSync(`${__dirname}/input.test.txt`, 'utf8').trim();

describe('#selectInputPixels', () => {

  [
    { pixel: [5, 10], expected: '...#...#.' },
    { pixel: [0, 0], expected: '....#..#.' },
    { pixel: [1, 0], expected: '...#..#..' },
    { pixel: [0, 1], expected: '.#..#..##' },
    { pixel: [4, 4], expected: '...##....' },
  ].forEach((usecase) => {
    it(`selectInputPixels(${usecase.pixel}) should be "${usecase.expected}"`, () => {
      // given
      const inputImage = [
        '#..#.',
        '#....',
        '##..#',
        '..#..',
        '..###',
      ];

      // when
      const actual = selectInputPixels(inputImage, usecase.pixel);

      // then
      expect(actual).toStrictEqual(usecase.expected);
    });
  });
});

describe('#convertPixelsToBinaryNumberString', () => {

  it('should be ok', () => {
    // when
    const actual = convertPixelsToBinaryNumberString('...#...#.');

    // then
    expect(actual).toStrictEqual('000100010');
  });
});

describe('#getOutputPixelFromBinaryNumber', () => {

  it('should be ok', () => {
    // given
    const imageEnhancementAlgorithm = '..#.#..#####.#.#.#.###.##.....###.##.#..###.####..';

    // when
    const actual = getOutputPixelFromBinaryNumber(imageEnhancementAlgorithm, '000100010');

    // then
    expect(actual).toStrictEqual('#');
  });
});

describe('#countLitPixels', () => {

  it('should be ok', () => {
    // given
    const image = [
      '...............',
      '...............',
      '...............',
      '..........#....',
      '....#..#.#.....',
      '...#.#...###...',
      '...#...##.#....',
      '...#.....#.#...',
      '....#.#####....',
      '.....#.#####...',
      '......##.##....',
      '.......###.....',
      '...............',
      '...............',
      '...............',
    ];

    // when
    const actual = countLitPixels(image);

    // then
    expect(actual).toStrictEqual(35);
  });
});

describe('part one', () => {

  it('should ', () => {
    // when
    const actual = partOne(data);

    // then
    expect(actual).toStrictEqual(35);
  });
});

describe('part two', () => {

  it('should ', () => {
    // when
    const actual = partTwo(data);

    // then
    expect(actual).toStrictEqual('TODO');
  });
});
