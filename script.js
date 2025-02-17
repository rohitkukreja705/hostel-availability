const API_URL = "https://script.google.com/macros/s/AKfycbzOQPrLbfVdTkJjC_ecQvUiX2zgfgtJiZBorEyMzMrjpIovNcP00HaBz-ebUW6MgUMd/exec"; // Replace with your actual Google Apps Script URL

document.getElementById("availability-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const meal = document.getElementById("meal").value;

    if (!name) {
        alert("❌ Please enter your name!");
        return;
    }

    const requestData = { name, meal };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ Server Response:", result);

        if (result.status === "success") {
            alert("✅ Availability updated!");
            document.getElementById("availability-form").reset();
        } else {
            alert("❌ Error: " + (result.message || "Unknown error"));
        }
    } catch (error) {
        console.error("❌ Fetch Error:", error);
        alert("Submission failed! Check the console for more details.");
    }
});
