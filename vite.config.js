import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    // VitePWA({ registerType: 'autoUpdate' })
    
  ],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/Components",
      "@pages": "/src/pages",
    },
  },
  server: {
    host: true,
  },
  build: {
    outDir: "build"
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/x-date-pickers',
      '@emotion/react',
      '@emotion/styled'
    ]
  }
});
