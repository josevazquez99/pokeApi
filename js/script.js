// Selección de elementos del DOM donde se mostrará la información del Pokémon
const pokeCard = document.querySelector('[data-poke-card]'); // Tarjeta del Pokémon
const pokeName = document.querySelector('[data-poke-name]'); // Nombre del Pokémon
const pokeImg = document.querySelector('[data-poke-img]'); // Imagen del Pokémon
const pokeImgContainer = document.querySelector('[data-poke-img-container]'); // Contenedor de la imagen
const pokeId = document.querySelector('[data-poke-id]'); // ID del Pokémon
const pokeTypes = document.querySelector('[data-poke-types]'); // Tipos del Pokémon
const pokeStats = document.querySelector('[data-poke-stats]'); // Estadísticas del Pokémon

// Colores asociados a cada tipo de Pokémon
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F', // Color por defecto si no hay tipos
};

// Función para buscar un Pokémon basado en el valor ingresado
const searchPokemon = event => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    const { value } = event.target.pokemon; // Obtiene el valor ingresado en el formulario
    // Llama a la API de Pokémon para obtener datos del Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json()) // Convierte la respuesta a JSON
        .then(response => renderPokemonData(response)) // Renderiza los datos del Pokémon
        .catch(err => renderNotFound()); // Maneja el error si no se encuentra el Pokémon
}

// Función para renderizar los datos del Pokémon en la interfaz
const renderPokemonData = data => {
    const sprite =  data.sprites.front_default; // Obtiene la imagen del Pokémon
    const { stats, types } = data; // Desestructura estadísticas y tipos

    // Actualiza el contenido de la tarjeta del Pokémon
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite); // Cambia la imagen
    pokeId.textContent = `Nº ${data.id}`; // Muestra el ID del Pokémon
    setCardColor(types); // Establece el color de la tarjeta según los tipos
    renderPokemonTypes(types); // Renderiza los tipos del Pokémon
    renderPokemonStats(stats); // Renderiza las estadísticas del Pokémon
}

// Función para establecer el color de la tarjeta basado en los tipos del Pokémon
const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name]; // Primer color según el primer tipo
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default; // Segundo color, o color por defecto
    // Establece un degradado radial para la imagen del Pokémon
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px'; // Tamaño del fondo
}

// Función para renderizar los tipos del Pokémon en la interfaz
const renderPokemonTypes = types => {
    pokeTypes.innerHTML = ''; // Limpia el contenido anterior
    types.forEach(type => { // Itera sobre cada tipo
        const typeTextElement = document.createElement("div"); // Crea un nuevo elemento div para el tipo
        typeTextElement.style.color = typeColors[type.type.name]; // Establece el color del texto según el tipo
        typeTextElement.textContent = type.type.name; // Establece el nombre del tipo
        pokeTypes.appendChild(typeTextElement); // Agrega el tipo al contenedor de tipos
    });
}

// Función para renderizar las estadísticas del Pokémon en la interfaz
const renderPokemonStats = stats => {
    pokeStats.innerHTML = ''; // Limpia el contenido anterior
    stats.forEach(stat => { // Itera sobre cada estadística
        const statElement = document.createElement("div"); // Crea un nuevo div para la estadística
        const statElementName = document.createElement("div"); // Crea un div para el nombre de la estadística
        const statElementAmount = document.createElement("div"); // Crea un div para el valor de la estadística
        statElementName.textContent = stat.stat.name; // Establece el nombre de la estadística
        statElementAmount.textContent = stat.base_stat; // Establece el valor de la estadística
        statElement.appendChild(statElementName); // Agrega el nombre al elemento de la estadística
        statElement.appendChild(statElementAmount); // Agrega el valor al elemento de la estadística
        pokeStats.appendChild(statElement); // Agrega el elemento de la estadística al contenedor
    });
}

// Función que se ejecuta cuando no se encuentra el Pokémon
const renderNotFound = () => {
    pokeName.textContent = 'No encontrado'; // Muestra un mensaje de error
    pokeImg.setAttribute('src', 'poke-shadow.png'); // Muestra una imagen por defecto
    pokeImg.style.background =  '#fff'; // Establece el fondo a blanco
    pokeTypes.innerHTML = ''; // Limpia los tipos anteriores
    pokeStats.innerHTML = ''; // Limpia las estadísticas anteriores
    pokeId.textContent = ''; // Limpia el ID anterior
}
