const form = document.getElementById("availability-form");
const list = document.getElementById("availability-list");

const API_URL = "https://script.google.com/macros/s/AKfycbzOQPrLbfVdTkJjC_ecQvUiX2zgfgtJiZBorEyMzMrjpIovNcP00HaBz-ebUW6MgUMd/exec"; // Replace with your Google Apps Script URL

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const meal = document.getElementById("meal").value;

    if (!name) return alert("Please enter your name!");

    // Send data to Google Sheets
    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ name, meal }),
        headers: { "Content-Type": "application/json" }
    });

    alert("Availability updated!");
    form.reset();
    loadData();
});

async function loadData() {
    const response = await fetch(API_URL);
    const data = await response.json();

    list.innerHTML = data.map(entry => 
        `<tr><td>${entry.name}</td><td>${entry.meal}</td></tr>`).join("");
}

// Load initial data
document.addEventListener("DOMContentLoaded", loadData);
