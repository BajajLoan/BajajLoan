import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://82.29.164.99:3000",
        changeOrigin: true,
        secure: false
      }
    },
    allowedHosts: ["bajajloan.onrender.com"]
  }
})
// export default {
  
// }
