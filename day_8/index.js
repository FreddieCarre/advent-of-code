import { readFile } from '../utils/fileParser.js';

const getInstructions = () => {
  return readFile('./day_8/input.txt')
    .map(v => v.split(' '))
    .map(v => [v[0], parseInt(v[1]), false])
};

const runProg = (instr) => {
  let acc = 0;
  let pnt = 0;

  while (!instr[pnt][2]) {
    const [op, input] = instr[pnt];

    instr[pnt][2] = true;

    if (op === 'trm') {
      break;
    };

    if (op === 'jmp') {
      pnt += input;
      continue;
    }

    if (op === 'acc') {
      acc += input;
    }
    pnt += 1;
  };

  return [acc, pnt];
};

const partOne = () => {
  const instr = getInstructions();

  return runProg(instr)[0];
};

const partTwo = () => {
  const masterInstr = getInstructions();
  const swaps = masterInstr
    .map((v, i) => [v[0], i])
    .filter(v => ['jmp', 'nop'].includes(v[0]));

  for (var i = 0; i < swaps.length; i++) {
    const [op, index] = swaps[i];

    const instr = getInstructions();
    instr.push(['trm', +99, true]);

    instr[index][0] = op === 'jmp' ? 'nop' : 'jmp';

    const [acc, pnt] = runProg(instr);

    if (instr[pnt][0] === 'trm') {
      return acc;
    }
  };
};

console.log("Part One:");
console.log(partOne());

console.log("Part Two:");
console.log(partTwo());
