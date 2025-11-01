// src/components/GameDetail.jsx
import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

function GameDetail({ gameId, onClose }) {
  const [detail, setDetail] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) return;

    const fetchGameDetails = async () => {
      setLoading(true);
      setError(null);
      
      // vvvv INI BAGIAN YANG DIUBAH vvvv
      const detailUrl = `/api/games/${gameId}?key=${API_KEY}`;
      const screenshotsUrl = `/api/games/${gameId}/screenshots?key=${API_KEY}`;
      // ^^^^ INI BAGIAN YANG DIUBAH ^^^^

      try {
        // Ambil detail
        const response = await fetch(detailUrl);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('API Key tidak valid.');
          }
          throw new Error(`Gagal mengambil detail (HTTP ${response.status})`);
        }
        const data = await response.json();
        setDetail(data);

        // Ambil screenshots
        const ssResponse = await fetch(screenshotsUrl);
        if (ssResponse.ok) {
          const ssData = await ssResponse.json();
          setScreenshots(ssData.results);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="detail-overlay" onClick={handleOverlayClick}>
      <div className="detail-modal" onClick={handleModalClick}>
        
        <button className="close-btn" onClick={onClose}>&times;</button>

        {loading && <p className="loading-text">Loading details...</p>}
        {error && <p className="error-text">Error: {error}</p>}

        {!loading && !error && detail && (
          <>
            <img 
              src={detail.background_image || 'https://placehold.co/600x400?text=No+Image'} 
              alt={detail.name} 
              className="detail-header-image" 
            />
            
            <h2>{detail.name}</h2>
            
            <p>
              <strong>Rating:</strong> {detail.rating} / 5 
              <br/>
              <strong>Genres:</strong> {detail.genres.map(g => g.name).join(', ')}
              <br/>
              <strong>Platforms:</strong> {detail.platforms.map(p => p.platform.name).join(', ')}
            </p>

            <h4>Description</h4>
            <div 
              className="detail-description"
              dangerouslySetInnerHTML={{ __html: detail.description }} 
            />

            <h4>Screenshots</h4>
            <div className="screenshots-grid">
              {screenshots.length > 0 ? (
                screenshots.map(ss => (
                  <img key={ss.id} src={ss.image} alt="Game screenshot" />
                ))
              ) : (
                <p>No screenshots available.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GameDetail;