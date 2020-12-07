const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/6.txt';
const rawInput = inputReader.readFile(inputPath);

const answerGroups = rawInput.split('\n\n');

let uniqueAnswersSum = 0;

for (const group of answerGroups) {
  const individualAnswers = group.split('\n');
  let sameAnswers = individualAnswers[0].split('');
  // Use first answer to create set, then loop through remaining to find same answers
  for (let i = 1; i < individualAnswers.length; i++) {
    const answer = individualAnswers[i].split('');

    sameAnswers = sameAnswers.filter(letter => answer.includes(letter));
    
    if (sameAnswers.length === 0) {
      break;
    }
  }
  
  uniqueAnswersSum += sameAnswers.length;
  if (sameAnswers.size > 26) {
    console.log(sameAnswers);
    console.log(sameAnswers.length);
  }
}

console.log(uniqueAnswersSum);