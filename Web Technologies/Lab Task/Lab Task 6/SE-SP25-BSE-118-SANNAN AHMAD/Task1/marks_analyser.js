// Web Technologies (CS-312) - Lab 06
// Student: Sannan Ahmad | SE-SP25-BSE-118
// Task 1: Safe Marks Analyser

"use strict";

// Validates student marks array and calculates summary stats
function analyseMarks(rawMarks) {
  // Check if input is a valid array
  if (!Array.isArray(rawMarks)) {
    throw new Error("Input must be an array of marks.");
  }

  // Handle empty array safely without division by zero
  if (rawMarks.length === 0) {
    return {
      count: 0,
      total: 0,
      average: 0,
      passed: 0,
      highest: null
    };
  }

  const marks = [];

  // Validate each mark without mutating input
  for (let i = 0; i < rawMarks.length; i++) {
    const item = rawMarks[i];

    if (item === null || item === undefined) {
      throw new Error(`Mark at index ${i} cannot be null or undefined.`);
    }

    if (typeof item === "string" && item.trim() === "") {
      throw new Error(`Mark at index ${i} cannot be blank or empty.`);
    }

    if (typeof item === "boolean") {
      throw new Error(`Mark at index ${i} cannot be a boolean value.`);
    }

    const num = Number(item);

    if (!Number.isFinite(num)) {
      throw new Error(`Mark "${item}" at index ${i} is not a valid number.`);
    }

    if (num < 0 || num > 100) {
      throw new Error(`Mark ${num} at index ${i} must be between 0 and 100.`);
    }

    marks.push(num);
  }

  // Compute statistics
  const count = marks.length;
  const total = marks.reduce((sum, val) => sum + val, 0);
  const average = Number((total / count).toFixed(2));
  const passed = marks.filter(m => m >= 50).length;
  const highest = Math.max(...marks);

  return {
    count,
    total,
    average,
    passed,
    highest
  };
}

// UI handling
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    const inputMarks = document.getElementById("inputMarks");
    const btnAnalyse = document.getElementById("btnAnalyse");
    const errorAlert = document.getElementById("errorAlert");
    const resultsArea = document.getElementById("resultsArea");
    const outCount = document.getElementById("outCount");
    const outTotal = document.getElementById("outTotal");
    const outAverage = document.getElementById("outAverage");
    const outPassed = document.getElementById("outPassed");
    const outHighest = document.getElementById("outHighest");
    const marksList = document.getElementById("marksList");
    const presetButtons = document.querySelectorAll(".preset-btn");

    function runAnalysis() {
      // Hide error
      errorAlert.textContent = "";
      errorAlert.style.display = "none";

      try {
        const text = inputMarks.value.trim();
        const rawArray = text === "" ? [] : text.split(",").map(s => s.trim());
        const result = analyseMarks(rawArray);

        // Update results table
        outCount.textContent = result.count;
        outTotal.textContent = result.total;
        outAverage.textContent = result.average.toFixed(2);
        outPassed.textContent = result.passed;
        outHighest.textContent = result.highest !== null ? result.highest : "None";

        if (marksList) {
          if (rawArray.length > 0) {
            marksList.textContent = `Valid marks processed: [ ${rawArray.join(", ")} ]`;
          } else {
            marksList.textContent = "Processed empty list.";
          }
        }

        resultsArea.style.display = "block";
      } catch (err) {
        resultsArea.style.display = "none";
        errorAlert.textContent = err.message;
        errorAlert.style.display = "block";
      }
    }

    if (btnAnalyse) {
      btnAnalyse.addEventListener("click", runAnalysis);
    }

    presetButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        inputMarks.value = btn.getAttribute("data-val") || "";
        runAnalysis();
      });
    });

    // Run once on initial load
    runAnalysis();
  });
}

// Export for Node testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { analyseMarks };
}
