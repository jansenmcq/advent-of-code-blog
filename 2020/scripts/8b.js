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

const lines = input.map(parse);

for (let i = 0; i < lines.length; i++) {
    if (lines[i].command === 'acc') {
        continue;
    }
    const alteredLines = lines.map(line => ({command: line.command, number: line.number}));
    if (lines[i].command === 'jmp') {
        alteredLines[i].command = 'nop';
    } else {
        alteredLines[i].command = 'jmp';
    }

    let acc = 0;

    const visitedLines = new Set();

    let idx = 0;
    while(true) {
        if (visitedLines.has(idx)) {
            break;
        }
        if (idx === alteredLines.length) {
            console.log(i);
            console.log(idx);
            console.log(acc);
            return;
        }
        visitedLines.add(idx);
        const line = alteredLines[idx];
        switch(line.command) {
            case 'acc':
                acc += line.number;
                idx++;
                break;
            case 'jmp':
                idx += line.number;
                break;
            case 'nop':
                idx++;
                break;
            default:
                throw new Error(line.command);
        }
    }
}