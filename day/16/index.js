const _ = require('lodash');

/* https://stackoverflow.com/a/68315766 */
function hex2bin(hexadecimalString) {
  return hexadecimalString.split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('');
}

class Packet {

  version;
  typeID;
  literalValue;
  subpackets;

  constructor(version, typeID, options = {}) {
    this.version = version;
    this.typeID = typeID;
    this.literalValue = options.literalValue;
    this.subpackets = options.subpackets || [];
  }

  get versionSum() {
    return this.subpackets.reduce((sum, packet) => sum + packet.versionSum, this.version);
  }

  get value() {
    switch (this.typeID) {
      case 0:
        return this.subpackets.reduce((sum, packet) => sum + packet.value, 0);
      case 1:
        return this.subpackets.reduce((product, packet) => product * packet.value, 1);
      case 2:
        return _.minBy(this.subpackets, 'value').value;
      case 3:
        return _.maxBy(this.subpackets, 'value').value;
      case 4:
        return this.literalValue;
      case 5:
        return this.subpackets[0].value > this.subpackets[1].value ? 1 : 0;
      case 6:
        return this.subpackets[0].value < this.subpackets[1].value ? 1 : 0;
      case 7:
        return this.subpackets[0].value === this.subpackets[1].value ? 1 : 0;
    }
  }
}

function readLiteralValuePacket(binaryString, start, end, version) {
  let i = start;
  let valueString = '';
  let lastGroupParsed = false;
  let group = binaryString.substring(i, i + 5);
  while (i < binaryString.length && i < end && group.length === 5 && !lastGroupParsed) {
    if (group[0] === '0') {
      lastGroupParsed = true;
    }
    valueString += group.substring(1);
    i += 5;
    group = binaryString.substring(i, i + 5);
  }
  const literalValue = parseInt(valueString, 2);
  const packet = new Packet(version, 4, { literalValue });
  return { packet, offset: i };
}

function getPacketsFromBinaryTransmission(binaryString, start, end, nbPackets = Infinity, packetTypeID) {
  let packets = [];
  let offset = start;
  while (offset < end && packets.length < nbPackets) {
    if (packetTypeID === undefined && (end - offset) < 3) { // end padding
      offset++;
      continue;
    }
    const version = parseInt(binaryString.substring(offset, offset + 3), 2);
    offset += 3;

    const typeID = parseInt(binaryString.substring(offset, offset + 3), 2);
    offset += 3;

    if (typeID === 4) {
      const { packet, offset:i} = readLiteralValuePacket(binaryString, offset, binaryString.length - 1, version);
      packets.push(packet);
      offset = i;
    }
    else {
      const lengthTypeID = parseInt(binaryString.substring(offset, offset + 1), 2);
      offset += 1;

      let endOffset, nbSubpackets;

      if (lengthTypeID === 0 ) {
        endOffset = offset + 15 + parseInt(binaryString.substring(offset, offset + 15), 2);
        offset += 15;
        nbSubpackets = Infinity;
      } else {
        endOffset = binaryString.length - 1;
        nbSubpackets = parseInt(binaryString.substring(offset, offset + 11), 2);
        offset += 11;
      }
      const { packets: subpackets, offset:i } = getPacketsFromBinaryTransmission(binaryString, offset, endOffset, nbSubpackets, typeID);
      const packet = new Packet(version, typeID, { subpackets });
      packets.push(packet);
      offset = i;
    }
  }
  return { packets, offset };
}

function partOne(data) {
  const binaryTransmission = hex2bin(data);
  const { packets } = getPacketsFromBinaryTransmission(binaryTransmission, 0, binaryTransmission.length - 1, Infinity);
  return packets[0].versionSum;
}

function partTwo(data) {
  const binaryTransmission = hex2bin(data);
  const { packets } = getPacketsFromBinaryTransmission(binaryTransmission, 0, binaryTransmission.length - 1, Infinity);
  return packets[0].value;
}

module.exports = { partOne, partTwo, Packet };
