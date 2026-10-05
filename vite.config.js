import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  // Source files contain JSX but use the .js extension.
  esbuild: { loader: 'jsx', include: /src\/.*\.jsx?$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
  // Preserves CRA's empty PUBLIC_URL used by existing asset paths and the router basename.
  define: { 'process.env.PUBLIC_URL': JSON.stringify('') },
  server: { port: 3000, open: true, watch: { usePolling: true } },
  build: { outDir: 'build' },
});
