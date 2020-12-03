const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/3.txt';
const input = inputReader.getLines(inputPath);

const slopes = [ 
  { x: 1, y: 1 }, 
  { x: 3, y: 1,}, 
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
]
const treeResults = [];

for (const slope of slopes) {

  let xPosition = 0;
  let yPosition = 0;
  let trees = 0;

  while (yPosition < input.length) {
    const thisLine = input[yPosition];
    if (thisLine[xPosition] === '#') {
      trees++;
    }
    
    xPosition += slope.x;
    xPosition %= thisLine.length;
    yPosition += slope.y;
  }

  treeResults.push(trees)
}
console.log(treeResults);
const multipliedResult = treeResults.reduce((factor, treeCount) => factor * treeCount, 1)
console.log(multipliedResult);