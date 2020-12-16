const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/12.txt';
const input = inputReader.getLines(inputPath);

let waypoint = [10, 1];

let position = [0,0];

function rotate(position, angle) {
    const theta = Math.PI / 180 * angle;
    const cost = Math.round(Math.cos(theta));
    const sint = Math.round(Math.sin(theta));
    let xCoord = position[0] * cost - position[1] * sint;
    let yCoord = position[0] * sint + position[1] * cost;
    return [xCoord, yCoord];
}

for (const line of input) {
    const action = line[0];
    const amount = Number(line.slice(1));

    switch(action) {
        case 'N':
            waypoint[1] += amount;
            break;
        case 'S':
            waypoint[1] -= amount;
            break;
        case 'E':
            waypoint[0] += amount;
            break;
        case 'W':
            waypoint[0] -= amount;
            break;
        case 'F':
            position[0] += waypoint[0] * amount;
            position[1] += waypoint[1] * amount;
            break;
        case 'R':
            waypoint = rotate(waypoint, -amount);
            break;
        case 'L': 
            waypoint = rotate(waypoint, amount);
            break;
    }
}

const manhattanDistance = Math.abs(position[0]) + Math.abs(position[1]);
console.log(manhattanDistance);