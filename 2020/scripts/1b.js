const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/1.txt';
const input = inputReader.getNumbers(inputPath);


for (let i = 0; i < input.length - 2; i++) {
    for (let j = i + 1; j < input.length - 1; j++) {
        for (let k = j + 1; k < input.length; k++) {
            if (input[i] + input[j] + input[k] === 2020) {
                console.log(`i: ${i}, input[i]: ${input[i]}, j: ${j}, input[j]: ${input[j]}, k: ${k}, input[k]: ${input[k]}`);
                console.log(input[i] * input[j] * input[k]);
            }
        }
    }
}