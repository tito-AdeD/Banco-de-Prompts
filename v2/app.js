const JSON_URL = './prompts.json';

async function loadPrompts() {

    try {

 const response = await fetch(JSON_URL);

const prompts = await response.json(); 
        

document.getElementById('totalPrompts').textContent =
    prompts.length + ' prompts encontrados';


        
const contenedor =
    document.getElementById('promptsContainer');

contenedor.innerHTML =
    '<div class="card">' +
    '<h2>' + prompts[0].titulo + '</h2>' +
    '<p>' + prompts[0].categoria + '</p>' +
    '<p>' + prompts[0].fecha + '</p>' +
    '<button>Ver Prompt</button>' +
    '</div>';
              
       
        
    } catch (error) {

        console.error(error);

        document.getElementById('totalPrompts').textContent =
            'Error cargando datos';

    }

}

window.onload = loadPrompts;
