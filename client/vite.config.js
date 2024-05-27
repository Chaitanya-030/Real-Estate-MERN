import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api' : {
        target: 'http://localhost:3000', // this helps in not writing this whole thing again and again
        secure: false,
      },
    },
  },

  plugins: [react()],
})
