# SEO del sitio: cómo está hecho y cómo mantenerlo

Dirección oficial: **https://www.cbsperu.com** (constante `SITE_URL` en `src/lib/site.ts`; también en `public/robots.txt`,
que no puede importarla: `scripts/prerender.mjs` avisa si no coinciden).

## Cómo funciona

El sitio es una app de React (SPA). Para que los buscadores y las vistas previas (WhatsApp, LinkedIn) lean cada página sin
ejecutar JavaScript, `npm run build` hace tres cosas:

1. `vite build` → el cliente (`dist/`).
2. `vite build --ssr src/entry-server.tsx` → una versión de servidor (`dist-ssr/`, no se publica).
3. `node scripts/prerender.mjs` → escribe un HTML por página con su `<head>` completo (título, descripción, canónica, Open
   Graph, JSON-LD) y el contenido en versión **semántica** (`scripts/semantic-html.mjs`: mismos textos, títulos y enlaces, sin
   clases ni imágenes), la página `404.html` y el `sitemap.xml`.

Al arrancar, la app descarta ese contenido y se dibuja de cero (`src/main.tsx`), así que no cambia la experiencia ni pesa
en la carga. Si el JavaScript no llega a cargar, a los 8 s el contenido se muestra igual (`src/index.css`).

## Dónde cambiar cosas

| Qué | Dónde |
|---|---|
| Títulos, descripciones, imagen para compartir y datos estructurados de cada página | `src/lib/seo.ts` |
| Nombre, año de fundación, logo, dominio | `src/lib/site.ts` |
| Un proyecto nuevo | `src/lib/projects.ts` (entra solo al sitemap y se prerrenderiza). Falta su imagen `public/og/proyecto-<slug>.jpg` (1200x630) |
| Una página nueva | Ruta en `src/App.tsx` **y** en `src/entry-server.tsx`, datos en `getSeo()` y su ruta en `indexablePaths` (`src/lib/seo.ts`) |
| Imágenes para compartir | `public/og/*.jpg`, 1200x630 |
| Íconos (pestaña del navegador, iPhone, Android) | `public/favicon.ico`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` y `site.webmanifest`. Letras CBS del logo con sus colores originales sobre fondo blanco; si cambia el logo, hay que regenerarlos |

## Reglas que conviene no romper

- Cada página: un solo `<h1>`, y los títulos y descripciones **únicos** (máx. ~60 y ~155 caracteres).
- Las direcciones que no existen devuelven **404 real** (`404.html`), con `noindex`. No volver a un "todo va a index.html".
- No agregar a los datos estructurados información sin confirmar (por ejemplo las certificaciones ISO: ver `certifications.ts`).
- El prerenderizado no debe pedir imágenes al arrancar (por eso el HTML semántico las deja solo como texto alternativo).
