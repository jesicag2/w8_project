let previewPokemonObj;

document.getElementById('pokemonForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('pokemonInput').value.toLowerCase();
    document.getElementById('pokemonInput').value = "";
    const result = await getPokeData(searchTerm);
    previewPokemon(result);
});

async function getPokeData(query) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (response.status == 404) {
        alert(`Pokemon not found with search term "${query}"`)
    }
    return await response.json();
}

async function previewPokemon(pokemon) {
    const pokemonObj = pokemon;

    
    const pokemonDetailsElement = document.getElementById('pokemonDetails');
    pokemonDetailsElement.innerHTML = `
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" class="card-img-top" alt="${pokemon.name}">
                
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                    <p class="card-text">Types: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                    <h6 class="card-subtitle mb-2">Abilities:</h6>
                    <ul class="list-group">
                        ${pokemon.abilities.map(ability => `<li class="list-group-item">${ability.ability.name}</li>`).join('')}
                    </ul>
                    <h6 class="card-subtitle mb-2">Moves:</h6>
                    <ul class="list-group">
                        ${pokemon.moves.map(move => `<li class="list-group-item">${move.move.name}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}
