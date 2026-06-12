import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  base: '/UAS_UI_Ophelia/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Menuju ke Landing Page Statis
        shop: resolve(__dirname, 'shop.html'),  // Menuju ke Aplikasi React Dinamis
      },
    },
  },
})