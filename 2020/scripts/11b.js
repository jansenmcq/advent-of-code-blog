const { get } = require('http');
const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/11.txt';
const input = inputReader.getLines(inputPath);

let seating = input.map(line => line.split(''));


function isValidSpace(i, j) {
    return i >= 0 && i < seating.length && j >= 0 && j < seating[i].length;
}

function getSpace(i, j) {
    if (!isValidSpace(i, j)) {
        return '.';
    }
    return seating[i][j];
}
// console.log(seating.reduce((count, row) => {
//     return count + row.reduce((sum, space) => {
//         if (space === 'L') {
//             sum++;
//         }
//         return sum;
//     }, 0)
// }, 0))

function spaceIsOccupied(space) {
    return space === '#';
}

function spaceIsSeat(space) {
    return space !== '.';
}

const Directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

function getVisibleSeatInDirection(i,j, directionI, directionJ) {
    i += directionI;
    j += directionJ;
    while (isValidSpace(i,j)) {
        const space = getSpace(i,j);
        if (spaceIsSeat(space)) {
            return space;
        }
        i += directionI;
        j += directionJ;
    }
    return null;
}


let changed = false;
let occupiedSeats = 0;
do {
    changed = false;
    const nextSeating = seating.map(line => [...line]);
    for (let i = 0; i < seating.length; i++) {
        const line = input[i];
        for (let j = 0; j < line.length; j++) {
            const space = getSpace(i, j);
            if (!spaceIsSeat(space)) {
                continue;
            }
            let occupiedNeighbors = Directions.filter(direction => {
                const visibleSeat = getVisibleSeatInDirection(i, j, ...direction);
                return spaceIsOccupied(visibleSeat);
            }).length;
            if (!spaceIsOccupied(space) && occupiedNeighbors === 0) {
                nextSeating[i][j] = '#';
                changed = true;
                occupiedSeats++;
            } else if (spaceIsOccupied(space) && occupiedNeighbors >= 5) {
                nextSeating[i][j] = 'L';
                changed = true;
                occupiedSeats--;
            }
        }
    }
    seating = nextSeating;
} while (changed);

console.log(occupiedSeats);