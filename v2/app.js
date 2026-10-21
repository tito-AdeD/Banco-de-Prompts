contenedor.innerHTML = '';

prompts.forEach(prompt => {

    contenedor.innerHTML +=
        '<div class="card">' +
        '<h2>' + prompt.titulo + '</h2>' +
        '<p>' + prompt.categoria + '</p>' +
        '<p>' + prompt.fecha + '</p>' +
        '<button>Ver Prompt</button>' +
        '</div>';

});
