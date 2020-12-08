const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/7.txt';
const input = inputReader.getLines(inputPath);

const bagTree = {};

for (const rule of input) {
  const words = rule.split(' ');
  const ruleId = `${words[0]} ${words[1]}`;

  bagTree[ruleId] = [];

  if (words[4] === 'no') {
    continue;
  }

  for (let i = 4; i < words.length; i += 4) {
    const bagNumber = Number(words[i]);
    const bagId = `${words[i+1]} ${words[i+2]}`;
    bagTree[ruleId].push({
      bagNumber,
      bagId
    });
  }
}
const goldBag = 'shiny gold';

function dfs(bag) {
  const nextBags = bagTree[bag.bagId];
  let bagCount = bag.bagNumber;
  for(const nextBag of nextBags) {
    const containedBagCount = dfs(nextBag);
    bagCount += bag.bagNumber * containedBagCount;
  }

  return bagCount;
}

let totalBags = dfs({
  bagNumber: 1,
  bagId: goldBag
});

// Because of the way I set up the recursion, 
//I include the gold bag itself in the count
totalBags--;

console.log(totalBags);


