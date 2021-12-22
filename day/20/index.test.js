const fs = require('fs');
const {
  partOne,
  partTwo,
  selectInputPixels,
  convertPixelsToBinaryNumber,
  getOutputPixelFromBinaryNumber,
  countLitPixels
} = require('./index');

const data = fs.readFileSync(`${__dirname}/input.test.txt`, 'utf8').trim();

describe('#selectInputPixels', () => {

  it('should ', () => {
    // given
    const inputImage = [
      '#..#.',
      '#....',
      '##..#',
      '..#..',
      '..###',
    ];

    // when
    const actual = selectInputPixels(inputImage, [5, 10]);

    // then
    expect(actual).toStrictEqual('...#...#.');
  });
});

describe('#convertPixelsToBinaryNumber', () => {

  it('middle pixel [5,10]', () => {
    // when
    const actual = convertPixelsToBinaryNumber('...#...#.');

    // then
    expect(actual).toStrictEqual('000100010');
  });

  it('top-left pixel [0,0]', () => {
    // when
    const actual = convertPixelsToBinaryNumber('...#...#.');

    // then
    expect(actual).toStrictEqual('000100010');
  });
});

describe('#getOutputPixelFromBinaryNumber', () => {

  it('should ', () => {
    // given
    const imageEnhancementAlgorithm = '..#.#..#####.#.#.#.###.##.....###.##.#..###.####..';

    // when
    const actual = getOutputPixelFromBinaryNumber(imageEnhancementAlgorithm, '000100010');

    // then
    expect(actual).toStrictEqual('#');
  });
});

describe('#countLitPixels', () => {

  it('should ', () => {
    // given
    const image =  [
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
    const actual =countLitPixels(image);

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
