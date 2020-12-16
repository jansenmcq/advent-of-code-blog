const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/13.txt';
const input = inputReader.getLines(inputPath);

const departureWindow = Number(input[0]);
// Extract valid bus ids and Order the buses from smallest to highest
const buses = input[1].split(',').filter(id => id !== 'x').map(Number).sort((a,b) => a - b);

let soonestDeparture = 1e10;
let busId = 0;

for (const bus of buses) {
    const dividend = departureWindow / bus;
    const multiplier = Math.ceil(dividend);
    const nextArrival = bus * multiplier;
    if (nextArrival < soonestDeparture) { 
        soonestDeparture = nextArrival;
        busId = bus;
    }
}

console.log(busId);
console.log(soonestDeparture);
const answer = (soonestDeparture - departureWindow) * busId;
console.log(answer);
