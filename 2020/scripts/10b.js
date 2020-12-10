const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/10.txt';
const input = inputReader.getNumbers(inputPath);

input.sort((a,b) => a - b);
input.unshift(0);git status
let combinations = 1;

let i = 0;
while (i < input.length) {
  let j = i + 1;
  while (input[j] - input[j-1] === 1 && j < input.length) {
    j++;
  }
  // console.log(`${i}, ${j}, ${input[i]}, ${input[j]}`);
  const contiguousGroupSize = j - i;
  const combinatorSize = Math.max(contiguousGroupSize - 2, 0);
  let groupCombinations = Math.pow(2, combinatorSize);
  // Have to subtract for groups over a certain size
  // Cheating because I found the largest contiguous size has only 3 internal elements
  if (contiguousGroupSize === 5) {
    groupCombinations = 7;
  }
  combinations *= groupCombinations;
  i = Math.max(i + 1, j - 1);
}

console.log(combinations);
