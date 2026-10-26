"use strict";

const books = [
  { id: 1, title: "HTML Essentials", price: 1000, stock: 5 },
  { id: 2, title: "CSS Layouts", price: 1500, stock: 0 },
  { id: 3, title: "JavaScript Lab", price: 2000, stock: 3 }
];

// builds the report without changing the books array
function buildReport(books, search, discount) {
  if (!Array.isArray(books)) {
    throw new TypeError("books must be an array");
  }

  const word = search.trim().toLowerCase();

  // map: uppercase titles
  const titles = books.map(b => b.title.toUpperCase());

  // filter: books whose title has the search word
  const matches = books.filter(b => b.title.toLowerCase().includes(word));

  // map: copies with a discounted price (spread makes a new object)
  const discounted = books.map(b => ({
    ...b,
    discountedPrice: Math.round(b.price * (1 - discount))
  }));

  // reduce: total value of everything in stock
  const totalValue = books.reduce((sum, b) => sum + b.price * b.stock, 0);

  // sort a copy, sort() on the original would change it
  const byPrice = [...books].sort((a, b) => a.price - b.price);

  // find, some, every
  const firstMatch = books.find(b => b.title.toLowerCase().includes(word));
  const anyOutOfStock = books.some(b => b.stock === 0);
  const allInStock = books.every(b => b.stock > 0);

  return {
    titles, matches, discounted, totalValue,
    byPrice, firstMatch, anyOutOfStock, allInStock
  };
}

// ---- page code ----
const searchBox = document.getElementById("search");
const discountBox = document.getElementById("discount");

function show() {
  const search = searchBox.value;
  let percent = Number(discountBox.value);

  // bad discount values fall back to 0
  if (isNaN(percent) || percent < 0 || percent > 100) {
    percent = 0;
  }

  // save the books as text before, compare after
  const before = JSON.stringify(books);
  const report = buildReport(books, search, percent / 100);
  const after = JSON.stringify(books);

  // table
  const rows = document.getElementById("rows");
  rows.innerHTML = "";

  report.discounted.forEach(function (b) {
    const tr = document.createElement("tr");

    // highlight the row if it matches the search
    const isMatch = report.matches.some(m => m.id === b.id);
    if (search.trim() !== "" && isMatch) {
      tr.className = "found";
    }

    tr.innerHTML =
      "<td>" + b.id + "</td>" +
      "<td>" + b.title + "</td>" +
      "<td>" + b.price + "</td>" +
      "<td>" + b.discountedPrice + "</td>" +
      "<td>" + (b.stock > 0 ? b.stock : "out of stock") + "</td>";

    rows.appendChild(tr);
  });

  // report
  document.getElementById("titles").textContent = report.titles.join(", ");
  document.getElementById("value").textContent = "PKR " + report.totalValue;
  document.getElementById("anyOut").textContent = report.anyOutOfStock ? "yes" : "no";
  document.getElementById("allIn").textContent = report.allInStock ? "yes" : "no";
  document.getElementById("audit").textContent = before === after ? "yes" : "NO";

  // ranking list
  const list = document.getElementById("ranking");
  list.innerHTML = "";

  report.byPrice.forEach(function (b) {
    const li = document.createElement("li");
    li.textContent = b.title + " - PKR " + b.price;
    list.appendChild(li);
  });
}

searchBox.addEventListener("input", show);
discountBox.addEventListener("input", show);

show();
