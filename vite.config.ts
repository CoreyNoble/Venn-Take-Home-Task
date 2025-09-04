import { defineConfig } from 'vite'
import { prettierFormat } from 'vite-plugin-prettier-format'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prettierFormat()],
})