// src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import SearchForm from './components/SearchForm';
import GameDetail from './components/GameDetail'; // <-- Import dari file asli Anda
import './App.css'; // <-- Import dari file asli Anda

// Ambil API key dari .env (dari file asli Anda)
const API_KEY = import.meta.env.VITE_RAWG_API_KEY; 

function App() {
  // === STATE DEFINITIONS (dari file asli Anda) ===
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedGame, setSelectedGame] = useState(null); 

  // State untuk form (dari file asli Anda)
  const [searchQuery, setSearchQuery] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [ordering, setOrdering] = useState('');
  
  // --- TAMBAHAN STATE TEMA ---
  // Kita set 'dark' sebagai default
  const [theme, setTheme] = useState('dark'); 
  // -------------------------

  // === DATA FETCHING (dari file asli Anda) ===
  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);

    // --- LOGIKA UTAMA API (dari file asli Anda) ---
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
    
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`; 
    }
    if (platforms.length > 0) {
      url += `&platforms=${platforms.join(',')}`; 
    }
    if (ordering) {
      url += `&ordering=${ordering}`; 
    }
    // ------------------------

    try {
      const response = await fetch(url);
      if (!response.ok) {
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

  // Jalankan fetchGames HANYA saat pertama kali load (Perbaikan dari kita)
  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- Dependency array kosong

  // === EVENT HANDLERS (dari file asli Anda) ===
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
  
  // --- TAMBAHAN FUNGSI TEMA ---
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
  };
  // ---------------------------

  // === JSX RENDER (Struktur BARU + Kode LENGKAP) ===
  return (
    // Wrapper utama dengan class tema
    <div className={`app-layout ${theme}`}>
      
      {/* 1. SIDEBAR */}
      <div className="sidebar">
        <header>
          <div className="sidebar-header-top">
            <h1>🎮 Game Database</h1>
            {/* Tombol Toggle Tema */}
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
          <p>Muharyan Syaifullah
            123140045
          </p>
        </header>
        
        {/* Form pencarian dipindah ke sidebar */}
        <SearchForm 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          platforms={platforms}
          onPlatformChange={handlePlatformChange}
          ordering={ordering}
          setOrdering={setOrdering}
          handleSubmit={handleSearchSubmit}
        />
      </div>

      {/* 2. KONTEN UTAMA */}
      <div className="main-content">
        <main>
          {/* Tampilkan Loading... (dari file asli Anda) */}
          {loading && <p className="loading-text">Loading games...</p>}
          
          {/* Tampilkan Error (dari file asli Anda) */}
          {error && <p className="error-text">Error: {error}</p>}
          
          {/* Tampilkan Grid Game jika tidak loading dan tidak error (dari file asli Anda) */}
          {!loading && !error && (
            <div className="game-grid">
              
              {/* Jika tidak ada game (dari file asli Anda) */}
              {games.length === 0 && <p>No games found.</p>}

              {/* !!!! INI BAGIAN YANG HILANG TADI !!!!
                Map data game ke card (diambil dari file App.jsx asli Anda)
              */}
              {games.map(game => (
                <div 
                  key={game.id} 
                  className="game-card"
                  // Atur game yang dipilih saat di-klik
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
              {/* !!!! AKHIR DARI BAGIAN YANG HILANG !!!! */}

            </div>
          )}
        </main>
      </div>

      {/* 3. MODAL (dari file asli Anda) */}
      {selectedGame && (
        <GameDetail 
          gameId={selectedGame} 
          // Fungsi untuk menutup modal
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </div>
  );
}

export default App;