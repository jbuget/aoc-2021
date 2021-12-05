const fs = require('fs');
const { Point, Diagram, Segment, getSegmentsFromInput, getHorizontalOrVerticalSegments } = require('./utils');

const data = fs.readFileSync(`${__dirname}/input.test.txt`, 'utf8');

describe('#getSegmentsFromInput', () => {

  it('should ', () => {
    // given

    // when
    const actual = getSegmentsFromInput(data);

    // then
    const expected = [
      new Segment(0, 9, 5, 9),
      new Segment(8, 0, 0, 8),
      new Segment(9, 4, 3, 4),
      new Segment(2, 2, 2, 1),
      new Segment(7, 0, 7, 4),
      new Segment(6, 4, 2, 0),
      new Segment(0, 9, 2, 9),
      new Segment(3, 4, 1, 4),
      new Segment(0, 0, 8, 8),
      new Segment(5, 5, 8, 2),
    ]
    expect(actual).toStrictEqual(expected);
  });

});

describe('#getHorizontalOrVerticalSegements', () => {

  it('should ', () => {
    // given
    const segments = [
      new Segment(0, 9, 5, 9),
      new Segment(8, 0, 0, 8),
      new Segment(9, 4, 3, 4),
      new Segment(2, 2, 2, 1),
      new Segment(7, 0, 7, 4),
      new Segment(6, 4, 2, 0),
      new Segment(0, 9, 2, 9),
      new Segment(3, 4, 1, 4),
      new Segment(0, 0, 8, 8),
      new Segment(5, 5, 8, 2),
    ]

    // when
    const actual = getHorizontalOrVerticalSegments(segments);

    // then
    const expected = [
      new Segment(0, 9, 5, 9),
      new Segment(9, 4, 3, 4),
      new Segment(2, 2, 2, 1),
      new Segment(7, 0, 7, 4),
      new Segment(0, 9, 2, 9),
      new Segment(3, 4, 1, 4),
    ];
    expect(actual).toStrictEqual(expected);
  });
})

describe('Diagram', () => {

  describe('#Constructor', () => {

    it('should declare an array of 1000x1000 (without points)', () => {
      // given

      // when
      const actual = new Diagram();

      // then
      expect(actual.points.length).toBe(1000);
      expect(actual.points[0].length).toBe(1000);
      expect(actual.points[999].length).toBe(1000);
    });
  });

  describe('#computeSegments', () => {

    it('should ', () => {
      // given
      const diagram = new Diagram();
      const segments = [
        new Segment(0,0, 0, 3),
        new Segment(0,0, 3, 0),
      ];

      // when
      diagram.computeSegments(segments);

      // then
      expect(diagram.points[0][0]).toStrictEqual(new Point(0, 0, 2));
      expect(diagram.points[0][1]).toStrictEqual(new Point(0, 1, 1));
      expect(diagram.points[0][2]).toStrictEqual(new Point(0, 2 ,1));
      expect(diagram.points[0][3]).toStrictEqual(new Point(0, 3 ,1));

      expect(diagram.points[1][0]).toStrictEqual(new Point(1, 0, 1));
      expect(diagram.points[2][0]).toStrictEqual(new Point(2, 0, 1));
      expect(diagram.points[3][0]).toStrictEqual(new Point(3, 0, 1));
    });
  });

});

describe('Segment', () => {

  describe('#orientation', () => {

    it('should be "HORIZONTAL"', () => {
      // given
      const segment = new Segment(0, 0, 3, 0);

      // when
      const actual = segment.orientation;

      // then
      expect(actual).toBe('HORIZONTAL');
    });

    it('should be "VERTICAL"', () => {
      // given
      const segment = new Segment(0, 0, 0, 3);

      // when
      const actual = segment.orientation;

      // then
      expect(actual).toBe('VERTICAL');
    });

    it('should be "DIAGONAL"', () => {
      // given
      const segment = new Segment(0, 0, 2, 2);

      // when
      const actual = segment.orientation;

      // then
      expect(actual).toBe('DIAGONAL');
    });
  });

  describe('#length', () => {

    it('vertical', () => {
      // given
      const segment = new Segment(0, 0, 0, 2);

      // when
      const actual = segment.length;

      // then
      expect(actual).toBe(3);
    });

    it('horizontal', () => {
      // given
      const segment = new Segment(0, 0, 2, 0);

      // when
      const actual = segment.length;

      // then
      expect(actual).toBe(3);
    });

    it('diagonal', () => {
      // given
      const segment = new Segment(3, 3, 0, 0);

      // when
      const actual = segment.length;

      // then
      expect(actual).toBe(4);
    });
  });
});
