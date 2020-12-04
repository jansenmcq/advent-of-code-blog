const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/4.txt';
const input = inputReader.readFile(inputPath);

const eyeColors = [
  'amb',
  'blu',
  'brn',
  'gry',
  'grn',
  'hzl',
  'oth'
];

const requiredFields = {
  'byr': value => {
    const asNumber = Number(value);
    return asNumber >= 1920 && asNumber <= 2002;
  },
  'iyr': value => {
    const asNumber = Number(value);
    return asNumber >= 2010 && asNumber <= 2020;
  },
  'eyr': value => {
    const asNumber = Number(value);
    return asNumber >= 2020 && asNumber <= 2030;
  },
  'hgt': value => {
    const split = value.match(/^(\d+)(\w+)$/);
    const number = Number(split[1]);
    const tag = split[2];
    if (tag === 'cm') {
      return number >= 150 && number <= 193;
    } else if (tag === 'in') {
      return number >= 59 && number <= 76;
    } else {
      return false;
    }
  },
  'hcl': value => {
    const test = new RegExp(/^#[0-9a-f]{6}$/);
    return test.test(value);
  },
  'ecl': value => {
    return eyeColors.includes(value);
  },
  'pid': value => {
    const test = new RegExp(/^\d{9}$/);
    return test.test(value);
  }
};

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
  for (const field in requiredFields) {
    const validator = requiredFields[field];
    if (!passport.hasOwnProperty(field) || !validator(passport[field])) {
      return false;
    }
  }
  return true;
}

const validPassports = passports.filter(isValid);

console.log(validPassports.length);

