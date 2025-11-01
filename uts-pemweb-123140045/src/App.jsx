// src/App.jsx
import { useState, useEffect, useCallback } from 'react'; // Tambah useCallback
import SearchForm from './components/SearchForm';

function App() {
  // ... state games, loading, error ...
  const [searchQuery, setSearchQuery] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [ordering, setOrdering] = useState('');

  // Gunakan useCallback agar fungsi fetchGames tidak dibuat ulang terus-menerus
  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);

    // --- LOGIKA UTAMA API ---
    // Bangun URL secara dinamis
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
    
    if (searchQuery) {
      url += `&search=${searchQuery}`; // Tambah parameter search
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
      if (!response.ok) throw new Error('Gagal mengambil data');
      const data = await response.json();
      setGames(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, platforms, ordering]); // <-- Dependency array

  // Jalankan fetchGames saat pertama kali load
  useEffect(() => {
    fetchGames();
  }, [fetchGames]); // <-- Panggil saat fetchGames berubah

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

  return (
    <div className="container">
      <header>
        <h1>🎮 Game Database</h1>
      </header>

      {/* Kirim state dan fungsi sebagai props */}
      <SearchForm 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPlatformChange={handlePlatformChange}
        ordering={ordering}
        setOrdering={setOrdering}
        handleSubmit={handleSearchSubmit}
      />

      {/* ... sisa JSX untuk loading, error, dan game grid ... */}
      {/* ... */}
    </div>
  );
}

export default App;