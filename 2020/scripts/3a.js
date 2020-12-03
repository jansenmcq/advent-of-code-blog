const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/3.txt';
const input = inputReader.getLines(inputPath);

let xPosition = 0;
let yPosition = 0;
let trees = 0;

for (;yPosition < input.length; yPosition++) {
  const thisLine = input[yPosition];
  if (thisLine[xPosition] === '#') {
    trees++;
  }
  
  xPosition += 3;
  xPosition %= thisLine.length;
}
console.log(trees);