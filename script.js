document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("availability-form");
    const list = document.getElementById("availability-list");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const meal = document.getElementById("meal").value;

        if (!name) return alert("Please enter your name!");

        const newEntry = { name, meal };

        // Fetch existing data
        const response = await fetch("data.json");
        const data = await response.json();

        // Add new entry
        data.push(newEntry);

        // Send update request (GitHub API)
        await fetch("https://api.github.com/repos/rohitkukreja705/hostel-availability/contents/data.json", {
            method: "PUT",
            headers: {
                "Authorization": "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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Update meal availability",
                content: btoa(JSON.stringify(data, null, 2)),
                sha: await getFileSHA()
            })
        });

        alert("Availability updated!");
        form.reset();
        loadData();
    });

    async function loadData() {
        const response = await fetch("data.json");
        const data = await response.json();
        list.innerHTML = data.map(entry => `<tr><td>${entry.name}</td><td>${entry.meal}</td></tr>`).join("");
    }

    async function getFileSHA() {
        const response = await fetch("https://api.github.com/repos/rohitkukreja705/hostel-availability/contents/data.json");
        const data = await response.json();
        return data.sha;
    }

    loadData();
});
