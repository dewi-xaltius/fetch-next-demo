import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #ffc857;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const Card = styled.div`
  width: 150px;
  padding: 10px;
  margin: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
`;

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
