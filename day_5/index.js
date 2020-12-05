import { readFile } from '../utils/fileParser.js';

const getPositions = () => {
  return readFile('./day_5/input.txt');
};

const getSeatIds = () => {
  return getPositions()
    .map(position => {
      return parseInt(
        position.replace(/[BR]/g, '1').replace(/[FL]/g,'0'),
        2
      );
    });
};

const partOne = () => {
  return getSeatIds()
    .reduce((acc, v) => Math.max(acc, v), 0);
};

const partTwo = () => {
  return getSeatIds()
    .sort((a, b) => a - b)
    .find((v, i, srcArr) => {
      const adjustedIndex = i + srcArr[0];

      return v !== adjustedIndex;
    }) - 1 // Find function gets the first seat ID after the empty one (which is effectively === emptySeatId + 1).;
};

console.log('Part one:');
console.log(partOne());

console.log('Part two:');
console.log(partTwo());
