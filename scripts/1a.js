const inputReader = require('./utilities/inputReaderUtility');
const inputPath = 'input/1.txt';

const input = inputReader.getNumbers(inputPath);

let sum = 0;

for (let number of input) {
  sum += number;
}

console.log(sum);
return sum;
