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
    let overlappingCells = 0;
    for (const claim of claimsList) {
        for (let i = claim.origin[0]; i < claim.origin[0] + claim.width; i++) {
            for (let j = claim.origin[1]; j < claim.origin[1] + claim.height; j++) {
                const gridKey = encodeGridKey(i,j);
                if (!grid[gridKey]) {
                    grid[gridKey] = 1;
                } else {
                    grid[gridKey]++;
                    if (grid[gridKey] === 2) {
                        overlappingCells++;
                    }
                }
            }
        }
    }
    return overlappingCells;
}

const result = timer(bruteForceApproach);
console.log(result);

