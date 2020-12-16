const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/12.txt';
const input = inputReader.getLines(inputPath);

let facing = 0;

let position = [0,0];

for (const line of input) {
    const action = line[0];
    const amount = Number(line.slice(1));

    switch(action) {
        case 'N':
            position[1] += amount;
            break;
        case 'S':
            position[1] -= amount;
            break;
        case 'E':
            position[0] += amount;
            break;
        case 'W':
            position[0] -= amount;
            break;
        case 'F':
            switch (facing) {
                case 0:
                    position[0] += amount;
                    break;
                case 1:
                    position[1] += amount;
                    break;
                case 2: 
                    position[0] -= amount;
                    break;
                case 3:
                    position[1] -= amount;
                    break;
            }
            break;
        case 'R':
            const change = amount / 90;
            facing -= change;
            facing += 4;
            facing %= 4;
            break;
        case 'L': 
            const facingChange = amount / 90;
            facing += facingChange;
            facing %= 4;
            break;
    }
}

const manhattanDistance = Math.abs(position[0]) + Math.abs(position[1]);
console.log(manhattanDistance);