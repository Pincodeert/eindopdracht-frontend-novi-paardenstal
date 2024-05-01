import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import vitePluginSvgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitePluginSvgr(), svgr({
    exportAsDefault: true
  }), react()],
  assetsInclude: "**/*.JPG",
})
