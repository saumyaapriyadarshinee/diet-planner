window.onload = function() {
    loadEntries();
};

document.getElementById("saveEntry").addEventListener("click", function() {
    let content = document.getElementById("journalEntry").value.trim();
    if (content) {
        saveEntry(content);
        document.getElementById("journalEntry").value = "";
    } else {
        alert("Please write something before saving!");
    }
});

function saveEntry(content) {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    let timestamp = new Date().toLocaleString();
    entries.push({ content: content, timestamp: timestamp });

    localStorage.setItem("journalEntries", JSON.stringify(entries));
    loadEntries();
}

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    let entriesList = document.getElementById("entriesList");
    entriesList.innerHTML = "";
    entries.forEach((entry, index) => {
        let div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = `
            <p>${entry.content}</p>
            <p class="timestamp">${entry.timestamp}</p>
            <button class="deleteBtn" onclick="deleteEntry(${index})">Delete</button>
        `;
        entriesList.appendChild(div);
    });
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.splice(index, 1);
    localStorage.setItem("journalEntries", JSON.stringify(entries));
    loadEntries();
}
