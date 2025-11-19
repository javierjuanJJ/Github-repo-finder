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

  async function fetchReposByLanguage(language) {
    const url = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`;
  
    try {
      // Mostrar estado de carga
      console.log("Cargando repos...");
  
      const response = await fetch(url);
  
      // Manejo de errores HTTP
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Verificar si hay resultados
      if (!data.items || data.items.length === 0) {
        console.log("No se encontraron repositorios para este lenguaje.");
        return null;
      }
  
      console.log("Repos obtenidos:", data.items.length);
      return data.items;
  
    } catch (error) {
      console.error("Error al obtener repos:", error);
      return null;
    }
  }
  

  async function fetchRandomRepo(language) {
  statusDiv.textContent = "Cargando repositorios...";
  repoContainer.innerHTML = "";
  refreshBtn.hidden = true;

  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=50`);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      statusDiv.textContent = "No se encontraron repositorios.";
      return;
    }

    const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];
    displayRepo(randomRepo);
    refreshBtn.hidden = false;
    statusDiv.textContent = "";

    // Guardar para refrescar
    window.currentRepos = data.items;
  } catch (error) {
    statusDiv.textContent = "❌ Error al cargar los repositorios.";
  }
}
languageSelect.addEventListener("change", async (e) => {
  const lang = e.target.value;
  if (!lang) return;
  await fetchRandomRepo(lang);
});
  

function displayRepo(repo) {
  repoContainer.innerHTML = `
    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
    <p>${repo.description || "Sin descripción"}</p>
    <ul>
      <li>⭐ Stars: ${repo.stargazers_count}</li>
      <li>🍴 Forks: ${repo.forks_count}</li>
      <li>🐛 Issues: ${repo.open_issues_count}</li>
    </ul>
  `;
}


async function fetchRandomRepo(language) {
  statusDiv.textContent = "Cargando repositorios...";
  repoContainer.innerHTML = "";
  refreshBtn.hidden = true;

  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=50`);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      statusDiv.textContent = "No se encontraron repositorios.";
      return;
    }

    const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];
    displayRepo(randomRepo);
    refreshBtn.hidden = false;
    statusDiv.textContent = "";

    // Guardar para refrescar
    window.currentRepos = data.items;
  } catch (error) {
    statusDiv.textContent = "❌ Error al cargar los repositorios.";
  }
}
