const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/1.txt';
const input = inputReader.getNumbers(inputPath);

for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
        if (input[i] + input[j] === 2020) {
            console.log(`i: ${i}, input[i]: ${input[i]}, j: ${j}, input[j]: ${input[j]}`);
            console.log(input[i] * input[j]);
        }
    }
}