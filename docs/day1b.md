## Day 1, part 2

This prompt changes up the problem quite a bit. Before, we didn't care about any intermediate state of the sum, we just wanted to know the final result. Now, however, there are 2 big differences:

1. Instead of looking for a single result based off the whole input, we're looking for a pattern in the changes that are made. This means that we have to store the result of each update.
2. There is no defined end point. Whereas the first challenge for day one ended with the input, this challenge will repeat as many times as are necessary until a solution is found.

Therefore, our method of using a `for` loop from before will not work. We will use a `while` loop. Additionally, we will need to use a data structure to keep track of the intermediate steps from the input. We could use either an array or an object - using an array makes storing the values easy, but the time to compare current sum to past sums becomes harder as the steps increase. Using an object as a map (storing the sums as keys) makes it easy to do the comparisons, as we are depending on a collision to tell us when we're done.

```
const input = inputReader.getNumbers(inputPath);

let intermediateSums = {};
let previousSum = input[0];
intermediateSums[previousSum] = true;
let index = 1;

while(true) {
  let currentInput = input[index];
  previousSum = previousSum + currentInput;
  if (intermediateSums[previousSum]) {
    console.log(previousSum);
    return previousSum;
  }

  intermediateSums[previousSum] = true;

  if (index === input.length - 1) {
    index = 0;
  } else {
    index++;
  }
}
```

Once more, I copy the result from the terminal and input it to get the correct answer. On to [day 2](https://jansenmcq.github.io/advent-of-code-blog/day2a)!
