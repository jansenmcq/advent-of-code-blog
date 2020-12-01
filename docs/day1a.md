## Day 1: Chronal Calibration

##### [Problem text](https://adventofcode.com/2018/day/1)

The problem in this prompt is pretty straightforward. The [input](https://adventofcode.com/2018/day/1/input) consists of a series of positive and negative numbers that we need to sum together. The program I build will be a simple script that reads the numbers and adds them together. I'll be adding a utility to help read the input, which will be useful in future challenges.

#### Process

I've gotten my inputReaderUtility set up (subjecty to plenty of refinement, I just need a barebones file reader for now).
With that squared away, my code becomes very straightforward:
   
    const inputReader = require('../utilities/inputReaderUtility');
    const inputPath = '../input/1a.txt';
    
    const input = inputReader.getNumbers(inputPath);
    
    let sum = 0;
    
    for (let number of input) {
      sum += number;
    }
    
    console.log(sum);
    

I've required my new utility, and I call on it a function that returns all the input converted to numbers in an array. This allows me to do multiple things with it, the most straight forward being a for loop. In this case I'm using es6 syntax to iterate through all elements of the array, though it could have been done in a traditional format:

    for (let i = 0; i < input.length; i++) {
      sum += input[i];
    }

Alternatively, I can use the Array prototype `.reduce()` function:

    sum = input.reduce((aggregator, number) => {
      return aggregator + number;
    }, 0);

Then I simply log the result, copy from the terminal, and paste into the submit box! 
A successful result brings us to [part 2](https://jansenmcq.github.io/advent-of-code-blog/day1b)
