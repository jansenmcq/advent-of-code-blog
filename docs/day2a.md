## Day 2, part 1

##### [Problem text](https://adventofcode.com/2018/day/2)
The problem language is a little convoluted, but the problem space isn't too complex. Essentially, there is a quality we must compute about each word in the list, then do some math with the number of words that show that quality.

#### Process

Applying the thinking skills I'm learning from Cracking the Coding Interview, I first considered the brute force approach. This approach would require multiple iterations through each word, to find letters that were repeated, resulting in O(m^2) (For a program runtime of O(nm^2) where n is the size of the list and m is the average size of a word)

    for (const i = 0; i < word.length - 2; i++) {
        for (const j = i + 1; j < word.length - 1; j++) {
            // Do comparison

I considered there was a probably a better way of doing it than lots of nested lists. I decided that the best conceivable runtime would iterate over each word in O(m) space. So I started thinking about how to use extra space to help me reduce the time spent. The solution was to add each character in the word to a map, mapping the character to the frequency. That way I could keep a running tally of the character occurrence for the word, and then extract that information at the end. 

The initial thought-implementation just built out the map, and then iterated over the map values to decide the properties of the word. While this maintains O(m) time, because it (in the worst case) does 2 full iterations over the word size, I wanted to avoid doubling up on the work when I can add checks within the intial passthrough of the word. So, when updating an existing map value, I also check to see what the updated value is. If it is 2 or 3, then I update the corresponding tracker accordingly. That's the reduced-complexity approach to mining the word to determine the needed quality. Then it's a simple matter of updating our list-wide variables, and then doing a simple multiplication at the end.

[part 2](https://jansenmcq.github.io/advent-of-code-blog/day2b)