const fs = require('fs');
const { partOne, partTwo } = require('./index');

describe('part one', () => {

  it('small', () => {
    // given
    const data = fs.readFileSync(`${__dirname}/input_1.test.txt`, 'utf8').trim();

    // when
    const actual = partOne(data);

    // then
    const expected = 10;
    expect(actual).toStrictEqual(expected);
  });

  it('medium', () => {
    // given
    const data = fs.readFileSync(`${__dirname}/input_2.test.txt`, 'utf8').trim();

    // when
    const actual = partOne(data);

    // then
    const expected = 19;
    expect(actual).toStrictEqual(expected);
  });

  it('large', () => {
    // given
    const data = fs.readFileSync(`${__dirname}/input_3.test.txt`, 'utf8').trim();

    // when
    const actual = partOne(data);

    // then
    const expected = 226;
    expect(actual).toStrictEqual(expected);
  });
});

describe('part two', () => {

  it('small', () => {
    // given
    const data = fs.readFileSync(`${__dirname}/input_1.test.txt`, 'utf8').trim();

    // when
    const actual = partTwo(data);

    // then
    const expected = 36;
    expect(actual).toStrictEqual(expected);
  });

  it('medium', () => {
    // given
    const data = fs.readFileSync(`${__dirname}/input_2.test.txt`, 'utf8').trim();

    // when
    const actual = partTwo(data);

    // then
    const expected = 103;
    expect(actual).toStrictEqual(expected);
  });

  it('large', () => {
    // given
    const data = fs.readFileSync(`${__dirname}/input_3.test.txt`, 'utf8').trim();

    // when
    const actual = partTwo(data);

    // then
    const expected = 3509;
    expect(actual).toStrictEqual(expected);
  });
});
