// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    proxy: {
      '/api': {
        // vvvv INI DIA PERBAIKANNYA vvvv
        // Kita target langsung ke /api di server RAWG
        target: 'https://api.rawg.io/api', 
        // ^^^^ INI DIA PERBAIKANNYA ^^^^
        
        changeOrigin: true,
        // Rewrite-nya sekarang akan menghapus /api,
        // jadi /api/games -> /games
        // dan digabung dengan target di atas, jadi:
        // https://api.rawg.io/api + /games = https://api.rawg.io/api/games (BENAR!)
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})