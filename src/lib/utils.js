// Returns a random float number in the range [min, max]
export const random = (min, max) => min + Math.random() * max;

// Maps a number (val), from a range [start1, end1] to a range [start2, end2]
export const map = (val, start1, end1, start2, end2) =>
  start2 + ((val - start1) * (end2 - start2)) / (end1 - start1);
