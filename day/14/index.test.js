const fs = require('fs');
const { partOne, partTwo } = require('./index');

const data = fs.readFileSync(`${__dirname}/input.test.txt`, 'utf8').trim();

describe('part one', () => {

  it('should ', () => {
    // when
    const actual = partOne(data);

    // then
    const expected = 1588;
    expect(actual).toStrictEqual(expected);
  });
});

describe('part two', () => {

  it('should ', () => {
    // when
    const actual = partTwo(data);

    // then
    const expected = 2188189693529;
    expect(actual).toStrictEqual(expected);
  });
});
