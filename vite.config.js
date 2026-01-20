import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 5173,
    strictPort: false,
    open: true
  },
  preview: {
    port: 4173,
    strictPort: false,
    open: true
  }
})
