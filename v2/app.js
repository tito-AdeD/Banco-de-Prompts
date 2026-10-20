const CSV_URL =
'https://raw.githubusercontent.com/tito-AdeD/Banco-de-Prompts/refs/heads/main/Mis%20Prompts%2019102026.csv';

async function loadPrompts() {

    try {

        const response = await fetch(CSV_URL);

        const csv = await response.text();

const lineas = csv.split('\n');

document.getElementById('totalPrompts').textContent =
    (lineas.length - 1) + ' líneas cargadas';

      
          
        console.log(csv);

    } catch (error) {

        console.error(error);

        document.getElementById('totalPrompts').textContent =
            'Error cargando CSV';

    }

}

window.onload = loadPrompts;
