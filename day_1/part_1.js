import { readFile } from '../utils/fileParser.js';

const getOrderedList = () => {
  return readFile('./day_1/input.txt')
    .map(v => parseInt(v))
    .filter(Number.isInteger)
    .sort((a, b) => a - b);
}

const partOne = (total, orderedList) => {
  if (orderedList.length < 2) {
    return null;
  }
  const smallest = orderedList[0];
  const largest = orderedList.slice(-1)[0];
  const sum = smallest + largest;

  if (sum > total) {
    return partOne(total, orderedList.slice(0,-1));
  }

  if (sum < total) {
    return partOne(total, orderedList.slice(1));
  }

  return [smallest, largest];
};

const partTwo = (orderedList) => {
  return orderedList.map((v, i, arr) => {
    const others = partOne(2020 - v, arr.slice(i + 1));

    if (others !== null) {
      const sum = [v, ...others].reduce((a, b) => a + b);

      if (sum === 2020) {
        console.log('found');
        return [v, ...others];
      };
    }
  }).filter(Boolean)
    .shift();
};

console.log("Part One: ")
console.log(partOne(2020, getOrderedList()).reduce((a, b) => a * b));

console.log("Part Two: ")
console.log(partTwo(getOrderedList()).reduce((a, b) => a * b));
