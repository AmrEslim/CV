import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Reuse public/manifest.json, which index.html already links.
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp,svg,ico}', 'apple-touch-icon.png', 'favicon-*.png'],
        navigateFallback: 'index.html',
      },
    }),
  ],
  server: { port: 3000, open: true, watch: { usePolling: true } },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: { react: ['react', 'react-dom', 'react-router-dom'] },
      },
    },
  },
});
