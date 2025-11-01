const BASE = "https://api.rawg.io/api";

function getKey() {
  return import.meta.env.VITE_RAWG_KEY || "";
}

/**
 * Search games
 */
export async function searchGames({ q = "", platforms = [], page = 1, page_size = 20, ordering = "", dates = "", metacritic_gte = 0 }) {
  const key = getKey();
  const params = new URLSearchParams();
  if (q) params.append("search", q);
  if (platforms.length) params.append("platforms", platforms.join(","));
  if (ordering) params.append("ordering", ordering);
  if (dates) params.append("dates", dates);
  if (metacritic_gte) params.append("metacritic", `${metacritic_gte},`);
  params.append("page", page);
  params.append("page_size", page_size);
  if (key) params.append("key", key);

  const url = `${BASE}/games?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
  const data = await res.json();
  return data; // contains results array, count, next, previous
}

export async function getGameDetail(id) {
  const key = getKey();
  const params = new URLSearchParams();
  if (key) params.append("key", key);
  const url = `${BASE}/games/${id}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
  return await res.json();
}
