// src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import SearchForm from './components/SearchForm';
import GameDetail from './components/GameDetail'; // <-- IMPORT YANG HILANG
import './App.css'; // <-- IMPORT YANG HILANG

// Ambil API key dari .env
// Pastikan Anda sudah membuat file .env.local
const API_KEY = import.meta.env.VITE_RAWG_API_KEY; // <-- DEFINISI YANG HILANG

function App() {
  // === STATE DEFINITIONS ===
  // State untuk menyimpan data game
  const [games, setGames] = useState([]);
  // State untuk loading
  const [loading, setLoading] = useState(true); // <-- DEFINISI YANG HILANG
  // State untuk error
  const [error, setError] = useState(null); // <-- DEFINISI YANG HILANG
  // State untuk game yang dipilih (untuk modal detail)
  const [selectedGame, setSelectedGame] = useState(null); // <-- DEFINISI YANG HILANG

  // State untuk form
  const [searchQuery, setSearchQuery] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [ordering, setOrdering] = useState('');

  // === DATA FETCHING ===
  // Gunakan useCallback agar fungsi fetchGames tidak dibuat ulang terus-menerus
  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);

    // --- LOGIKA UTAMA API ---
    // Bangun URL secara dinamis
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
    
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`; // Tambah parameter search
    }
    if (platforms.length > 0) {
      url += `&platforms=${platforms.join(',')}`; // Tambah parameter platform
    }
    if (ordering) {
      url += `&ordering=${ordering}`; // Tambah parameter sorting
    }
    // ------------------------

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Gagal mengambil data (HTTP ${response.status})`);
      }
      const data = await response.json();
      setGames(data.results); // Simpan hasil data ke state
    } catch (err) {
      setError(err.message); // Tangkap error
    } finally {
      setLoading(false); // Selesai loading
    }
  }, [searchQuery, platforms, ordering]); // <-- Dependency array

  // Jalankan fetchGames saat pertama kali load
  useEffect(() => {
    fetchGames();
  }, [fetchGames]); // <-- Panggil saat fetchGames berubah

  // === EVENT HANDLERS ===
  // Fungsi untuk handle submit form
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    fetchGames(); // Panggil API dengan state yang baru
  };

  // Fungsi untuk handle checkbox platform
  const handlePlatformChange = (value, checked) => {
    setPlatforms(prevPlatforms => 
      checked 
        ? [...prevPlatforms, value] // Tambah ke array jika dicentang
        : prevPlatforms.filter(p => p !== value) // Hapus jika tidak dicentang
    );
  };

  // === JSX RENDER ===
  return (
    <div className="container">
      <header>
        <h1>🎮 Game Database</h1>
      </header>

      {/* Kirim state dan fungsi sebagai props */}
      {/* PASTIKAN SearchForm.jsx SUDAH DIPERBAIKI UNTUK MENERIMA PROPS INI */}
      <SearchForm 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPlatformChange={handlePlatformChange}
        ordering={ordering}
        setOrdering={setOrdering}
        handleSubmit={handleSearchSubmit}
      />

      {/* BAGIAN TAMPILAN DATA (YANG HILANG DARI FILE ANDA) */}
      <main>
        {/* Tampilkan Loading... */}
        {loading && <p className="loading-text">Loading games...</p>}
        
        {/* Tampilkan Error */}
        {error && <p className="error-text">Error: {error}</p>}
        
        {/* Tampilkan Grid Game jika tidak loading dan tidak error */}
        {!loading && !error && (
          <div className="game-grid">
            {/* Jika tidak ada game */}
            {games.length === 0 && <p>No games found.</p>}

            {/* Map data game ke card */}
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
          </div>
        )}
      </main>

      {/* Tampilkan Modal Detail jika ada game yang dipilih */}
      {/* PASTIKAN GameDetail.jsx SUDAH DIPERBAIKI SYNTAX-NYA */}
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
