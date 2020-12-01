const inputReader = require('../utilities/inputReaderUtility');
const inputPath = 'input/2.txt';

const input = inputReader.getLines(inputPath);

let map;
let twoTotal = 0;
let threeTotal = 0;

for (const word of input) {
    map = {};
    let twos = 0;
    let threes = 0;

    // To avoid O(m^2) by doing looping searches, create a map of letter -> occurrence
    for (const char of word) {
        // update the map
        if (map[char]) {
            map[char]++;
            // Update the duplicate trackers
            if (map[char] === 2) {
                twos++;
            } else if (map[char] === 3) {
                twos--;
                threes++;
            } else if (map[char] === 4) {
                threes--;
            }
        } else {
            map[char] = 1;
        }
    }
    if (twos > 0) {
        twoTotal++;
    }
    if (threes > 0) {
        threeTotal++;
    }
}

console.log(twoTotal * threeTotal);