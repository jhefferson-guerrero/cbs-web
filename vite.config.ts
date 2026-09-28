import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing vendor code into its own chunks so a future
        // deploy that only touches app code doesn't force returning visitors
        // to re-download React/motion/lenis too -- those chunks stay cached.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('motion')) return 'vendor-motion'
          if (id.includes('lenis')) return 'vendor-lenis'
          if (id.includes('react-router')) return 'vendor-router'
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('scheduler')) {
            return 'vendor-react'
          }
          return 'vendor'
        },
      },
    },
  },
})
