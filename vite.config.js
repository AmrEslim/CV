import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

const SITE = 'https://amreslim.de';

// GitHub Pages serves 404.html for unknown paths, so deep links like /posts/x load the SPA.
// Also lists posts in the sitemap, which is otherwise static.
const spaPagesPlugin = {
  name: 'spa-pages',
  apply: 'build',
  closeBundle() {
    const out = 'build';
    if (!existsSync(`${out}/index.html`)) return;
    copyFileSync(`${out}/index.html`, `${out}/404.html`);

    const dir = 'src/content/posts';
    if (!existsSync(dir) || !existsSync(`${out}/sitemap.xml`)) return;
    const posts = new Map();
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const raw = readFileSync(`${dir}/${file}`, 'utf8');
      if (/^draft:\s*true\s*$/m.test(raw)) continue;
      const slug = file.replace(/(\.(en|de))?\.md$/, '');
      const date = raw.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
      if (!posts.has(slug) || file.endsWith('.en.md')) posts.set(slug, date);
    }
    const urls = [...posts].map(([slug, date]) =>
      `  <url>\n    <loc>${SITE}/posts/${slug}</loc>\n${date ? `    <lastmod>${date}</lastmod>\n` : ''}    <priority>0.6</priority>\n  </url>\n`
    ).join('');
    const sitemap = readFileSync(`${out}/sitemap.xml`, 'utf8').replace('</urlset>', `${urls}</urlset>`);
    writeFileSync(`${out}/sitemap.xml`, sitemap);
  },
};

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
    spaPagesPlugin,
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
