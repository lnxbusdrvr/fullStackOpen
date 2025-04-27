import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// server-stuff: to get rid off:
// broswer-message: Blocked request. This host ("app") is not allowed.
// To allow this host, add "app" to `server.allowedHosts` in vite.config.js.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    allowedHosts: ['app'],
    host: true
  }
})
