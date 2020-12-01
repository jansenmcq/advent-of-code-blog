const inputReader = require('../utilities/inputReaderUtility');
const inputPath = 'input/2.txt';

const input = inputReader.getLines(inputPath);

function compareWords(word1, word2) {
    const letters = [];
    let unmatchedCounter = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] !== word2[i]) {
            unmatchedCounter++;
            if (unmatchedCounter > 1) {
                return null;
            }
        } else {
            letters.push(word1[i]);
        }
    }
    return letters;
}

// Sorting approach, couldn't get it to work
// n * log(n)
// const sortedInput = input.sort((word1, word2) => {
//     return word1.slice(1) > word2.slice(1);
// });
// console.log(sortedInput.slice(0, 10));
// let commonLetters;
// let counter = 0;
// for (let i = 0; i < sortedInput.length - 2; i++) {
//     word1 = sortedInput[i];
//     word2 = sortedInput[i+1];
//     counter++;
//     const comparison = compareWords(word1, word2);
//     if (comparison) {
//         commonLetters = comparison;
//         console.log(comparison);
//         break;
//     }
// }


function bruteForce() {
    for (let i = 0; i < input.length - 1; i++) {
        for (let j = i + 1; j < input.length; j++) {
            const comparison = compareWords(input[i], input[j]);
            if (comparison) {
                return comparison;
            }
        }
    }
}
const time00 = Date.now();
const result = bruteForce();
time01 = Date.now();
console.log(time01 - time00);
console.log(result.join(''));


const map = {};
const map2 = {};
let matchingLetters = null;
// n
const time10 = Date.now();
for (const word of input) {
    if (!map[word[0]]) {
        map[word[0]] = [word];
    } else {
        // Check existing rows before adding
        const match = map[word[0]].reduce((matchFound, nextWord) => {
            if (matchFound) {
                return matchFound;
            }
            return compareWords(word, nextWord);
        }, null);
        if (match) {
            matchingLetters = match;
            break;
        }
        map[word[0]].push(word);
    }
    
    if (!map2[word[1]]) {
        map2[word[1]] = [word];
    } else {
        // Check existing rows before adding
        const match = map2[word[1]].reduce((matchFound, nextWord) => {
            if (matchFound) {
                return matchFound;
            }
            return compareWords(word, nextWord);
        }, null);
        if (match) {
            matchingLetters = match;
            break;
        }
        map2[word[1]].push(word);
    }
}
const time11 = Date.now();

console.log(matchingLetters.join(''));
console.log(time11 - time10);