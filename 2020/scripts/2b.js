const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/2.txt';
const input = inputReader.getLines(inputPath);

function parse(line) {
    const [rule, password] = line.split(':').map(str => str.trim());
    const boundsGroups = rule.match(/^(\d+)-(\d+)/);
    const [index1, index2] = boundsGroups.slice(1).map(val => Number(val) - 1);
    const target = rule.match(/\w$/)[0]; 
    return {
        rule: {
            index1, 
            index2,
            target,
        },
        password
    }
}
const parsedInput = input.map(parse);
// console.log(parsedInput);
const validPasswords = parsedInput.filter(({password, rule: {index1, index2, target}}) =>
    password[index1] === target 
    ? password[index2] !== target
    : password[index2] === target
);

console.log(validPasswords.length);