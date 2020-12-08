const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/7.txt';
const input = inputReader.getLines(inputPath);

const backTree = {};

for (const rule of input) {
  const words = rule.split(' ');
  const ruleId = `${words[0]} ${words[1]}`;

  if (words[4] === 'no') {
    continue;
  }

  for (let i = 4; i < words.length; i += 4) {
    const bagId = `${words[i+1]} ${words[i+2]}`;
    if (!backTree[bagId]) {
      backTree[bagId] = [];
    }
    backTree[bagId].push(ruleId);
  }
}
const goldBag = 'shiny gold';
const containerBags = new Set(); 
const backBags = [...backTree[goldBag]];

while (backBags.length) {
  const backBag = backBags.shift();
  containerBags.add(backBag);
  if (backTree[backBag]) {
    backBags.push(...backTree[backBag]);
  }
}

console.log(containerBags.size);

