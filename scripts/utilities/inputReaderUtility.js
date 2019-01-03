const fs = require('fs');

class inputReaderUtility {

  constructor() {

  }

  readFileAsync(fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
          console.error('File Read error');
          console.error(err);
          reject(err);
        }

        resolve(data);
      });
    });
  }

  readFile(fileName) {
    try {
      return fs.readFileSync(fileName, 'utf8');
    } catch (err) {
      console.error('File Read error');
      console.error(err);
      return null;
    }
  }

  getLines(fileName) {
    const input = this.readFile(fileName);
    return input.split('\n');
  }

  getNumbers(fileName) {
    const lines = this.getLines(fileName);
    return lines.map(x => Number(x));
  }
}

module.exports = new inputReaderUtility();
