const inputReader = require('../utilities/inputReaderUtility');
const inputPath = 'input/1.txt';

const input = inputReader.getNumbers(inputPath);

let intermediateSums = {};
let previousSum = input[0];
intermediateSums[previousSum] = true;
let index = 1;

while(true) {
  let currentInput = input[index];
  previousSum = previousSum + currentInput;
  if (intermediateSums[previousSum]) {
    console.log(previousSum);
    return previousSum;
  }

  intermediateSums[previousSum] = true;

  if (index === input.length - 1) {
    index = 0;
  } else {
    index++;
  }
}
