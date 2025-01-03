const pokemonName = document.querySelector('.pokemon_name')
const pokemonID = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const search = document.querySelector('.form')
const input = document.querySelector('.input_search')

const prev = document.querySelector('.btn_prev')
const next = document.querySelector('.btn_next')

let searchPokemon = 1

const fetchPokemon = async (pokemon)=>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{
    console.log("chegou")
    pokemonName.innerHTML = 'Loading...'
    pokemonID.innerHTML = ""

    const data = await fetchPokemon(pokemon)

    if (data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name
        pokemonID.innerHTML = data.id
        searchPokemon = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    } else{
        pokemonName.innerHTML = "Not found"
        pokemonID.innerHTML = ''
        pokemonImage.style.display = 'none'
    }
    input.value  = ''
}

search.addEventListener('submit', (event) =>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase())
})

renderPokemon(searchPokemon)

prev.addEventListener('click', ()=>{
    if (search > 1){
        searchPokemon -=1
        renderPokemon(searchPokemon)
    }
});

next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});