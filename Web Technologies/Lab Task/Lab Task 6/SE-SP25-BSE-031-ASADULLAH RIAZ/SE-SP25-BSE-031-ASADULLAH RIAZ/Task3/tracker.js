"use strict";

// each call makes a new tracker with its own private minutes variable
export function createTracker(start = 0) {
  // if start is not a proper number, use 0
  const startValue = Number.isFinite(start) ? start : 0;
  let minutes = startValue;

  return {
    // rest parameter, so add(10, 20, 30) works
    add(...values) {
      for (const v of values) {
        const n = Number(v);
        // ignore bad values and negatives
        if (Number.isFinite(n) && n > 0) {
          minutes += n;
        }
      }
      return minutes;
    },

    current() {
      return minutes;
    },

    reset() {
      minutes = startValue;
      return minutes;
    }
  };
}
