const inputReader = require('../utilities/inputReaderUtility');
const timer = require('../utilities/timer');
const inputPath = 'input/3.txt';

const input = inputReader.getLines(inputPath);
/* data structure? 
{
  id: <id>, 
  origin: [<x>, <y>], 
  width: <width>, 
  height: <height>,
}
*/

const claimsList = input.map(row => {
  const groups = row.match(/#(\d+) ?@ ?(\d+),(\d+): ?(\d+)x(\d+)/);
  return {
    id: parseInt(groups[1]),
    origin: [parseInt(groups[2]), parseInt(groups[3])],
    width: parseInt(groups[4]),
    height: parseInt(groups[5]),
  };
});

function encodeGridKey(x, y) {
  return `x:${x}y:${y}`;
}

function bruteForceApproach() {
  // We don't actually need to populate a 1000x1000 2d array, we can just create keys for each cell on the grid as they arrive.
  // We'll keep track with a string key like: 'x:<x>y:<y>'. 
  // We'll never need to decode these, so the implementation doesn't matter too much as long as it's unique
  const grid = {};
  const claimStatus = new Array(claimsList.length).fill(true);
  for (const claim of claimsList) {
    for (let i = claim.origin[0]; i < claim.origin[0] + claim.width; i++) {
      for (let j = claim.origin[1]; j < claim.origin[1] + claim.height; j++) {
        const gridKey = encodeGridKey(i,j);
        if (!grid[gridKey]) {
          grid[gridKey] = claim.id;
        } else {
          const overlappingClaimIndex = grid[gridKey] - 1;
          claimStatus[overlappingClaimIndex] = false;
          const claimIndex = claim.id - 1;
          claimStatus[claimIndex] = false;
        }
      }
    }
  }
  const uniqueClaim = claimStatus.findIndex(Boolean) + 1;
  return uniqueClaim;
}

const result = timer(bruteForceApproach);
console.log(result);

