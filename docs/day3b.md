## Day 3, part 2

This second part isn't too bad. In order to determine which claim has no overlap with others, we just need to keep track of two things:

1) instead of tracking a count for a grid cell, we need to track an id, and
2) we need to also keep track of the claims and tag them as overlapping, 

This just means tweaking slightly the logic in setting up the grid map, and creating another data structure to track claim overlaps, which can be done simply in an array.

Long story short, this is the correct approach. However, I made a typo when I was writing the logic to update the claim overlap array, and as a result I wasn't correctly marking the claims that were being overlapped. Always check for typos!