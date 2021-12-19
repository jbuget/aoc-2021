const { partOne, partTwo } = require('./index');

describe('part one', () => {

  [
    { input: 'D2FE28', expected: 6 },
    { input: '8A004A801A8002F478', expected: 16 },
    { input: '620080001611562C8802118E34', expected: 12 },
    { input: 'C0015000016115A2E0802F182340', expected: 23 },
    { input: 'A0016C880162017C3686B18A3D4780', expected: 31 },
  ].forEach((usecase) => {
    it(`${usecase.input} should be ${usecase.expected}`, () => {
      // when
      const actual = partOne(usecase.input);

      // then
      expect(actual).toStrictEqual(usecase.expected);
    });
  })
});

describe('part two', () => {

  [
    { input: 'D2FE28', expected: 2021 },
    { input: '8A004A801A8002F478', expected: 15 },
    { input: '620080001611562C8802118E34', expected: 46 },
    { input: 'C0015000016115A2E0802F182340', expected: 46 },
    { input: 'A0016C880162017C3686B18A3D4780', expected: 54 },
    { input: 'C200B40A82', expected: 3 },
    { input: '04005AC33890', expected: 54 },
    { input: '880086C3E88112', expected: 7 },
    { input: 'CE00C43D881120', expected: 9 },
    { input: 'D8005AC2A8F0', expected: 1 },
    { input: 'F600BC2D8F', expected: 0 },
    { input: '9C005AC2F8F0', expected: 0 },
    { input: '9C0141080250320F1802104A08', expected: 1 },
  ].forEach((usecase) => {
    it(`${usecase.input} should be ${usecase.expected}`, () => {
      // when
      const actual = partTwo(usecase.input);

      // then
      expect(actual).toStrictEqual(usecase.expected);
    });
  })
});
