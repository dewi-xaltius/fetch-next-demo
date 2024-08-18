import React, { useState } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=9');
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return {
            name: pokemonDetails.data.name,
            image: pokemonDetails.data.sprites.front_default,
          };
        })
      );
      setPokemons(pokemonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchPokemons} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Pokémon'}
      </button>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {pokemons.map((pokemon, index) => (
          <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
