// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css'; 
import SearchForm from './components/SearchForm';
// (Anda akan mengedit App.css untuk styling)

// Ambil API key dari .env
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

function App() {
  // State untuk menyimpan data game
  const [games, setGames] = useState([]);
  // State untuk loading
  const [loading, setLoading] = useState(true);
  // State untuk error
  const [error, setError] = useState(null);
  
  // (NANTI KITA TAMBAH STATE UNTUK SEARCH, FILTER, DSB)

  // useEffect untuk fetch data saat komponen pertama kali dimuat
  useEffect(() => {
    // Fungsi untuk fetch data
    const fetchGames = async () => {
      setLoading(true); // Mulai loading
      setError(null);   // Reset error

      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
        
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server');
        }

        const data = await response.json();
        setGames(data.results); // Simpan hasil data ke state
        
      } catch (err) {
        setError(err.message); // Tangkap error
      } finally {
        setLoading(false); // Selesai loading
      }
    };

    fetchGames();
  }, []); // [] artinya "hanya jalankan sekali saat mount"

  return (
    <div className="container">
      <header>
        <h1>🎮 Game Database</h1>
      </header>
    <SearchForm />
      {/* NANTI FORM PENCARIAN DI SINI */}

      <main>
        {loading && <p>Loading games...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {/* Tampilkan data jika tidak loading dan tidak error */}
        {!loading && !error && (
          <div className="game-grid">
            {/* Kita akan 'map' data game di sini */}
            {games.map(game => (
              <div key={game.id} className="game-card">
                <img src={game.background_image} alt={game.name} />
                <h3>{game.name}</h3>
                <p>Rating: {game.rating} / 5</p>
                <p>Release Date: {game.released}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;