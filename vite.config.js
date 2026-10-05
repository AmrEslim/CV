import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Production-only: dev needs inline scripts for HMR, which this policy would block.
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const cspPlugin = {
  name: 'csp-meta',
  apply: 'build',
  transformIndexHtml: () => [
    { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: csp }, injectTo: 'head-prepend' },
  ],
};

export default defineConfig({
  plugins: [
    react(),
    cspPlugin,
    VitePWA({
      registerType: 'autoUpdate',
      // Reuse public/manifest.json, which index.html already links.
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp,svg,ico,woff2}', 'apple-touch-icon.png', 'favicon-*.png'],
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
