const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/13.txt';
const input = inputReader.getLines(inputPath);

const buses = input[1].split(',').map((bus, idx) => {
    const id = bus === 'x' ? bus : Number(bus);
    return {
        id,
        idx
    };
}).filter(bus => bus.id !== 'x');

const longestRoute = buses.reduce((longest, bus) => {
    if (bus.id > longest.id) {
        return bus;
    }
    return longest;
}, {idx: 0, id: 0});

let searching = true;
let i = Math.floor(1e15 / longestRoute.id);

while(searching) {
    i++;
    const anchor = longestRoute.id * i;
    const anchorIdx = longestRoute.idx * i;
    const arrivalTimes = buses.map(({id, idx}) => {
        const dividend = anchor / id;
        const multiplier = Math.round(dividend);
        const arrivalTime = id * multiplier;
        return {
            arrival: arrivalTime,
            idx,
        }
    });

    searching = arrivalTimes.some(({arrival, idx}) => {
        const arrivalDifference = Math.abs(anchor - arrival);
        const idxOffset = Math.abs(anchorIdx - idx);
        return arrivalDifference !== idxOffset;
    });

    if (i > 1e20) {
        console.log('boy Im pooped');
        break;
    }
}

console.log(buses[0].id * i);