import { readFile } from '../utils/fileParser.js';

const ROWS = 127;
const COLS = 7;

const getPositions = () => {
  return readFile('./day_5/input.txt');
};

const getSeatIds = () => {
  return getPositions()
    .map(b => {
      return b.split('').reduce((acc, position) => {
        if (position === 'B') {
          acc.lRow = Math.ceil((acc.uRow + acc.lRow) / 2);
        }
        if (position === 'F') {
          acc.uRow = Math.floor((acc.uRow + acc.lRow) / 2);
        }
        if (position === 'R') {
          acc.lCol = Math.ceil((acc.lCol + acc.uCol) / 2);
        }
        if (position === 'L') {
          acc.uCol = Math.floor((acc.lCol + acc.uCol) / 2);
        }

        return acc;
      }, {
        lRow: 0,
        uRow: ROWS,
        lCol: 0,
        uCol: COLS
      });
    }).map(o => (o.lRow * 8) + o.lCol);
};

const partOne = () => {
  return getSeatIds()
    .reduce((acc, v) => Math.max(acc, v), 0);
};

const partTwo = () => {
  return getSeatIds()
    .sort((a, b) => a - b)
    .find((v, i, srcArr) => {
      const adjIndex = i + srcArr[0];

      return v !== adjIndex;
    }) - 1 // Find function gets the first seat ID after the empty one (which is effectively === emptySeatId + 1).;
};

console.log('Part one:');
console.log(partOne());

console.log('Part two:');
console.log(partTwo());
