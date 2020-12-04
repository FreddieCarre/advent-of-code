import { readFileSync } from 'fs';

const getPassports = () => {
  const file = readFileSync('./day_4/input.txt', 'utf8');

  return file
    .split('\n\n')
    .map(p => p.split(/\s/))
    .map(p => p.filter(f => !/cid:\d+/.test(f)));
};

const hasRequired = (passport) => {
  return [
    'pid',
    'eyr',
    'byr',
    'hcl',
    'iyr',
    'ecl',
    'hgt'
  ].map(f => {
    return passport.find(p => p.startsWith(f));
  })
  .filter(v => !v)
  .reduce((acc, v) => acc && v, true);
};

const fieldsAreValid = (passportObj) => {
  console.log(passportObj);
  const byr = parseInt(passportObj.byr) >= 1920 &&
    parseInt(passportObj.byr) <= 2002;

  const iyr = parseInt(passportObj.iyr) >= 2010 &&
    parseInt(passportObj.iyr) <= 2020;

  const eyr = parseInt(passportObj.eyr) >= 2020 &&
    parseInt(passportObj.eyr) <= 2030;

  const hcl = /#[0-9a-f]{6}/.test(passportObj.hcl);

  const ecl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    .includes(passportObj.ecl);

  const pid = /^\d{9}$/.test(passportObj.pid);

  const units = passportObj.hgt.slice(-2);
  const height = parseInt(passportObj.hgt.slice(0, passportObj.hgt.length - 2));

  const hgt = (units === 'cm' && height >= 150 && height <= 193) ||
    (units === 'in' && height >= 59 && height <= 76);

  return byr && iyr && eyr && hcl && ecl && pid && hgt;
};

const partOne = () => {
  return getPassports()
    .filter(hasRequired)
    .length;
};

const partTwo = () => {
  return getPassports()
    .filter(hasRequired)
    .map(p => {
      return p
        .filter(Boolean)
        .reduce((acc, f) => {
        const [key, value] = f.split(':');
        acc[key] = value;

        return acc;
      }, {});
    })
    .filter(fieldsAreValid)
    .length;
};

console.log(partOne());
console.log(partTwo());
