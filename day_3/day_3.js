import { readFile } from '../utils/fileParser.js';

const constructSlope = () => {
  return readFile('./day_3/input.txt');
};

const partOne = (x, y) => {
  return constructSlope()
    .filter((_, i) => i % y === 0)
    .filter((row, i) => row[(i * x) % row.length] === '#')
    .length;
};

const partTwo = () => {
  return [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ].map(m => partOne(...m)).reduce((a, b) => a * b);
};

console.log("Part One:");
console.log(partOne(3, 1));

console.log("Part Two:");
console.log(partTwo());
