// ========== frontend/vite.config.js (VERSION CORRIGÉE) ==========
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';
  const isProd = mode === 'production';

  return {
    plugins: [react()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    // Configuration serveur de développement
    server: {
      port: 5173,
      host: true,
      proxy: isDev ? {
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
      } : {},
    },

    // Configuration build
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: isProd ? 'esbuild' : false,
      
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
          },
        },
      },
    },

    // Base URL pour les assets
    base: '',

    // Configuration CSS (SANS require dynamique)
    css: {
      devSourcemap: isDev,
    },
  }
})