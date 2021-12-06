const fs = require('fs');
const { partOne, partTwo, Lanternfish } = require('./index');

const data = fs.readFileSync(`${__dirname}/input.test.txt`, 'utf8').trim();

describe('part one', () => {

  it('should ', () => {
    // when
    const actual = partOne(data);

    // then
    const expected = 5934;
    expect(actual).toStrictEqual(expected);
  });
});

describe('part two', () => {

  it('should ', () => {
    // when
    const actual = partTwo(data);

    // then
    const expected = 26984457539;
    expect(actual).toStrictEqual(expected);
  });
});

describe('Lanternfish', () => {

  describe('#length', () => {

    it('should return the size of the lanternfish’s family', () => {
      // given
      const daddyLanternfish = new Lanternfish(3);
      daddyLanternfish.addChild(new Lanternfish(4));
      daddyLanternfish.addChild(new Lanternfish(3));
      daddyLanternfish.addChild(new Lanternfish(1));
      daddyLanternfish.addChild(new Lanternfish(0));

      const lanternfishWithChildren = new Lanternfish(6);
      lanternfishWithChildren.addChild(new Lanternfish(0));
      lanternfishWithChildren.addChild(new Lanternfish(8));
      daddyLanternfish.addChild(lanternfishWithChildren);

      // when
      const actual = daddyLanternfish.length;

      // then
      expect(actual).toBe(8);
    });
  });

  describe('#processADay', () => {

    it('should add children if needed', () => {
      // given
      const daddyLanternfish = new Lanternfish(3);
      daddyLanternfish.addChild(new Lanternfish(4));
      daddyLanternfish.addChild(new Lanternfish(3));
      daddyLanternfish.addChild(new Lanternfish(1));
      daddyLanternfish.addChild(new Lanternfish(0));

      const lanternfishWithChildren = new Lanternfish(6);
      lanternfishWithChildren.addChild(new Lanternfish(0));
      lanternfishWithChildren.addChild(new Lanternfish(8));
      daddyLanternfish.addChild(lanternfishWithChildren);

      // when
      daddyLanternfish.processADay();

      // then
      expect(daddyLanternfish.length).toBe(10);
    });
  });

});
