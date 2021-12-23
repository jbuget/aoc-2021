const fs = require('fs');
const {
  partOne,
  partTwo,
  convertPixelsToBinaryNumberString,
  getOutputPixelFromBinaryNumber,
  countLitPixels
} = require('./index');

const data = fs.readFileSync(`${__dirname}/input.test.txt`, 'utf8').trim();


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

xdescribe('part two', () => {

  it('should ', () => {
    // when
    const actual = partTwo(data);

    // then
    expect(actual).toStrictEqual(3351);
  });
});
