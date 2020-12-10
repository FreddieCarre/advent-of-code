import { readFile } from '../utils/fileParser.js';

const getOrderedJolts = () => {
  return readFile('./day_10/input.txt')
    .map(v => parseInt(v))
    .sort((a, b) => a - b);
};

const getNextAdapter = (currentJolts, list) => {
  return list.find(v => v > currentJolts && v < (currentJolts + 4));
};

const partOne = () => {
  const list = getOrderedJolts()

  const jumps = [
    0,
    0,
    1
  ];

  let jolts = 0;
  let next;

  while (next = getNextAdapter(jolts, list)) {
    const jump = next - jolts;
    jolts = next;

    jumps[jump-1] = jumps[jump-1] + 1;
  }

  return jumps[0] * jumps[2];
};

const partTwo = () => {
  /**
   * Need to find all transitions between 0 (wall) and the input maximum (which then gets boosted +3 by the device)
   */
  const list = [0, ...getOrderedJolts()];
  const max = list.slice(-1)[0];
  const paths = { [max]: 1 }; // Store number of transitions from each adapter, starting at max (can only go to device)

  for (let i = max - 1; i >= 0; i--) {
    if (list.includes(i)) {
      paths[i] = [1,2,3].map(jump => paths[i + jump] || 0)
        .reduce((a, b) => a + b);
    }
  }

  return paths[0];
};

console.log("Part One");
console.log(partOne());

console.log("Part Two");
console.log(partTwo());
