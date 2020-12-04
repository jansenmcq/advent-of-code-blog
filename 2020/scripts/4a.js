const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/4.txt';
const input = inputReader.readFile(inputPath);

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
];

const rawPassports = input.split('\n\n');

function parsePassports(raw) {
  const items = raw.match(/[^\s:]+:[^\s]+/g);
  const passport = {};
  for (const item of items) {
    const [key, value] = item.split(':');
    passport[key] = value;
  }

  return passport;
}

const passports = rawPassports.map(parsePassports);

function isValid(passport) {
  for (const field of requiredFields) {
    if (!passport.hasOwnProperty(field)) {
      return false;
    }
  }
  return true;
}

const validPassports = passports.filter(isValid);

console.log(validPassports.length);

