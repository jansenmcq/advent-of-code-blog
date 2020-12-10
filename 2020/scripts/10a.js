const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/10.txt';
const input = inputReader.getNumbers(inputPath);

input.sort((a,b) => a - b);

// first adapter - 0
let oneDiffCounter = input[0];
// Device adapter being 3 higher than highest device
let threeDiffCounter = 1;

let twoDiffCounter = 0;
for (let i = 1; i < input.length; i++) {
  const previousJoltage = input[i-1];
  const currentJoltage = input[i];
  switch(currentJoltage - previousJoltage) {
    case 1:
      oneDiffCounter++;
      break;
    case 3:
      threeDiffCounter++;
      break;
  }
}
console.log(oneDiffCounter * threeDiffCounter);