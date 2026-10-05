import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// El navegador no pinta nada hasta recibir las hojas de estilo del <head>, y mientras
// tanto muestra su lienzo por defecto (blanco), que se nota como un destello al
// entrar. Como todo el CSS del sitio es pequeño (~15 KB comprimido) y el HTML
// está vacío hasta que arranca React, se incrusta en el propio HTML al compilar:
// el primer pintado ya sale azul marino, sin esperar otra descarga.
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) return html
        return html.replace(/<link rel="stylesheet"[^>]*href="\/([^"]+\.css)"[^>]*>/g, (tag, file: string) => {
          const asset = bundle[file]
          return asset && asset.type === 'asset' ? `<style>${asset.source}</style>` : tag
        })
      },
    },
  }
}

// Las fuentes viven dentro del CSS, así que el navegador solo las descubre después de leerlo y
// empieza a bajarlas tarde; el preloader (y con él el hero) espera por ellas. Se precargan las
// dos que usa el hero (Plex Sans 400 y 600) desde el propio HTML. Los nombres llevan hash, por
// eso se buscan en el bundle al compilar.
function preloadCriticalFonts(): Plugin {
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) return html
        const links = Object.keys(bundle)
          .filter((file) => /ibm-plex-sans-latin-(400|600)-normal-[^/]+\.woff2$/.test(file))
          .map((file) => `<link rel="preload" href="/${file}" as="font" type="font/woff2" crossorigin />`)
        return links.length > 0 ? html.replace('<head>', `<head>\n    ${links.join('\n    ')}`) : html
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCss(), preloadCriticalFonts()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    // Por defecto Vite incrusta en el JS las imágenes de menos de 4 KB como base64. Los logos de aliados
    // de los proyectos caían ahí y engordaban el JS que baja la Home (26 KB) sin usarlos; como archivos
    // aparte solo se piden en la página del proyecto.
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Separa el código de las librerías que rara vez cambian en sus
        // propios chunks, así un futuro deploy que solo toque código de la
        // app no obliga a los visitantes que vuelven a descargar
        // React/motion/lenis de nuevo -- esos chunks se quedan en caché.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('motion')) return 'vendor-motion'
          if (id.includes('lenis')) return 'vendor-lenis'
          if (id.includes('react-router')) return 'vendor-router'
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('scheduler')) {
            return 'vendor-react'
          }
          return 'vendor'
        },
      },
    },
  },
})
