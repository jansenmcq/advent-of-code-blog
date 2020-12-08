const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/8.txt';
const input = inputReader.getLines(inputPath);

function parse(line) {
    const [command, number] = line.split(' ');
    
    return {
        command,
        number: Number(number)
    }
}

const parsedInput = input.map(parse);

let acc = 0;

const visitedLines = new Set();

let i = 0;
while(true) {
    if (visitedLines.has(i)) {
        console.log(acc);
        break;
    }
    visitedLines.add(i);
    const line = parsedInput[i];
    switch(line.command) {
        case 'acc':
            acc += line.number;
            i++;
            break;
        case 'jmp':
            i += line.number;
            break;
        case 'nop':
            i++;
            break;
        default:
            throw new Error(line.command);
    }
}
