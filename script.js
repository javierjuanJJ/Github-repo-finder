const languages = [
    "JavaScript", "Python", "Java", "C++", "TypeScript",
    "Go", "Ruby", "C#", "PHP", "Rust", "Swift", "Kotlin"
  ];
  
  const languageSelect = document.getElementById("languageSelect");
  const repoContainer = document.getElementById("repoContainer");
  const statusDiv = document.getElementById("status");
  const refreshBtn = document.getElementById("refreshBtn");
  
  // Llenar el dropdown
  languages.forEach(lang => {
    const option = document.createElement("option");
    option.value = lang;
    option.textContent = lang;
    languageSelect.appendChild(option);
  });