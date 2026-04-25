function saveEntry() {
  const input = document.getElementById("diaryInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Write something first!");
    return;
  }

  const entry = {
    text: text,
    date: new Date().toLocaleString()
  };

  let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
  entries.push(entry);
  localStorage.setItem("diaryEntries", JSON.stringify(entries));

  input.value = "";
  displayEntries();
}

function displayEntries() {
  const container = document.getElementById("entries");
  container.innerHTML = "";

  let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];

  entries.forEach((entry, index) => {
    const div = document.createElement("div");
    div.className = "entry";

    div.innerHTML = `
      <span class="delete-btn" onclick="deleteEntry(${index})">❌</span>
      <div>${entry.text}</div>
      <div class="date">${entry.date}</div>
    `;

    container.appendChild(div);
  });
}

function deleteEntry(index) {
  let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
  entries.splice(index, 1);
  localStorage.setItem("diaryEntries", JSON.stringify(entries));
  displayEntries();
}

window.onload = displayEntries;