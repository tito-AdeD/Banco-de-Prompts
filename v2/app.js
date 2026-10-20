const CSV_URL =
'https://raw.githubusercontent.com/tito-AdeD/Banco-de-Prompts/refs/heads/main/Mis%20Prompts%2019102026.csv';

async function loadPrompts() {

    try {

        const response = await fetch(CSV_URL);

        const csv = await response.text();

const lineas = csv.split('\n');

document.getElementById('totalPrompts').textContent =
    (lineas.length - 1) + ' líneas cargadas';

const primeraLinea = lineas[1];

const contenedor =
    document.createElement('div');

contenedor.innerHTML =
    '<h2>Primer registro encontrado</h2>' +
    '<pre>' + primeraLinea + '</pre>';

document.body.appendChild(contenedor);

      
          
        console.log(csv);

    } catch (error) {

        console.error(error);

        document.getElementById('totalPrompts').textContent =
            'Error cargando CSV';

    }

}

window.onload = loadPrompts;
