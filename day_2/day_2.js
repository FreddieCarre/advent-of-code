import { readFile } from '../utils/fileParser.js';

const getPwRule = (row) => {
  const [rule, pw] = row.split(':').map(v => v.trim());

  const [limits, c] = rule.split(' ');
  const [atLeast, atMost] = limits.split('-').map(Number);

  return {
    pw,
    character: c,
    atLeast,
    atMost
  };
};

const getOrderedList = () => {
  return readFile('./day_2/input.txt')
    .filter(Boolean)
    .map(getPwRule);
};

const partOne = (orderedList) => {
  return orderedList.filter(v => {
    const re = new RegExp(v.character, 'g');
    const occurances = v.pw.match(re) || [];

    const count = occurances.length;

    return count >= v.atLeast &&
      count <= v.atMost;
  }).length;
};

const partTwo = (orderedList) => {
  return orderedList.filter(v => {
    const chars = [v.pw[v.atLeast - 1], v.pw[v.atMost - 1]];

    const [a, b] = chars.map(c => c === v.character);

    return a !== b;
  }).length;
};

console.log("Part One: ")
console.log(partOne(getOrderedList()));

console.log("Part Two: ")
console.log(partTwo(getOrderedList()));
