"use strict";

// takes an array of marks and returns count, total, average, passed, highest
function analyseMarks(rawMarks) {
  if (!Array.isArray(rawMarks)) {
    throw new TypeError("Input must be an array");
  }

  // empty array, return zeros so we never divide by 0
  if (rawMarks.length === 0) {
    return { count: 0, total: 0, average: 0, passed: 0, highest: null };
  }

  // new array for clean numbers, the original is never changed
  const marks = [];

  for (let i = 0; i < rawMarks.length; i++) {
    const item = rawMarks[i];

    // null, undefined, true/false and blank strings are not marks
    const isBlank = typeof item === "string" && item.trim() === "";
    if (item === null || item === undefined || typeof item === "boolean" || isBlank) {
      throw new Error("Mark " + (i + 1) + " is empty");
    }

    const num = Number(item);

    if (!Number.isFinite(num)) {
      throw new Error("Mark " + (i + 1) + " (" + item + ") is not a number");
    }

    if (num < 0 || num > 100) {
      throw new Error("Mark " + (i + 1) + " (" + num + ") must be between 0 and 100");
    }

    marks.push(num);
  }

  const total = marks.reduce((sum, m) => sum + m, 0);

  return {
    count: marks.length,
    total: total,
    average: Number((total / marks.length).toFixed(2)),
    passed: marks.filter(m => m >= 50).length,
    highest: Math.max(...marks)
  };
}

// ---- page code ----
const input = document.getElementById("marks");
const errorText = document.getElementById("error");
const table = document.getElementById("result");

function run() {
  errorText.textContent = "";
  table.style.display = "table";

  try {
    // split the text at commas, empty text means empty array
    const text = input.value.trim();
    const list = text === "" ? [] : text.split(",");
    const r = analyseMarks(list);

    document.getElementById("count").textContent = r.count;
    document.getElementById("total").textContent = r.total;
    document.getElementById("average").textContent = r.average.toFixed(2);
    document.getElementById("passed").textContent = r.passed;
    document.getElementById("highest").textContent = r.highest === null ? "none" : r.highest;
  } catch (err) {
    table.style.display = "none";
    errorText.textContent = "Error: " + err.message;
  }
}

document.getElementById("run").addEventListener("click", run);

document.querySelectorAll(".preset").forEach(function (btn) {
  btn.addEventListener("click", function () {
    input.value = btn.dataset.val;
    run();
  });
});

run();
