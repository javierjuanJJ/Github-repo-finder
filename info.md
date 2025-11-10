# 🧭 Guía completa + código paso a paso  
**Proyecto:** GitHub Random Repository Finder  
**Objetivo:** Crear una app que muestra un repositorio aleatorio de GitHub según el lenguaje elegido, usando la API pública de GitHub.

---

## 🧩 Paso 1: Estructura básica del proyecto

**Archivo:** `index.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitHub Random Repository Finder</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>GitHub Random Repository Finder</h1>
    <select id="languageSelect">
      <option value="">Selecciona un lenguaje</option>
    </select>
    <div id="status"></div>
    <div id="repoContainer"></div>
    <button id="refreshBtn" hidden>🔄 Obtener otro repositorio</button>
  </div>
  <script src="script.js"></script>
</body>
</html>



🎨 Paso 2: Estilos básicos

Archivo: style.css

body {
  font-family: 'Arial', sans-serif;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

#repoContainer {
  margin-top: 1rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
}

button {
  margin-top: 1rem;
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

⚙️ Paso 3: Lista de lenguajes

Archivo: script.js

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

🧠 Paso 4: Escuchar evento de selección y hacer fetch
languageSelect.addEventListener("change", async (e) => {
  const lang = e.target.value;
  if (!lang) return;
  await fetchRandomRepo(lang);
});

🔗 Paso 5: Llamar a la API de GitHub y mostrar “Cargando...”
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

💬 Paso 6: Mostrar información del repositorio
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

🔁 Paso 7: Implementar botón “Refresh”
refreshBtn.addEventListener("click", () => {
  if (!window.currentRepos) return;
  const randomRepo = window.currentRepos[Math.floor(Math.random() * window.currentRepos.length)];
  displayRepo(randomRepo);
});

⚡ Paso 8: Manejo de errores y estados vacíos

Ya está cubierto dentro de los bloques try/catch y validaciones con mensajes en statusDiv.

✨ Paso 9: Mejoras opcionales

Agregar animaciones con CSS o librerías.

Mostrar el avatar del owner:

<img src="${repo.owner.avatar_url}" width="50" alt="${repo.owner.login}" />


Añadir filtros avanzados (número de estrellas mínimo, etc.).

✅ Resultado final

Al seleccionar un lenguaje:

Se muestra “Cargando...”

Luego aparece un repositorio aleatorio con nombre, descripción y estadísticas.

Aparece un botón “Obtener otro repositorio” para cambiar sin recargar la página.

Autor: [Tu nombre o username]
Proyecto base: roadmap.sh GitHub Repo Finder Challenge