import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 agrega base con el nombre EXACTO de tu repo de GitHub
export default defineConfig({
  plugins: [react()],
  base: '/Informe-MMPP-Enaex/'   // 👈 cambia por el nombre de tu repo
})