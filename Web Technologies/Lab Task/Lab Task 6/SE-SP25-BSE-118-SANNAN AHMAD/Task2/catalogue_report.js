// Web Technologies (CS-312) - Lab 06
// Student: Sannan Ahmad | SE-SP25-BSE-118
// Task 2: Non-mutating Catalogue Report

"use strict";

// Activity 3 Base Catalogue
const books = [
  { id: 1, title: "HTML Essentials", price: 1000, stock: 5 },
  { id: 2, title: "CSS Layouts", price: 1500, stock: 0 },
  { id: 3, title: "JavaScript Lab", price: 2000, stock: 3 }
];

// Generates catalogue report without mutating the input array
function buildReport(bookList, searchQuery = "", discountRate = 0.10) {
  if (!Array.isArray(bookList)) {
    throw new Error("Invalid catalogue: Expected an array of books.");
  }

  // 1. map: produce uppercase titles
  const titlesUpper = bookList.map(b => b.title.toUpperCase());

  // 2. filter: search by title
  const term = searchQuery.trim().toLowerCase();
  const searchResults = bookList.filter(b =>
    b.title.toLowerCase().includes(term)
  );

  // 3. map: create copies with discounted prices (pure, non-mutating)
  const discountedBooks = bookList.map(b => {
    const discountedPrice = Math.round(b.price * (1 - discountRate));
    return {
      id: b.id,
      title: b.title,
      price: b.price,
      discountedPrice: discountedPrice,
      stock: b.stock
    };
  });

  // 4. reduce: calculate total inventory stock value (price * stock)
  const totalValue = bookList.reduce((sum, b) => {
    return sum + (b.price * b.stock);
  }, 0);

  // 5. sort: sort shallow copy by price in ascending order
  const sortedByPrice = [...bookList].sort((a, b) => a.price - b.price);

  // 6. find, some, every
  const matchedBook = bookList.find(b => b.title.toLowerCase().includes(term)) || null;
  const hasOutOfStock = bookList.some(b => b.stock === 0);
  const allInStock = bookList.every(b => b.stock > 0);
  const allPricesPositive = bookList.every(b => typeof b.price === "number" && b.price > 0);

  return {
    titlesUpper,
    searchResults,
    discountedBooks,
    totalValue,
    sortedByPrice,
    matchedBook,
    hasOutOfStock,
    allInStock,
    allPricesPositive
  };
}

// UI handling
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    const searchQuery = document.getElementById("searchQuery");
    const discountRate = document.getElementById("discountRate");
    const btnFilter = document.getElementById("btnFilter");

    const valTotalStock = document.getElementById("valTotalStock");
    const statusStock = document.getElementById("statusStock");
    const statusAudit = document.getElementById("statusAudit");
    const uppercaseTitles = document.getElementById("uppercaseTitles");
    const catalogTableBody = document.getElementById("catalogTableBody");
    const rankingList = document.getElementById("rankingList");

    function renderView() {
      const query = searchQuery ? searchQuery.value : "";
      const discountPercent = discountRate ? Number(discountRate.value) : 10;
      const discountDecimal = (discountPercent >= 0 && discountPercent <= 100)
        ? discountPercent / 100
        : 0.10;

      // Verify original catalogue is not mutated
      const snapshotBefore = JSON.stringify(books);
      const report = buildReport(books, query, discountDecimal);
      const isUnmutated = JSON.stringify(books) === snapshotBefore;

      if (statusAudit) {
        statusAudit.textContent = isUnmutated
          ? "Verified (Original catalogue unmutated)"
          : "Failed (Array mutated)";
        statusAudit.style.color = isUnmutated ? "#03543f" : "#9b1c1c";
      }

      // Update total inventory value
      if (valTotalStock) {
        valTotalStock.textContent = `PKR ${report.totalValue.toLocaleString()}`;
      }

      // Stock status
      if (statusStock) {
        statusStock.textContent = report.hasOutOfStock
          ? "Warning: Some items are out of stock"
          : "All items in stock";
        statusStock.style.color = report.hasOutOfStock ? "#b45309" : "#03543f";
      }

      // Normalised titles
      if (uppercaseTitles) {
        uppercaseTitles.textContent = report.titlesUpper.join(" | ");
      }

      // Populate table rows
      if (catalogTableBody) {
        catalogTableBody.innerHTML = "";
        const queryTerm = query.trim().toLowerCase();

        report.discountedBooks.forEach(b => {
          const isMatch = queryTerm !== "" && b.title.toLowerCase().includes(queryTerm);
          const tr = document.createElement("tr");
          if (isMatch) {
            tr.className = "highlight";
          }

          const badgeClass = b.stock > 0 ? "badge badge-in-stock" : "badge badge-out-stock";
          const badgeText = b.stock > 0 ? `${b.stock} units` : "Out of stock";

          tr.innerHTML = `
            <td>#${b.id}</td>
            <td><strong>${b.title}</strong></td>
            <td>PKR ${b.price.toLocaleString()}</td>
            <td><strong style="color: #2b5c8f;">PKR ${b.discountedPrice.toLocaleString()}</strong></td>
            <td><span class="${badgeClass}">${badgeText}</span></td>
          `;
          catalogTableBody.appendChild(tr);
        });
      }

      // Populate price ranking
      if (rankingList) {
        rankingList.innerHTML = "";
        report.sortedByPrice.forEach(b => {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${b.title}</strong> &mdash; PKR ${b.price.toLocaleString()} (${b.stock} in stock)`;
          rankingList.appendChild(li);
        });
      }
    }

    if (btnFilter) btnFilter.addEventListener("click", renderView);
    if (searchQuery) searchQuery.addEventListener("input", renderView);
    if (discountRate) discountRate.addEventListener("input", renderView);

    // Initial render
    renderView();
  });
}

// Export for Node testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { buildReport, books };
}
