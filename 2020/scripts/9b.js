const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/9.txt';
const input = inputReader.getNumbers(inputPath);

const invalidNumber = 1504371145;

for (let i = 0; i < input.length; i++) {
    let sum = input[i];

    let j = i + 1;
    while (sum < invalidNumber) {
        sum += input[j];
        j++;
    }
    if (sum === invalidNumber) {
        const contiguousSet = input.slice(i, j);
        contiguousSet.sort((a,b) => Number(a) - Number(b));
        console.log(contiguousSet[contiguousSet.length-1] + contiguousSet[0]);
        break;
    }
}