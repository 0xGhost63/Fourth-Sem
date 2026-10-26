"use strict";

import { createTracker } from "./tracker.js";

const tracker1 = createTracker(0);
const tracker2 = createTracker(45);

const time1 = document.getElementById("time1");
const time2 = document.getElementById("time2");
const log = document.getElementById("log");

// console check
tracker1.add(30, 15, 20);
tracker2.add(15);
console.log("tracker1:", tracker1.current(), "(expected 65)");
console.log("tracker2:", tracker2.current(), "(expected 60)");
tracker1.reset();
console.log("after reset tracker1:", tracker1.current(), "tracker2:", tracker2.current());
tracker2.reset(); // back to the starting values for the page
console.log("---");

// shows both values and a message
function update(message) {
  time1.textContent = tracker1.current() + " min";
  time2.textContent = tracker2.current() + " min";
  log.textContent = message;
}

// tracker 1 buttons
document.getElementById("t1-add15").addEventListener("click", function () {
  tracker1.add(15);
  update("Added 15 to tracker 1. Tracker 2 not changed.");
});

document.getElementById("t1-add30").addEventListener("click", function () {
  tracker1.add(30);
  update("Added 30 to tracker 1. Tracker 2 not changed.");
});

document.getElementById("t1-batch").addEventListener("click", function () {
  tracker1.add(20, 25, 35);
  update("Added 20, 25, 35 to tracker 1 in one call.");
});

document.getElementById("t1-reset").addEventListener("click", function () {
  tracker1.reset();
  update("Tracker 1 reset to 0. Tracker 2 still has its own value.");
});

// tracker 2 buttons
document.getElementById("t2-add15").addEventListener("click", function () {
  tracker2.add(15);
  update("Added 15 to tracker 2. Tracker 1 not changed.");
});

document.getElementById("t2-add30").addEventListener("click", function () {
  tracker2.add(30);
  update("Added 30 to tracker 2. Tracker 1 not changed.");
});

document.getElementById("t2-batch").addEventListener("click", function () {
  tracker2.add(15, 20);
  update("Added 15, 20 to tracker 2 in one call.");
});

document.getElementById("t2-reset").addEventListener("click", function () {
  tracker2.reset();
  update("Tracker 2 reset to 45. Tracker 1 still has its own value.");
});

update("Tracker 1 starts at 0, tracker 2 starts at 45.");
