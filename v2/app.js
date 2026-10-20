const CSV_URL =
'https://raw.githubusercontent.com/tito-AdeD/Banco-de-Prompts/refs/heads/main/Mis%20Prompts%2019102026.csv';

async function loadPrompts() {

    try {

        const response = await fetch(CSV_URL);

        const csv = await response.text();

        document.getElementById('totalPrompts').textContent =
            'CSV cargado correctamente';

        console.log(csv);

    } catch (error) {

        console.error(error);

        document.getElementById('totalPrompts').textContent =
            'Error cargando CSV';

    }

}

window.onload = loadPrompts;
