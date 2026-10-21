const JSON_URL = "./prompts.json";

let promptsGlobal = [];

async function loadPrompts() {

    try {

        const response = await fetch(JSON_URL);

        const prompts = await response.json();

        promptsGlobal = prompts;

        renderPrompts(prompts);

        document.getElementById("totalPrompts").textContent =
            prompts.length + " prompts encontrados";

        document
            .getElementById("searchInput")
            .addEventListener("input", buscarPrompts);

    } catch (error) {

        console.error(error);

        document.getElementById("totalPrompts").textContent =
            "Error cargando datos";

    }

}

function buscarPrompts() {

    const texto =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const filtrados = promptsGlobal.filter(prompt =>
        prompt.titulo.toLowerCase().includes(texto) ||
        prompt.categoria.toLowerCase().includes(texto)
    );

    document.getElementById("totalPrompts").textContent =
        filtrados.length + " prompts encontrados";

    renderPrompts(filtrados);

}

function renderPrompts(prompts) {

    const contenedor =
        document.getElementById("promptsContainer");

    contenedor.innerHTML = "";

    prompts.forEach(prompt => {

        contenedor.innerHTML +=
            '<div class="card">' +
            '<h2>' + prompt.titulo + '</h2>' +
            '<p><strong>Categoría:</strong> ' + prompt.categoria + '</p>' +
            '<p><strong>Fecha:</strong> ' + prompt.fecha + '</p>' +
            '<button onclick="alert(`' +
            prompt.prompt.replace(/`/g,'') +
            '`)">Ver Prompt</button>' +
            '</div>';

    });

}

window.onload = loadPrompts;
