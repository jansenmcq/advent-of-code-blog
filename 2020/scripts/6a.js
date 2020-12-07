const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/6.txt';
const rawInput = inputReader.readFile(inputPath);

const answerGroups = rawInput.split('\n\n');

let uniqueAnswersSum = 0;

for (const group of answerGroups) {
  const rawAnswers = group.split('\n').join('');
  const uniqueAnswers = new Set(rawAnswers);
  uniqueAnswersSum += uniqueAnswers.size;
  if (uniqueAnswers.size > 26 || uniqueAnswers.size === 0) {
    console.log(uniqueAnswers);
    console.log(uniqueAnswers.size);
  }
}

console.log(uniqueAnswersSum);