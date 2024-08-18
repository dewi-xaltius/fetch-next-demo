import PokemonList from '../components/PokemonList/PokemonList';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#fff3b0', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Pokémon Gallery</h1>
      <PokemonList />
    </div>
  );
}
