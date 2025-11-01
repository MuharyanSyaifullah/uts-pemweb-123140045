// src/components/SearchForm.jsx

// Kita akan terima props dari App.jsx nanti
function SearchForm() {
  return (
    <form className="search-form">
      <h3>Cari Game</h3>
      
      {/* Fitur Wajib 1: Form pencarian game */}
      <input 
        type="text" 
        placeholder="Cari game (misal: GTA V)..." 
      />

      {/* Fitur Wajib 2: Filter berdasarkan platform (checkbox) */}
      <div className="filters">
        <label>
          <input type="checkbox" value="4" /> PC
        </label>
        <label>
          <input type="checkbox" value="18" /> PlayStation
        </label>
        <label>
          <input type="checkbox" value="1" /> Xbox
        </label>
      </div>

      {/* Fitur Wajib 5: Sort berdasarkan rating atau release date */}
      <div className="sorting">
        <label htmlFor="sort-by">Urutkan:</label>
        <select id="sort-by">
          <option value="">Default</option>
          <option value="-rating">Rating (Tertinggi)</option>
          <option value="released">Tanggal Rilis (Terbaru)</option>
        </select>
      </div>
      
      <button type="submit">Cari</button>
    </form>
  );
}

export default SearchForm;