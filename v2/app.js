const JSON_URL = './prompts.json';

async function loadPrompts() {

    try {

 const response = await fetch(JSON_URL);

const prompts = await response.json();       

document.getElementById('totalPrompts').textContent =
    prompts.length + ' prompts encontrados';

document.getElementById('totalPrompts').textContent =
    '74 prompts encontrados';

              
       
        
    } catch (error) {

        console.error(error);

        document.getElementById('totalPrompts').textContent =
            'Error cargando datos';

    }

}

window.onload = loadPrompts;
