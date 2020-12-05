const inputReader = require('../../utilities/inputReaderUtility');
const inputPath = 'input/5.txt';
const input = inputReader.getLines(inputPath);

// Parse rows
const ROWS = 128;
const COLS = 8;
let highestSeatId = 0;

for (const line of input) {
  // Inclusive
  let lowerRowBound = 0;
  // Exclusive
  let upperRowBound = ROWS;
  // Partition rows
  for (let i = 0; i < 7; i++) {
    const rowPartition = line[i];
    if (rowPartition === 'F') {
      upperRowBound -= (upperRowBound - lowerRowBound) / 2;
    } else if (rowPartition === 'B') {
      lowerRowBound += (upperRowBound - lowerRowBound) / 2;
    }
  }

  // Inclusive
  let lowerSeatBound = 0;
  // Exclusive
  let upperSeatBound = COLS;
  // partition seats in row
  for (let i = 7; i < 10; i++) {
    const seatPartition = line[i];
    if (seatPartition === 'L') {
      upperSeatBound -= (upperSeatBound - lowerSeatBound) / 2;
    } else if (seatPartition === 'R') {
      lowerSeatBound += (upperSeatBound - lowerSeatBound) / 2;
    }
  }

  const seatId = lowerRowBound * 8 + lowerSeatBound;
  if (seatId > highestSeatId) {
    highestSeatId = seatId;
  }
}

console.log(highestSeatId);