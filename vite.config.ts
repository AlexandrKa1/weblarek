import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    'import.meta.env.VITE_API_ORIGIN': JSON.stringify('https://larek-api.nomoreparties.co')
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          './src/scss'
        ],
      },
    },
  },
})