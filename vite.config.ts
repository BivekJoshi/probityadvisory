import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname },
  },
  build: {
    rollupOptions: {
      output: {
        // framer-motion changes less often than the app, so it caches on its own.
        // three.js is deliberately left out: a manual chunk would also absorb React
        // and get preloaded on first paint, where the lazy scenes keep it off.
        manualChunks(id) {
          if (id.includes('node_modules') && id.includes('framer-motion')) return 'motion'
        },
      },
    },
  },
})
