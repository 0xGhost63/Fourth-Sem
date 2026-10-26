/**
 * Web Technologies - Lab 06: JavaScript Basics
 * Student Name: Areej Raza
 * Roll Number: SE-SP25-BSE-028
 * Graded Lab Task 1: Safe marks analyser
 */

"use strict";

/**
 * Validates and analyses an array of raw marks.
 * 
 * Requirements satisfied:
 * 1. Converts and validates every input.
 * 2. Returns { count, total, average, passed, highest }.
 * 3. Uses 50 as the pass threshold.
 * 4. Does not mutate/modify the input array.
 * 5. Handles empty array safely without NaN or division by zero.
 * 6. Throws a clear Error for blank, non-numeric, non-finite, or out-of-range marks.
 * 
 * @param {Array<string|number>} rawMarks
 * @returns {{ count: number, total: number, average: number, passed: number, highest: number|null }}
 */
function analyseMarks(rawMarks) {
  // Guard check: ensure input is an array
  if (!Array.isArray(rawMarks)) {
    throw new Error("Invalid input: Expected an array of marks.");
  }

  // Handle empty array gracefully (prevent 0 / 0 = NaN)
  if (rawMarks.length === 0) {
    return {
      count: 0,
      total: 0,
      average: 0,
      passed: 0,
      highest: null
    };
  }

  const validNumbers = [];
  let total = 0;
  let passedCount = 0;

  // Process and validate each mark without mutating rawMarks
  for (let i = 0; i < rawMarks.length; i++) {
    const raw = rawMarks[i];

    // Check for null or undefined
    if (raw === null || raw === undefined) {
      throw new Error(`Mark at position ${i + 1} is null or undefined.`);
    }

    // Check for blank string
    if (typeof raw === "string" && raw.trim() === "") {
      throw new Error(`Mark at position ${i + 1} cannot be blank or whitespace.`);
    }

    // Check for boolean types (which Number() would convert to 0 or 1)
    if (typeof raw === "boolean") {
      throw new Error(`Mark at position ${i + 1} is a boolean (${raw}), not a valid score.`);
    }

    // Coerce to number
    const num = Number(raw);

    // Validate that it's a valid finite number
    if (Number.isNaN(num) || !Number.isFinite(num)) {
      throw new Error(`Mark at position ${i + 1} ("${raw}") is not a valid number.`);
    }

    // Check valid grade range [0 to 100]
    if (num < 0 || num > 100) {
      throw new Error(`Mark at position ${i + 1} (${num}) is out of range. Must be between 0 and 100.`);
    }

    validNumbers.push(num);
    total += num;

    // Pass threshold is 50
    if (num >= 50) {
      passedCount++;
    }
  }

  const count = validNumbers.length;
  const average = Number((total / count).toFixed(2));
  const highest = Math.max(...validNumbers);

  return {
    count,
    total,
    average,
    passed: passedCount,
    highest
  };
}

// Browser UI Interaction logic
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const marksInput = document.getElementById("marksInput");
    const analyseBtn = document.getElementById("analyseBtn");
    const errorBox = document.getElementById("errorBox");
    const resultsContainer = document.getElementById("resultsContainer");

    const statCount = document.getElementById("statCount");
    const statTotal = document.getElementById("statTotal");
    const statAverage = document.getElementById("statAverage");
    const statPassed = document.getElementById("statPassed");
    const statHighest = document.getElementById("statHighest");
    const marksListDiv = document.getElementById("marksList");

    function runAnalysis(marksArray) {
      // Clear previous error
      errorBox.classList.add("hidden");
      errorBox.textContent = "";

      try {
        const result = analyseMarks(marksArray);

        // Display results
        statCount.textContent = result.count;
        statTotal.textContent = result.total;
        statAverage.textContent = result.average.toFixed(2);
        statPassed.textContent = result.passed;
        statHighest.textContent = result.highest !== null ? result.highest : "N/A";

        // Display list of marks
        marksListDiv.innerHTML = "";
        if (marksArray.length === 0) {
          marksListDiv.innerHTML = `<span class="empty-tag">Array is empty</span>`;
        } else {
          marksArray.forEach((m, idx) => {
            const num = Number(m);
            const isPass = num >= 50;
            const badge = document.createElement("span");
            badge.className = `mark-chip ${isPass ? "pass" : "fail"}`;
            badge.innerHTML = `<strong>#${idx + 1}:</strong> ${m} <small>(${isPass ? "Pass" : "Fail"})</small>`;
            marksListDiv.appendChild(badge);
          });
        }

        resultsContainer.classList.remove("hidden");
        console.log("Analysis Result:", result);
      } catch (err) {
        errorBox.textContent = "Error: " + err.message;
        errorBox.classList.remove("hidden");
        resultsContainer.classList.add("hidden");
        console.error("analyseMarks Error:", err.message);
      }
    }

    analyseBtn.addEventListener("click", () => {
      const rawText = marksInput.value.trim();
      let marksArray = [];
      if (rawText.length > 0) {
        // Split by comma
        marksArray = rawText.split(",").map(s => s.trim());
      }
      runAnalysis(marksArray);
    });

    // Preset test buttons
    document.querySelectorAll(".btn-preset").forEach(btn => {
      btn.addEventListener("click", () => {
        const testType = btn.dataset.test;
        if (testType === "sample") {
          marksInput.value = "78, 45, 90, 60";
          runAnalysis(["78", "45", "90", "60"]);
        } else if (testType === "empty") {
          marksInput.value = "";
          runAnalysis([]);
        } else if (testType === "blank") {
          marksInput.value = "80,  , 95";
          runAnalysis(["80", "  ", "95"]);
        } else if (testType === "invalid") {
          marksInput.value = "75, abc, 90";
          runAnalysis(["75", "abc", "90"]);
        } else if (testType === "outofrange") {
          marksInput.value = "85, 105, 60";
          runAnalysis(["85", "105", "60"]);
        }
      });
    });

    // Run initial sample
    runAnalysis(["78", "45", "90", "60"]);
  });
}

// Node.js test execution
if (typeof module !== "undefined" && module.exports) {
  module.exports = { analyseMarks };
}
