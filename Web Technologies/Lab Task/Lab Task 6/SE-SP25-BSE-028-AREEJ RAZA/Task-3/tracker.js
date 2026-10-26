/**
 * Web Technologies - Lab 06: JavaScript Basics
 * Student Name: Areej Raza
 * Roll Number: SE-SP25-BSE-028
 * Task 3: Reusable revision tracker
 * Module: tracker.js
 */

"use strict";

/**
 * Creates an independent revision tracker instance using a closure.
 * 
 * @param {number} [start=0] - Initial starting minutes (default: 0).
 * @returns {{ add: (...minutes: number[]) => number, current: () => number, reset: () => number }}
 */
export function createTracker(start = 0) {
  // Validate and store the initial starting value
  const initialMinutes = Number.isFinite(Number(start)) ? Number(start) : 0;

  // Private closure state (encapsulated)
  let accumulatedMinutes = initialMinutes;

  return {
    /**
     * Adds revision minutes using rest parameters (...minutes).
     * Accepts any number of arguments (e.g., add(15, 30, 20)).
     * 
     * @param  {...number} minutes 
     * @returns {number} Updated total minutes.
     */
    add(...minutes) {
      for (const m of minutes) {
        const val = Number(m);
        if (Number.isFinite(val) && val > 0) {
          accumulatedMinutes += val;
        }
      }
      return accumulatedMinutes;
    },

    /**
     * Retrieves the current accumulated revision minutes.
     * 
     * @returns {number}
     */
    current() {
      return accumulatedMinutes;
    },

    /**
     * Resets the tracker back to its initial start value.
     * Does not affect any other tracker instances.
     * 
     * @returns {number} Reset value.
     */
    reset() {
      accumulatedMinutes = initialMinutes;
      return accumulatedMinutes;
    }
  };
}
