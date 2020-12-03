import { readFile } from '../utils/fileParser.js';

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  };

  move(dX, dY) {
    const x = this.x + dX;
    const y = this.y + dY;

    return new Point(x, y);
  }
};

const START_POINT = new Point(0, 0);

const constructSlope = () => {
  return readFile('./day_3/input.txt');
};

const partOne = (movement) => {
  let position = START_POINT;

  return constructSlope()
    .map((r, i) => {
      if (position.y !== i) {
        return false;
      }

      if (position.x >= r.length) {
        position.x = position.x - r.length;
      }

      const spot = r[position.x];
      position = position.move(movement.x, movement.y);

      return spot === '#';
    })
    .filter(Boolean)
    .length;
};

const partTwo = () => {
  return [
    { x: 1, y: 1},
    { x: 3, y: 1},
    { x: 5, y: 1},
    { x: 7, y: 1},
    { x: 1, y: 2},
  ].map(m => partOne(m)).reduce((a, b) => a * b);
};

console.log("Part One:");
console.log(partOne({ x: 3, y: 1 }));

console.log("Part Two:");
console.log(partTwo());
