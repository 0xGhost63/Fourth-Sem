// Web Technologies (CS-312) - Lab 06
// Student: Sannan Ahmad | SE-SP25-BSE-118
// Task 3: Tracker Module (tracker.js)

"use strict";

// Factory function using closure to encapsulate state
export function createTracker(start = 0) {
  const baseline = typeof start === "number" && !isNaN(start) ? start : 0;
  let totalMinutes = baseline;

  return {
    // Add minutes using rest parameters (...minutes)
    add(...minutes) {
      for (let i = 0; i < minutes.length; i++) {
        const val = Number(minutes[i]);
        if (!isNaN(val) && val > 0) {
          totalMinutes += val;
        }
      }
      return totalMinutes;
    },

    // Return current minutes
    current() {
      return totalMinutes;
    },

    // Reset back to initial baseline
    reset() {
      totalMinutes = baseline;
      return totalMinutes;
    }
  };
}
