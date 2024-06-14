import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: "/", //note!!!! this was a solution to a blank page when releasing to a custom domain
})
