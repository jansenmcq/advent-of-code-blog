const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/2.txt';
const input = inputReader.getLines(inputPath);

function parse(line) {
    const [rule, password] = line.split(':').map(str => str.trim());
    const boundsGroups = rule.match(/^(\d+)-(\d+)/);
    const [lowerBound, upperBound] = boundsGroups.slice(1).map(Number);
    const target = rule.match(/\w$/)[0]; 
    return {
        rule: {
            lowerBound, 
            upperBound,
            target,
        },
        password
    }
}

let validPasswords = 0;
const parsedInput = input.map(parse);

parsedInput.forEach(entry => {
    let count = 0;
    for (const letter of entry.password) {

        if (letter === entry.rule.target) {
            count++;
        }
    }
    console.log(entry, count);
    if (count >= entry.rule.lowerBound && count <= entry.rule.upperBound) {
        validPasswords++;
    }
});

console.log(validPasswords);