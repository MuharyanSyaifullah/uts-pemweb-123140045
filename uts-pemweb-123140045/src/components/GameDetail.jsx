// src/components/GameDetail.jsx
import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

// Terima 'id' game dan fungsi 'onClose'
function GameDetail({ gameId, onClose }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) return;

    const fetchDetail = async () => {
      setLoading(true);
      const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
      const data = await response.json();
      setDetail(data);
      setLoading(false);
    };

    fetchDetail();
  }, [gameId]); // Jalankan ulang jika gameId berubah

  if (loading) return <p>Loading details...</p>;
  if (!detail) return null;

  return (
    // Ini bisa jadi Modal
    <div className="detail-modal"> 
      <div className="detail-content">
        <button onClick={onClose} className="close-btn">X</button>
        <h2>{detail.name}</h2>
        {/* 'description_raw' untuk teks tanpa HTML */}
        <p>{detail.description_raw}</p> 
        <p><strong>Genres:</strong> {detail.genres.map(g => g.name).join(', ')}
            <div 
            key={game.id} 
            className="game-card" 
            onClick={() => setSelectedGame(game.id)} // <-- TAMBAHKAN INI
            >
            <img src={game.background_image} alt={game.name} />
            <h3>{game.name}</h3>
            <p>Rating: {game.rating} / 5</p>
            <p>Release Date: {game.released}</p>
            </div>
        </p>
        
        {/* Menampilkan screenshots (Fitur Wajib 4) */}
        <div className="screenshots">
          {/* Anda bisa fetch screenshots terpisah jika perlu */}
        </div>
      </div>
    </div>
  );
}

export default GameDetail;