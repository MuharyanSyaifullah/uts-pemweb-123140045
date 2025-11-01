import React from "react";

export default function GameList({ games = [], onSelect, favorites = {}, toggleFavorite }) {
  if (!games.length) return <div>Tidak ada hasil.</div>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
      {games.map(g => (
        <div key={g.id} className="game-card" style={{ border: "1px solid #ddd", borderRadius: 8, padding: 8 }}>
          <div style={{ height: 120, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={g.background_image || ""} alt={g.name} style={{ width: "100%", objectFit: "cover" }} />
          </div>
          <h4>{g.name}</h4>
          <div>★ {g.rating} • {g.released}</div>
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button onClick={() => onSelect(g.id)}>Detail</button>
            <button onClick={() => toggleFavorite(g)}>{favorites[g.id] ? "Hapus Fav" : "Tambah Fav"}</button>
          </div>
        </div>
      ))}
    </div>
  );
}