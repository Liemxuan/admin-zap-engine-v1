import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'https://zap-gateway-b9ei3tej.uc.gateway.dev',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    cssMinify: 'lightningcss',
    chunkSizeWarningLimit: 1000,
  },
});