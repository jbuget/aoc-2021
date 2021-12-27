const fs = require('fs');
const { partOne, partTwo } = require('./index');


describe('part one', () => {

  it('simple', () => {
    // given
    const data = fs.readFileSync(`${__dirname}/input_1.test.txt`, 'utf8').trim();

    // when
    const actual = partOne(data);

    // then
    expect(actual).toStrictEqual(39);
  });

  it('advanced', () => {
    // given
    const data = fs.readFileSync(`${__dirname}/input_2.test.txt`, 'utf8').trim();

    // when
    const actual = partOne(data);

    // then
    expect(actual).toStrictEqual(590784);
  });
});

describe('part two', () => {

  it('should ', () => {
    // given
    const data = fs.readFileSync(`${__dirname}/input.test.txt`, 'utf8').trim();

    // when
    const actual = partTwo(data);

    // then
    expect(actual).toStrictEqual('TODO');
  });
});
