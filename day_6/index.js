import { readFileSync } from 'fs';

const getGroups = () => {
  return readFileSync('./day_6/input.txt', 'utf8')
    .split('\n\n')
    .map(group => {
      return group
        .split('\n')
        .filter(Boolean)
    });
};

const partOne = () => {
  return getGroups()
    .map(group => {
      return group
        .map(v => v.split(''))
        .flat()
        .filter((val, i, arr) => {
          return arr.indexOf(val) === i
        }).length;
    })
    .reduce((a, b) => a + b);
};

const partTwo = () => {
  return getGroups()
    .map(group => {
      return group
        .map(v => v.split(''))
        .reduce((acc, val) => {
          return acc
            .filter(v => val.indexOf(v) !== -1);
        }).length;
    })
    .reduce((a, b) => a + b);
};

console.log('Part One:');
console.log(partOne());
console.log('Part Two:');
console.log(partTwo());
