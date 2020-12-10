const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/9.txt';
const input = inputReader.getNumbers(inputPath);

const preamble = input.slice(0,25);

function isValidNumber(number) {
    for (let i = 0; i < preamble.length - 1; i++) {
        for (let j = i + 1; j < preamble.length; j++) {
            if (preamble[i] + preamble[j] === number) {
                return true;
            }
        }
    }
    return false;
}

for (let i = 25; i < input.length; i++) {
    const number = input[i];
    if (!isValidNumber(number)) {
        console.log(i);
        console.log(number);
        break;
    }
    preamble.shift();
    preamble.push(number);
}