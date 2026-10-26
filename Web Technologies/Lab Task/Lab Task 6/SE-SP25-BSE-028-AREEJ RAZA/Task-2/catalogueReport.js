/**
 * Web Technologies - Lab 06: JavaScript Basics
 * Student Name: Areej Raza
 * Roll Number: SE-SP25-BSE-028
 * Graded Lab Task 2: Non-mutating catalogue report
 */

"use strict";

// Default catalogue from Activity 3
const defaultBooks = [
  { id: 1, title: "HTML Essentials", price: 1000, stock: 5 },
  { id: 2, title: "CSS Layouts", price: 1500, stock: 0 },
  { id: 3, title: "JavaScript Lab", price: 2000, stock: 3 }
];

/**
 * Builds a comprehensive report from a book catalogue without mutating the input array.
 * 
 * Uses:
 * - map: for normalised titles and creating discounted copies
 * - filter: for case-insensitive title search matches
 * - reduce: for calculating total stock value
 * - find: for locating exact search match or featured item
 * - some: for checking if any book is currently out of stock
 * - every: for verifying that all books meet quality/pricing standards
 * - sort: for producing an ascending price ranking (on a shallow copy)
 * 
 * @param {Array<Object>} books - The catalogue of books.
 * @param {string} searchText - Case-insensitive keyword to search.
 * @param {number} [discount=0.10] - Discount rate (default 10% = 0.10).
 * @returns {Object} Generated catalogue report.
 */
function buildReport(books, searchText = "", discount = 0.10) {
  if (!Array.isArray(books)) {
    throw new Error("Invalid catalogue: 'books' must be an array.");
  }

  // 1. Normalised titles using map()
  const normalisedTitles = books.map(book => book.title.trim().toUpperCase());

  // 2. Case-insensitive search matches using filter()
  const query = searchText ? searchText.trim().toLowerCase() : "";
  const searchMatches = books.filter(book => 
    book.title.toLowerCase().includes(query)
  );

  // 3. Discounted copies using map() (pure: creates new objects, doesn't mutate originals)
  const discountedCopies = books.map(book => {
    const discountedPrice = Number((book.price * (1 - discount)).toFixed(2));
    return {
      id: book.id,
      title: book.title,
      originalPrice: book.price,
      discountedPrice: discountedPrice,
      stock: book.stock
    };
  });

  // 4. Total stock value using reduce()
  const totalStockValue = books.reduce((accumulator, book) => {
    return accumulator + (book.price * book.stock);
  }, 0);

  // 5. Ascending price ranking using sort() on a copied array ([...books])
  const priceRanking = [...books].sort((bookA, bookB) => bookA.price - bookB.price);

  // 6. Additional checks using find(), some(), every() as specified
  const firstMatch = books.find(book => 
    book.title.toLowerCase().includes(query)
  ) || null;

  const hasOutOfStock = books.some(book => book.stock === 0);
  const allInStock = books.every(book => book.stock > 0);
  const allValidPrices = books.every(book => typeof book.price === "number" && book.price > 0);

  return {
    normalisedTitles,
    searchMatches,
    discountedCopies,
    totalStockValue,
    priceRanking,
    insights: {
      firstMatch,
      hasOutOfStock,
      allInStock,
      allValidPrices,
      discountRateApplied: `${(discount * 100).toFixed(0)}%`
    }
  };
}

// Browser UI logic
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const discountInput = document.getElementById("discountInput");
    const generateBtn = document.getElementById("generateBtn");

    const totalStockEl = document.getElementById("totalStockVal");
    const outOfStockEl = document.getElementById("outOfStockVal");
    const allValidEl = document.getElementById("allValidVal");

    const searchResultsTable = document.getElementById("searchResultsBody");
    const discountedTable = document.getElementById("discountedBody");
    const rankedTable = document.getElementById("rankedBody");
    const normalisedListEl = document.getElementById("normalisedList");

    function renderReport() {
      const query = searchInput.value;
      const discount = (parseFloat(discountInput.value) || 10) / 100;

      // Make a frozen shallow copy snapshot to verify no mutation occurred
      const originalPricesBefore = defaultBooks.map(b => b.price);

      const report = buildReport(defaultBooks, query, discount);

      // Verify non-mutation
      const originalPricesAfter = defaultBooks.map(b => b.price);
      const isUnmutated = originalPricesBefore.every((p, idx) => p === originalPricesAfter[idx]);
      console.log("Original array mutated?", !isUnmutated ? "YES (Bad)" : "NO (Correct!)");

      // Stats
      totalStockEl.textContent = `PKR ${report.totalStockValue.toLocaleString()}`;
      outOfStockEl.textContent = report.insights.hasOutOfStock ? "Yes (items need restock)" : "No (all available)";
      allValidEl.textContent = report.insights.allValidPrices ? "Yes (100% valid)" : "No";

      // Normalised titles
      normalisedListEl.innerHTML = "";
      report.normalisedTitles.forEach(t => {
        const span = document.createElement("span");
        span.className = "title-badge";
        span.textContent = t;
        normalisedListEl.appendChild(span);
      });

      // Search results
      searchResultsTable.innerHTML = "";
      if (report.searchMatches.length === 0) {
        searchResultsTable.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#94a3b8;">No matching books found for "${query}"</td></tr>`;
      } else {
        report.searchMatches.forEach(b => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>#${b.id}</td>
            <td><strong>${b.title}</strong></td>
            <td>PKR ${b.price}</td>
            <td><span class="badge ${b.stock > 0 ? "in-stock" : "out-stock"}">${b.stock > 0 ? b.stock + " in stock" : "Out of stock"}</span></td>
          `;
          searchResultsTable.appendChild(row);
        });
      }

      // Discounted copies
      discountedTable.innerHTML = "";
      report.discountedCopies.forEach(b => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${b.title}</td>
          <td style="text-decoration: line-through; color: #94a3b8;">PKR ${b.originalPrice}</td>
          <td style="color: #0f766e; font-weight: 600;">PKR ${b.discountedPrice}</td>
          <td>${b.stock} units</td>
        `;
        discountedTable.appendChild(row);
      });

      // Price ranking (Ascending)
      rankedTable.innerHTML = "";
      report.priceRanking.forEach((b, idx) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><strong>#${idx + 1}</strong></td>
          <td>${b.title}</td>
          <td>PKR ${b.price}</td>
          <td>${b.stock} units</td>
        `;
        rankedTable.appendChild(row);
      });

      console.log("Full Report Object:", report);
    }

    generateBtn.addEventListener("click", renderReport);
    searchInput.addEventListener("input", renderReport);
    discountInput.addEventListener("input", renderReport);

    // Initial render
    renderReport();
  });
}

// Node.js export
if (typeof module !== "undefined" && module.exports) {
  module.exports = { buildReport, defaultBooks };
}
