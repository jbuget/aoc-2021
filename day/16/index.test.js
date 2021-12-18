const fs = require('fs');
const { partOne, partTwo, hex2bin, getPacketsFromBinaryTransmission, Packet } = require('./index');

xdescribe('#getPacketsFromBinaryTransmission', () => {

  [{
    input: 'D2FE28', expected: '110100101111111000101000',
    input: '38006F45291200', expected: '00111000000000000110111101000101001010010001001000000000',
    input: 'EE00D40C823060', expected: '11101110000000001101010000001100100000100011000001100000',
  }].forEach((usecase) => {
    it(`Packet#versionSum for "${usecase.input}" should be '${usecase.expected}')`, () => {
      // const
      const binaryTransmission = hex2bin(usecase.input);

      // when
      const actual = getPacketsFromBinaryTransmission(binaryTransmission);

      // then
      expect(actual).toStrictEqual(usecase.expected);
    });
  });
});

/*
describe('class Packet', () => {

  describe('#version', () => {

    [{
      input: '110100101111111000101000', expected: 6,
      input: '00111000000000000110111101000101001010010001001000000000', expected: 1,
      input: '11101110000000001101010000001100100000100011000001100000', expected: 7,
    }].forEach((usecase) => {
      it(`Packet#version for "${usecase.input}" should be "${usecase.expected}"`, () => {
        // given
        const packet = new Packet(usecase.input)

        // when
        const actual = packet.version;

        // then
        expect(actual).toBe(usecase.expected);
      });
    });
  });

  describe('#typeID', () => {

    [{
      input: '110100101111111000101000', expected: 4,
      input: '00111000000000000110111101000101001010010001001000000000', expected: 6,
      input: '11101110000000001101010000001100100000100011000001100000', expected: 3,
    }].forEach((usecase) => {
      it(`Packet#typeID for "${usecase.input}" should be "${usecase.expected}"`, () => {
        // given
        const packet = new Packet(usecase.input)

        // when
        const actual = packet.typeID;

        // then
        expect(actual).toBe(usecase.expected);
      });
    });
  });

  describe('#isLiteralValue', () => {

    it('should return "true" only if typeID does equal 4', () => {
      // true
      expect(new Packet('110100101111111000101000').isLiteralValue).toBeTruthy();

      // false
      expect(new Packet('00111000000000000110111101000101001010010001001000000000').isLiteralValue).toBeFalsy();
      expect(new Packet('11101110000000001101010000001100100000100011000001100000').isLiteralValue).toBeFalsy();
    });
  });

  describe('#literalValue', () => {

    it('should be ok', () => {
      // given
      const packet = new Packet('D2FE28', true);

      // when
      const literalValue = packet.literalValue;

      // then
      expect(literalValue).toBe(2021);
    });
  });


  describe('#isOperator', () => {

    it('should return "true" only if typeID does not equal 4', () => {
      // true
      expect(new Packet('110100101111111000101000').isOperator).toBeFalsy();

      // false
      expect(new Packet('00111000000000000110111101000101001010010001001000000000').isOperator).toBeTruthy();
      expect(new Packet('11101110000000001101010000001100100000100011000001100000').isOperator).toBeTruthy();
    });
  });

  describe('#lengthTypeID', () => {

    it('should be ok', () => {
      expect(new Packet('00111000000000000110111101000101001010010001001000000000').lengthTypeId).toBe(0);
      expect(new Packet('11101110000000001101010000001100100000100011000001100000').lengthTypeId).toBe(1);
    });
  });

  describe('#subpacketsTotalLength', () => {

    it('should be ok', () => {
      expect(new Packet('00111000000000000110111101000101001010010001001000000000').subpacketsTotalLength).toBe(27);
    });
  });

  describe('#subpacketsNumber', () => {

    it('should be ok', () => {
      expect(new Packet('11101110000000001101010000001100100000100011000001100000').subpacketsNumber).toBe(3);
    });
  });

  xdescribe('#versionSum', () => {

    [{
      input: '8A004A801A8002F478', expected: 16,
      input: '620080001611562C8802118E34', expected: 12,
      input: 'C0015000016115A2E0802F182340', expected: 23,
      input: 'A0016C880162017C3686B18A3D4780', expected: 31,
    }].forEach((usecase) => {
      it(`Packet#versionSum for "${usecase.input}" should be '${usecase.expected}')`, () => {
        // given
        const packet = new Packet(usecase.input);

        // when
        const actual = packet.versionSum;

        // then
        expect(actual).toStrictEqual(usecase.expected);
      });
    });
  });
});
*/

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

xdescribe('part two', () => {

  it('should ', () => {
    // when
    const actual = partTwo(data);

    // then
    const expected = 'TODO';
    expect(actual).toStrictEqual(expected);
  });
});
