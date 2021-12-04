const [partOne, partTwo] = require('./index');
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}/input.test.txt`, 'utf8');

describe('part one', () => {

  it('should ', () => {
    // given

    // when
    const actual = partOne(data);

    // then
    const expected = 'TODO';
    expect(actual).toStrictEqual(expected);
  });
});

describe('part two', () => {

  it('should ', () => {
    // given

    // when
    const actual = partTwo(data);

    // then
    const expected = 'TODO';
    expect(actual).toStrictEqual(expected);
  });
});
