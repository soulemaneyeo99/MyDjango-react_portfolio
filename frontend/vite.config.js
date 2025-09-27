// ========== frontend/vite.config.js ==========
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ⚡ Serveur de dev (local)
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/media': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },

  // ⚡ Build pour production (Vercel)
  build: {
    outDir: 'dist',
    sourcemap: true,
  },

  // ⚡ Base URL → important pour Vercel !
  // Si tu mets '', tes assets seront servis depuis /images/... correctement
  base: '',
})
