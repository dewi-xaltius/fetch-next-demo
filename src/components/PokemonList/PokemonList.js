// components/PokemonList.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, CardGrid, Card, PokemonImage } from './PokemonList.styles';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000');
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
    <Container>
      <Button onClick={fetchPokemons} disabled={loading}>
        {loading ? 'Loading...' : 'Show All Pokémon'}
      </Button>
      <CardGrid>
        {pokemons.map((pokemon, index) => (
          <Card key={index}>
            <PokemonImage src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
};

export default PokemonList;
