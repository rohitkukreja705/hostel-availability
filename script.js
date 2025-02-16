const API_URL = "https://script.google.com/macros/s/AKfycbzOQPrLbfVdTkJjC_ecQvUiX2zgfgtJiZBorEyMzMrjpIovNcP00HaBz-ebUW6MgUMd/exec"; // Replace with your actual Google Apps Script URL

document.getElementById("availability-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const meal = document.getElementById("meal").value;

    if (!name) return alert("Please enter your name!");

    const requestData = { name, meal };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();
        console.log("Server Response:", result);

        if (result.status === "success") {
            alert("Availability updated!");
            loadData(); // Refresh data
        } else {
            alert("Error: " + (result.error || "Unknown error"));
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Submission failed! Check the console for more details.");
    }
});

async function loadData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("Fetched Data:", data);

        if (!Array.isArray(data)) {
            console.error("Invalid Data Format:", data);
            return;
        }

        const list = document.getElementById("availability-list");
        list.innerHTML = data.map(entry => 
            `<tr><td>${entry.name}</td><td>${entry.meal}</td></tr>`
        ).join("");
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Load data on page load
document.addEventListener("DOMContentLoaded", loadData);
