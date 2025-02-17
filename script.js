// 🔹 Replace with your Supabase Project Credentials
const SUPABASE_URL = "https://vqsvhorvwcgbvguuvpaz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxc3Zob3J2d2NnYnZndXV2cGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3ODA5MTAsImV4cCI6MjA1NTM1NjkxMH0.ZlYy7Cm8Zd5lyE0_8zqwTBWbfH9T595Egho48kGLMec";
// ✅ Ensure Supabase is correctly initialized before using it

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ✅ Handle Form Submission
document.getElementById("availability-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const meal = document.getElementById("meal").value;

    if (!name) {
        alert("❌ Please enter your name!");
        return;
    }

    // ✅ Insert data into Supabase
    const { error } = await supabase
        .from("availability")
        .insert([{ name, meal }]);

    if (error) {
        console.error("❌ Submission Error:", error);
        alert("Submission failed!");
    } else {
        alert("✅ Submitted successfully!");
        document.getElementById("availability-form").reset();
        fetchAvailability(); // Re-fetch after submission
    }
});

// Function to update the count in the table
function updateMealCounts(lunchCount, dinnerCount) {
    document.getElementById("lunch-count-value").textContent = lunchCount;
    document.getElementById("dinner-count-value").textContent = dinnerCount;
}

// Fetch meal availability data from Supabase
async function fetchAvailability() {
	const list = document.getElementById("availability-list");
	// ✅ Display the full list of availability
    const { data, error } = await supabase
        .from("availability")
        .select("*")
        .order("timestamp", { ascending: false });

    if (error) {
        console.error("❌ Fetch Error:", error);
        return;
    }

    data.forEach((entry) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${entry.name} - ${entry.meal}`;
        list.appendChild(listItem);
    });
    try {
        const { data, error } = await supabase
            .from("availability")
            .select("*");

        if (error) {
            console.error("❌ Fetch Error:", error);
            return;
        }

        let lunchCount = 0;
        let dinnerCount = 0;

        // Count the number of people available for each meal
        data.forEach(entry => {
            if (entry.meal === "lunch") lunchCount++;
            if (entry.meal === "dinner") dinnerCount++;
        });

        // Update table values
        updateMealCounts(lunchCount, dinnerCount);
    } catch (error) {
        console.error("❌ Error fetching data:", error);
    }
}

// Call the function to fetch availability on page load
fetchAvailability();
