// src/components/SearchForm.jsx

// Terima SEMUA props yang dikirim dari App.jsx
function SearchForm({ 
  searchQuery, 
  setSearchQuery,
  platforms, // Prop baru agar checkbox bisa 'checked'
  onPlatformChange, 
  ordering, 
  setOrdering, 
  handleSubmit 
}) {

  // Handler internal untuk checkbox
  const handlePlatformCheck = (e) => {
    const { value, checked } = e.target;
    onPlatformChange(value, checked); // Panggil fungsi dari App.jsx
  };

  return (
    // 1. Hubungkan event handler 'onSubmit' ke form
    <form className="search-form" onSubmit={handleSubmit}>
      <h3>Cari Game</h3>
      
      {/* 2. Hubungkan 'value' dan 'onChange' untuk input pencarian (Fitur Wajib 1) */}
      <input 
        type="text" 
        placeholder="Cari game (misal: GTA V)..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* 3. Hubungkan 'checked' dan 'onChange' untuk filter (Fitur Wajib 2) */}
      <div className="filters">
        <label>
          <input 
            type="checkbox" 
            value="4" // ID untuk PC
            checked={platforms.includes('4')} // Cek apakah ID ada di array
            onChange={handlePlatformCheck} 
          /> PC
        </label>
        <label>
          <input 
            type="checkbox" 
            value="18" // ID untuk PlayStation
            checked={platforms.includes('18')}
            onChange={handlePlatformCheck}
          /> PlayStation
        </label>
        <label>
          <input 
            type="checkbox" 
            value="1" // ID untuk Xbox
            checked={platforms.includes('1')}
            onChange={handlePlatformCheck}
          /> Xbox
        </label>
      </div>

      {/* 4. Hubungkan 'value' dan 'onChange' untuk sorting (Fitur Wajib 5) */}
      <div className="sorting">
        <label htmlFor="sort-by">Urutkan:</label>
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
      
      <button type="submit">Cari</button>
    </form>
  );
}

export default SearchForm;
