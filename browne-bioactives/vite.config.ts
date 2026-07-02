import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dev only: proxy the backend + chat agent so `npm run dev` works same-origin.
  server: {
    proxy: {
      '/api': 'http://localhost:5030',
      '/ws/chat': { target: 'http://localhost:5031', ws: true },
    },
  },
})
