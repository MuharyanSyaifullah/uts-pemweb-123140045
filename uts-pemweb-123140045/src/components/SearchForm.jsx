// src/components/SearchForm.jsx

// Langkah 1: Terima semua props yang dikirim dari App.jsx
function SearchForm({
  searchQuery,
  setSearchQuery,
  platforms,
  onPlatformChange,
  ordering,
  setOrdering,
  handleSubmit,
}) {
  return (
    // Langkah 2: Hubungkan fungsi handleSubmit ke event onSubmit form
    <form className="search-form" onSubmit={handleSubmit}>
      <h3>Cari Game</h3>

      {/* Fitur Wajib 1: Form pencarian game */}
      {/* Langkah 3: Hubungkan input text dengan state searchQuery */}
      <input
        type="text"
        placeholder="Cari game (misal: GTA V)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Fitur Wajib 2: Filter berdasarkan platform (checkbox) */}
      <div className="filters">
        {/* Langkah 4: Hubungkan checkbox dengan state platforms dan handler onPlatformChange */}
        <label>
          <input
            type="checkbox"
            value="4"
            checked={platforms.includes("4")} // Cek apakah "4" ada di array platforms
            onChange={(e) => onPlatformChange(e.target.value, e.target.checked)}
          />{" "}
          PC
        </label>
        <label>
          <input
            type="checkbox"
            value="18"
            checked={platforms.includes("18")} // Cek apakah "18" ada di array platforms
            onChange={(e) => onPlatformChange(e.target.value, e.target.checked)}
          />{" "}
          PlayStation
        </label>
        <label>
          <input
            type="checkbox"
            value="1"
            checked={platforms.includes("1")} // Cek apakah "1" ada di array platforms
            onChange={(e) => onPlatformChange(e.target.value, e.target.checked)}
          />{" "}
          Xbox
        </label>
      </div>

      {/* Fitur Wajib 5: Sort berdasarkan rating atau release date */}
      <div className="sorting">
        <label htmlFor="sort-by">Urutkan:</label>
        {/* Langkah 5: Hubungkan select dengan state ordering */}
        <select
          id="sort-by"
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
        >
          <option value="">Default</option>
          <option value="-rating">Rating (Tertinggi)</option>
          <option value="released">Tanggal Rilis (Terbaru)</option>
        </select>
      </div>

      {/* Tombol ini sekarang akan memicu onSubmit pada form */}
      <button type="submit">Cari</button>
    </form>
  );
}

export default SearchForm;