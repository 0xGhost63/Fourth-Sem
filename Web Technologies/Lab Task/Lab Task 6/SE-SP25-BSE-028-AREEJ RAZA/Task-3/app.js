/**
 * Web Technologies - Lab 06: JavaScript Basics
 * Student Name: Areej Raza
 * Roll Number: SE-SP25-BSE-028
 * Task 3: Reusable revision tracker
 * Module: app.js
 */

"use strict";

import { createTracker } from "./tracker.js";

// 1. Create two completely independent revision trackers
const webTechTracker = createTracker(0);      // Starts at 0 mins
const softwareEngTracker = createTracker(15); // Starts with 15 mins base

// Console Demonstration as required by lab task
console.log("=== Lab Task 3: Closure & Independence Demo ===");
console.log("Initial Web Tech Tracker minutes:", webTechTracker.current());       // 0
console.log("Initial Software Eng Tracker minutes:", softwareEngTracker.current()); // 15

// Add time to both using rest parameters
webTechTracker.add(45, 30);      // 0 + 45 + 30 = 75
softwareEngTracker.add(20, 40);  // 15 + 20 + 40 = 75

console.log("After study sessions:");
console.log("Web Tech Tracker:", webTechTracker.current(), "mins");          // 75
console.log("Software Eng Tracker:", softwareEngTracker.current(), "mins");  // 75

// Reset ONLY Web Tech Tracker
console.log("--> Resetting Web Tech Tracker...");
webTechTracker.reset();

console.log("Web Tech Tracker after reset:", webTechTracker.current(), "mins (Reset to 0)");
console.log("Software Eng Tracker after Web Tech reset:", softwareEngTracker.current(), "mins (Remains 75! Proves independence)");

// Browser UI Interactivity (if running in a browser)
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements for Tracker 1 (Web Tech)
    const valTracker1 = document.getElementById("valTracker1");
    const btnAdd15_T1 = document.getElementById("btnAdd15_T1");
    const btnAdd30_T1 = document.getElementById("btnAdd30_T1");
    const btnAddMulti_T1 = document.getElementById("btnAddMulti_T1");
    const btnReset_T1 = document.getElementById("btnReset_T1");

    // DOM Elements for Tracker 2 (Software Eng)
    const valTracker2 = document.getElementById("valTracker2");
    const btnAdd15_T2 = document.getElementById("btnAdd15_T2");
    const btnAdd30_T2 = document.getElementById("btnAdd30_T2");
    const btnAddMulti_T2 = document.getElementById("btnAddMulti_T2");
    const btnReset_T2 = document.getElementById("btnReset_T2");

    const activityLog = document.getElementById("activityLog");

    function logMessage(text, isReset = false) {
      const entry = document.createElement("div");
      entry.className = `log-entry ${isReset ? "log-reset" : ""}`;
      const time = new Date().toLocaleTimeString();
      entry.innerHTML = `<span class="log-time">[${time}]</span> ${text}`;
      activityLog.prepend(entry);
    }

    function updateDisplays() {
      valTracker1.textContent = `${webTechTracker.current()} mins`;
      valTracker2.textContent = `${softwareEngTracker.current()} mins`;
    }

    // Tracker 1 Event Handlers
    btnAdd15_T1.addEventListener("click", () => {
      webTechTracker.add(15);
      updateDisplays();
      logMessage(`Web Tech Tracker: added 15 mins (Total: ${webTechTracker.current()} mins)`);
    });

    btnAdd30_T1.addEventListener("click", () => {
      webTechTracker.add(30);
      updateDisplays();
      logMessage(`Web Tech Tracker: added 30 mins (Total: ${webTechTracker.current()} mins)`);
    });

    btnAddMulti_T1.addEventListener("click", () => {
      // Demonstrates rest parameters: add(20, 25, 15)
      webTechTracker.add(20, 25, 15);
      updateDisplays();
      logMessage(`Web Tech Tracker: added batch (20, 25, 15 mins) via rest params (Total: ${webTechTracker.current()} mins)`);
    });

    btnReset_T1.addEventListener("click", () => {
      webTechTracker.reset();
      updateDisplays();
      logMessage(`<strong>RESET Web Tech Tracker</strong> &mdash; Software Eng Tracker unaffected at ${softwareEngTracker.current()} mins!`, true);
    });

    // Tracker 2 Event Handlers
    btnAdd15_T2.addEventListener("click", () => {
      softwareEngTracker.add(15);
      updateDisplays();
      logMessage(`Software Eng Tracker: added 15 mins (Total: ${softwareEngTracker.current()} mins)`);
    });

    btnAdd30_T2.addEventListener("click", () => {
      softwareEngTracker.add(30);
      updateDisplays();
      logMessage(`Software Eng Tracker: added 30 mins (Total: ${softwareEngTracker.current()} mins)`);
    });

    btnAddMulti_T2.addEventListener("click", () => {
      // Demonstrates rest parameters: add(10, 15, 35)
      softwareEngTracker.add(10, 15, 35);
      updateDisplays();
      logMessage(`Software Eng Tracker: added batch (10, 15, 35 mins) via rest params (Total: ${softwareEngTracker.current()} mins)`);
    });

    btnReset_T2.addEventListener("click", () => {
      softwareEngTracker.reset();
      updateDisplays();
      logMessage(`<strong>RESET Software Eng Tracker</strong> &mdash; Web Tech Tracker unaffected at ${webTechTracker.current()} mins!`, true);
    });

    // Initial render
    updateDisplays();
    logMessage("Initialized two independent revision trackers with closures.");
    logMessage(`Initial state &mdash; Tracker 1: ${webTechTracker.current()} mins, Tracker 2: ${softwareEngTracker.current()} mins.`);
  });
}
