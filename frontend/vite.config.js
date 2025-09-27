// ========== frontend/vite.config.js (CONFIGURATION PRO) ==========
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  console.log('Vite Config:', { command, mode });
  
  const isDev = command === 'serve';
  const isProd = mode === 'production';

  return {
    plugins: [react()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    // Variables d'environnement
    define: {
      __DEV__: isDev,
      __PROD__: isProd,
    },

    // Configuration serveur de développement
    server: {
      port: 5173,
      host: true, // Permet les connexions externes
      proxy: isDev ? {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('Proxy error:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response:', proxyRes.statusCode, req.url);
            });
          },
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
      sourcemap: isProd ? false : true, // Source maps uniquement en dev
      minify: isProd ? 'esbuild' : false,
      
      // Optimisation des chunks
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks pour un meilleur cache
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['framer-motion', 'lucide-react'],
            utils: ['axios'],
          },
          // Noms de fichiers avec hash pour cache busting
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name.split('.').pop();
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return 'assets/images/[name]-[hash].[ext]';
            }
            if (/css/i.test(extType)) {
              return 'assets/css/[name]-[hash].[ext]';
            }
            return 'assets/[name]-[hash].[ext]';
          },
        },
      },

      // Configuration CSS
      cssCodeSplit: true,
      
      // Limite de taille pour inline des assets
      assetsInlineLimit: 4096,
      
      // Optimisations avancées
      target: 'es2015',
      
      // Report de la taille du bundle
      reportCompressedSize: true,
    },

    // Optimisation des dépendances
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'axios',
        'framer-motion',
        'lucide-react',
        'react-helmet-async'
      ],
    },

    // Configuration pour GitHub Pages / Vercel
    base: '',

    // Configuration pour les assets publics
    publicDir: 'public',

    // Configuration CSS
    css: {
      devSourcemap: isDev,
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },

    // Configuration pour les workers
    worker: {
      format: 'es',
    },

    // Configuration de log
    logLevel: isDev ? 'info' : 'warn',
    
    // Clear screen lors des rebuilds
    clearScreen: true,
  }
})