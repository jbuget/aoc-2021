const fs = require('fs');
const { partOne, partTwo } = require('./index');

const data = fs.readFileSync(`${__dirname}/input.test.txt`, 'utf8').trim();

describe('part one', () => {

  it('should ', () => {
    // when
    const actual = partOne(data);

    // then
    expect(actual).toStrictEqual(4140);
  });
});

describe('part two', () => {

  it('should ', () => {
    // when
    const actual = partTwo(data);

    // then
    expect(actual).toStrictEqual(3993);
  });
});
