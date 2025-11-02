// src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import SearchForm from './components/SearchForm';
import GameDetail from './components/GameDetail';
import './App.css';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY; 

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [ordering, setOrdering] = useState('');

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);

    // vvvv INI BAGIAN YANG DIUBAH vvvv
    // Kita panggil proxy /api, bukan https://api.rawg.io
    let url = `/api/games?key=${API_KEY}`;
    // ^^^^ INI BAGIAN YANG DIUBAH ^^^^
    
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    if (platforms.length > 0) {
      url += `&platforms=${platforms.join(',')}`;
    }
    if (ordering) {
      url += `&ordering=${ordering}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        // Cek jika error 401 (API Key salah)
        if (response.status === 401) {
          throw new Error('API Key tidak valid. Cek file .env kamu.');
        }
        throw new Error(`Gagal mengambil data (HTTP ${response.status})`);
      }
      const data = await response.json();
      setGames(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, platforms, ordering]);

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchGames();
  };

  const handlePlatformChange = (value, checked) => {
    setPlatforms(prevPlatforms => 
      checked 
        ? [...prevPlatforms, value]
        : prevPlatforms.filter(p => p !== value)
    );
  };

  return (
    <div className="container">
      <header>
        <h1>🎮 Game Database</h1>
      </header>

      <SearchForm 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        platforms={platforms}
        onPlatformChange={handlePlatformChange}
        ordering={ordering}
        setOrdering={setOrdering}
        handleSubmit={handleSearchSubmit}
      />

      <main>
        {loading && <p className="loading-text">Loading games...</p>}
        {error && <p className="error-text">Error: {error}</p>}
        
        {!loading && !error && (
          <div className="game-grid">
            {games.length === 0 && <p>No games found.</p>}
            {games.map(game => (
              <div 
                key={game.id} 
                className="game-card"
                onClick={() => setSelectedGame(game.id)} 
              >
                <img 
                  src={game.background_image || 'https://placehold.co/600x400?text=No+Image'} 
                  alt={game.name} 
                />
                <div className="game-card-info">
                  <h3>{game.name}</h3>
                  <p>Rating: {game.rating} / 5</p>
                  <p>Release Date: {game.released}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedGame && (
        <GameDetail 
          gameId={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </div>
  );
}

export default App;