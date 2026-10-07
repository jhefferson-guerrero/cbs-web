// Prerenderizado: después de compilar el cliente (dist/) y el servidor (dist-ssr/), escribe un HTML completo por página
// (con su título, descripción, canónica, Open Graph, datos estructurados y el contenido ya dibujado), la página 404 y el
// sitemap. Se ejecuta desde "npm run build". Ver src/entry-server.tsx y src/lib/seo.ts.
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { toSemanticHtml } from './semantic-html.mjs'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')

const server = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

for (const marker of ['<!--seo-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) throw new Error(`dist/index.html no tiene el marcador ${marker}: revisa index.html`)
}

// Se usan funciones en replace() para que un "$" dentro del HTML no se interprete como patrón.
const pageHtml = (routePath) => {
  const head = server.seoToHead(server.getSeo(routePath))
  const body = toSemanticHtml(server.render(routePath))
  return template.replace('<!--seo-head-->', () => head).replace('<!--app-html-->', () => body)
}

const write = (file, content) => {
  const target = path.join(dist, file)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, content)
  return target
}

const written = []
for (const routePath of server.indexablePaths) {
  // Archivos planos (limp-city.html, proyectos/x.html): Vercel (cleanUrls) y Apache (.htaccess) los sirven sin la extensión.
  const file = routePath === '/' ? 'index.html' : `${routePath.slice(1)}.html`
  write(file, pageHtml(routePath))
  written.push(file)
}
// Dirección inexistente: el servidor entrega este archivo con código 404 (vercel.json y deploy/hostinger.htaccess).
write('404.html', pageHtml('/404'))
written.push('404.html')

// sitemap.xml: solo las páginas indexables. lastmod = fecha del último commit (o la de hoy si no hay git).
let lastmod = new Date().toISOString().slice(0, 10)
try {
  lastmod = execSync('git log -1 --format=%cs', { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || lastmod
} catch {
  // sin git (por ejemplo, una descarga del código): se queda la fecha de hoy
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${server.sitemapPaths.map((entry) => `  <url>\n    <loc>${entry.url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`
write('sitemap.xml', sitemap)

// public/robots.txt no puede importar el dominio: se comprueba que apunte al sitemap correcto.
const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8')
if (!robots.includes(`Sitemap: ${server.SITE_URL}/sitemap.xml`)) {
  throw new Error(`public/robots.txt debe incluir "Sitemap: ${server.SITE_URL}/sitemap.xml"`)
}

console.log(`Prerenderizado: ${written.length} páginas (${written.join(', ')}) + sitemap.xml (${server.sitemapPaths.length} URLs, lastmod ${lastmod})`)
