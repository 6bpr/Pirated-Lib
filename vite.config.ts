import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Pirated-Lib/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
