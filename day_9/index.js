import { readFile } from '../utils/fileParser.js';

const getInstructions = () => {
  return readFile('./day_9/input.txt')
    .map(v => parseInt(v));
};

const partOne = () => {
  return getInstructions()
    .filter((v, i, a) => {
      if (i < 25) {
        return false;
      }
      const previous = a.slice((i - 25), i);

      for (let i = 0; i < previous.length; i++) {
        for (let j = 0; j < previous.length; j++) {
          if (previous[i] + previous[j] === v) {
            return false;
          }
        }
      }
      return true;
    }).pop();
};

const partTwo = () => {
  const TARGET = partOne();

  return getInstructions()
    .reduce((acc, _v, i, arr) => {
      let sum = 0;
      let p = i;

      while (sum < TARGET) {
        sum += arr[p];
        p++;
      };

      if (sum === TARGET && p > i+1) {
        acc = arr.slice(i, p);
      }

      return acc;
    }, [])
    .filter((v, _i, a) => {
      return v === Math.min(...a) || v === Math.max(...a);
    })
    .reduce((a, b) => a + b);

};

console.log("Part One:");
console.log(partOne());

console.log("Part Two:");
console.log(partTwo());
