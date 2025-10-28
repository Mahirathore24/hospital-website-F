import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ESM config file (.mjs) ensures ESM-only plugins can be imported correctly.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
