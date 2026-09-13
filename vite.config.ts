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
        // vendors that change less often than the app cache on their own; three.js
        // is only ever reached through the lazily loaded scenes
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion')) return 'motion'
          if (/node_modules\/(three|@react-three|its-fine|zustand|suspend-react|react-use-measure)\//.test(id))
            return 'three'
        },
      },
    },
  },
})
