const JSON_URL = './prompts.json';

async function loadPrompts() {

    try {

        const response = await fetch(JSON_URL);

        const prompts = await response.json();

        renderPrompts(prompts);

        document.getElementById('totalPrompts').textContent =
            prompts.length + ' prompts encontrados';

        document
            .getElementById('searchInput')
            .addEventListener('input', function () {

                const texto =
                    this.value.toLowerCase();

                const filtrados =
                    prompts.filter(prompt =>
                        prompt.titulo.toLowerCase().includes(texto) ||
                        prompt.categoria.toLowerCase().includes(texto)
                    );

                renderPrompts(filtrados);

                document.getElementById('totalPrompts').textContent =
                    filtrados.length + ' prompts encontrados';

            });

    } catch (error) {

        console.error(error);

        document.getElementById('totalPrompts').textContent =
            'Error cargando datos';

    }

}

function renderPrompts(prompts) {

    const contenedor =
        document.getElementById('promptsContainer');

    contenedor.innerHTML = '';

    prompts.forEach(prompt => {

        contenedor.innerHTML +=
            '<div class="card">' +
            '<h2>' + prompt.titulo + '</h2>' +
            '<p><b>Categoría:</b> ' + prompt.categoria + '</p>' +
            '<p><b>Fecha:</b> ' + prompt.fecha + '</p>' +
            '<button>Ver Prompt</button>' +
            '</div>';

    });

}

window.onload = loadPrompts;
