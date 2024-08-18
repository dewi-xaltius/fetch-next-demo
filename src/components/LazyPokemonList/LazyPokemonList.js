// components/LazyPokemonList.js
import React, { useState } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Container, Button, CardGrid, Card } from '../PokemonList/PokemonList.styles';

const LazyPokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
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

  const handleClick = () => {
    setIsButtonClicked(true);
    fetchPokemons();
  };

  return (
    <Container>
      <Button onClick={handleClick} disabled={loading || isButtonClicked}>
        {loading ? 'Loading...' : 'Lazy Load Pokémon List'}
      </Button>
      {isButtonClicked && (
        <CardGrid>
          {pokemons.map((pokemon, index) => (
            <Card key={index}>
              <LazyLoadImage
                alt={pokemon.name}
                height={100}
                src={pokemon.image} // The image source
                width={100}
                effect="blur" // Optional: you can use "opacity" or "black-and-white" effects too
                style={{ objectFit: 'cover' }}
              />
              <p>{pokemon.name}</p>
            </Card>
          ))}
        </CardGrid>
      )}
    </Container>
  );
};

export default LazyPokemonList;
