// Web Technologies (CS-312) - Lab 06
// Student: Sannan Ahmad | SE-SP25-BSE-118
// Task 3: Application (app.js)

"use strict";

import { createTracker } from "./tracker.js";

// Create two independent tracker instances
const tracker1 = createTracker(0);   // baseline 0 mins
const tracker2 = createTracker(45);  // baseline 45 mins

// Console demonstration as required by the lab
console.log("=== Lab 06 Task 3: Closure Independence Demo ===");
console.log("Tracker 1 initial:", tracker1.current(), "mins");
console.log("Tracker 2 initial:", tracker2.current(), "mins");

// Add study time using rest parameters
tracker1.add(30, 15, 20); // 0 + 30 + 15 + 20 = 65
tracker2.add(15);         // 45 + 15 = 60
console.log("Tracker 1 after study:", tracker1.current(), "mins (expected: 65)");
console.log("Tracker 2 after study:", tracker2.current(), "mins (expected: 60)");

// Reset Tracker 1
tracker1.reset();
console.log("Tracker 1 after reset:", tracker1.current(), "mins (reset to 0)");
console.log("Tracker 2 after Tracker 1 reset:", tracker2.current(), "mins (remains 60 - proves independence)");

// Browser UI
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    const t1Display = document.getElementById("t1Display");
    const t2Display = document.getElementById("t2Display");
    const logMessage = document.getElementById("logMessage");

    function updateView(msg) {
      if (t1Display) t1Display.textContent = `${tracker1.current()} min`;
      if (t2Display) t2Display.textContent = `${tracker2.current()} min`;
      if (logMessage && msg) {
        logMessage.innerHTML = msg;
      }
    }

    // Tracker 1 buttons
    const btnT1Add15 = document.getElementById("btnT1Add15");
    const btnT1Add30 = document.getElementById("btnT1Add30");
    const btnT1Batch = document.getElementById("btnT1Batch");
    const btnT1Reset = document.getElementById("btnT1Reset");

    if (btnT1Add15) {
      btnT1Add15.addEventListener("click", () => {
        tracker1.add(15);
        updateView("Added +15 min to <strong>Tracker 1</strong> (Tracker 2 is unaffected).");
      });
    }

    if (btnT1Add30) {
      btnT1Add30.addEventListener("click", () => {
        tracker1.add(30);
        updateView("Added +30 min to <strong>Tracker 1</strong> (Tracker 2 is unaffected).");
      });
    }

    if (btnT1Batch) {
      btnT1Batch.addEventListener("click", () => {
        tracker1.add(20, 25, 35); // Rest parameters
        updateView("Added batch (20, 25, 35 min) to <strong>Tracker 1</strong> via rest parameters.");
      });
    }

    if (btnT1Reset) {
      btnT1Reset.addEventListener("click", () => {
        tracker1.reset();
        updateView("<span style='color: #c0392b;'><strong>Reset Tracker 1 to 0 min.</strong></span> Notice Tracker 2 remains at " + tracker2.current() + " min!");
      });
    }

    // Tracker 2 buttons
    const btnT2Add15 = document.getElementById("btnT2Add15");
    const btnT2Add30 = document.getElementById("btnT2Add30");
    const btnT2Batch = document.getElementById("btnT2Batch");
    const btnT2Reset = document.getElementById("btnT2Reset");

    if (btnT2Add15) {
      btnT2Add15.addEventListener("click", () => {
        tracker2.add(15);
        updateView("Added +15 min to <strong>Tracker 2</strong> (Tracker 1 is unaffected).");
      });
    }

    if (btnT2Add30) {
      btnT2Add30.addEventListener("click", () => {
        tracker2.add(30);
        updateView("Added +30 min to <strong>Tracker 2</strong> (Tracker 1 is unaffected).");
      });
    }

    if (btnT2Batch) {
      btnT2Batch.addEventListener("click", () => {
        tracker2.add(15, 20); // Rest parameters
        updateView("Added batch (15, 20 min) to <strong>Tracker 2</strong> via rest parameters.");
      });
    }

    if (btnT2Reset) {
      btnT2Reset.addEventListener("click", () => {
        tracker2.reset();
        updateView("<span style='color: #c0392b;'><strong>Reset Tracker 2 to baseline 45 min.</strong></span> Notice Tracker 1 remains at " + tracker1.current() + " min!");
      });
    }

    // Initial display
    updateView("Initialized two independent tracker closures. Tracker 1 start: 0 min | Tracker 2 start: 45 min.");
  });
}
