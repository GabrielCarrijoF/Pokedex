const pokemonName = document.querySelector('.poke-name');
const pokemonId = document.querySelector('.poke-number');
const pokemonImg = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');

const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if( APIResponse.status === 200){

        const data = await APIResponse.json();
        return data;
    }   
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading ...';
    pokemonId.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
    if(data){
    pokemonImg.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = data.id;
    pokemonImg.src =  data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input.value = '';
    searchPokemon = data.id;
    } else {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :c';
        pokemonId.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

    prev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
  });
  
    next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  });
  
  renderPokemon(searchPokemon);