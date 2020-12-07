import { readFile } from '../utils/fileParser.js';

const searchForBag = (allBags, bagArr) => {
  let results = [];

  bagArr.forEach(bag => {
    const newBags = allBags[bag];
    if (newBags) {
      results = results.concat(newBags);
      results = results.concat(searchForBag(allBags, newBags));
    }
  });

  return results.filter((bag, i, arr) => arr.indexOf(bag) === i);
};

const partOne = () => {
  const bags = readFile('./day_7/input.txt')
    .reduce((acc, rule) => {
      const [_, outer, inners] = /^(.+) bags contain (.+).$/g.exec(rule);
      const inArray = inners.split(', ')
        .filter(b => b !== 'no other bags')
        .map(b => b.replace(/\d\s/, ''))
        .map(b => b.replace(/\sbag[s]{0,1}/, ''));

      inArray.forEach(v => {
        if (!Object.keys(acc).includes(v)) {
          acc[v] = [];
        }

        if (!acc[v].includes(outer)) {
          acc[v].push(outer);
        }
      });

      return acc;
    }, {});

  return searchForBag(bags, ['shiny gold']).length;
};

const getContainedBags = (allBags, bagArr) => {
  return bagArr.reduce((acc, v) => {
    const newBags = allBags[v.colour];
    const contained = Math.max(getContainedBags(allBags, newBags), 0) + 1; // +1 to account for the current bag

    acc += v.number * contained;

    return acc;
  }, 0);
};

const partTwo = () => {
  const bagArr = readFile('./day_7/input.txt')
    .reduce((acc, rule) => {
      const [_, outer, inners] = /^(.+) bag[s]? contain (.+).$/g.exec(rule);
      const inArray = inners.split(', ')
        .filter(b => b !== 'no other bags')
        .map(b => {
          const [_, number, colour] = /(\d) (.+) bag/.exec(b);

          return {
            number: parseInt(number),
            colour
          }
        });

      if (!Object.keys(acc).includes(outer)) {
          acc[outer] = [];
      }

      inArray.forEach(v => {
        if (!acc[outer].includes(v)) {
          acc[outer].push(v);
        }
      });

      return acc;
    }, {});

  return getContainedBags(bagArr, bagArr['shiny gold']);
};

console.log("Part One:");
console.log(partOne());

console.log("Part Two:");
console.log(partTwo());
