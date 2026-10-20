const JSON_URL = './prompts.json';

async function loadPrompts() {

    try {

 const response = await fetch(JSON_URL);

const prompts = await response.json();       

document.getElementById('totalPrompts').textContent =
    prompts.length + ' prompts encontrados';

document.getElementById('totalPrompts').textContent =
    '74 prompts encontrados';

const primeraLinea = prompts[0].titulo;

const contenedor =
    document.createElement('div');

contenedor.innerHTML =
    '<h2>Primer registro encontrado</h2>' +
    '<pre>' + primeraLinea + '</pre>';

document.body.appendChild(contenedor);

                
        console.log(csv);
const registros = csv.split('\n# ');
console.log('Posibles registros:', registros.length);

        
    } catch (error) {

        console.error(error);

        document.getElementById('totalPrompts').textContent =
            'Error cargando CSV';

    }

}

window.onload = loadPrompts;
