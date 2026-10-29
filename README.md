# CBS Perú — sitio web corporativo

Sitio de **CBS — Construtora Baiana de Saneamento**, pensado para publicarse en https://www.cbsperu.com (por ahora está
publicado solo en Vercel, en su dirección `*.vercel.app`): empresa de obras de agua potable, alcantarillado,
drenaje pluvial y represas en Perú y Brasil. Incluye la página de su empresa hermana **Limp City** (limpieza urbana, Brasil) y
una página por cada proyecto destacado.

## Tecnología

| Qué | Con qué |
|---|---|
| Interfaz | React 19 + TypeScript 6 |
| Compilación | Vite 8 (con prerenderizado propio, ver más abajo) |
| Estilos | Tailwind CSS 4 (paleta de marca en `src/index.css`) |
| Animaciones | `motion` (Framer Motion) y scroll suave con `lenis` |
| Rutas | `react-router-dom` 7 |
| Iconos y fuentes | `@phosphor-icons/react`, IBM Plex Sans / Mono (`@fontsource`) |
| Lint | `oxlint` |
| Formulario de contacto | Web3Forms (sin servidor propio) |

Requiere Node 20.19+ o 22.12+ (requisito de Vite 8).

## Empezar

```bash
npm install
cp .env.example .env.local   # opcional: solo para probar el formulario (ver "Variables de entorno")
npm run dev                  # servidor de desarrollo
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente. |
| `npm run build` | Compilación completa para producción: tipos + cliente + servidor + prerenderizado. Deja el sitio en `dist/`. |
| `npm run build:client` | Solo tipos y cliente (sin prerenderizar). |
| `npm run build:hostinger` | `build` + copia el `.htaccess` a `dist/` para Hostinger. |
| `npm run preview` | Sirve `dist/` localmente. |
| `npm run lint` | `oxlint` sobre el proyecto. |

## Variables de entorno

| Variable | Para qué |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Access key de Web3Forms del formulario de contacto. |

Se **incrusta en el JavaScript al compilar** (no se lee en el servidor) y es pública por diseño del servicio.

- **Producción (Vercel):** la clave ya está configurada directamente en el panel del proyecto (*Settings → Environment Variables*),
  por eso no existe en el repositorio ni hace falta un `.env.local` para publicar: Vercel compila con ella.
- **Local:** un `npm run build` o `npm run dev` sin `.env.local` genera un sitio **sin clave**, y allí el formulario no envía. Solo
  hace falta crearlo (copia de `.env.example`, ignorado por git) para probar el formulario en la máquina propia, o al publicar
  en Hostinger, que se compila localmente.

Si la clave falta, el formulario muestra el error genérico de envío sin más aviso.

## Estructura

```
src/
  main.tsx            Arranque: descarta el HTML prerrenderizado y monta la app
  App.tsx             Router, preloader, scroll suave, navbar, footer
  entry-server.tsx    Punto de entrada del prerenderizado (solo se usa al compilar)
  index.css           Tema (colores, sombras), transición entre páginas, utilidades
  pages/              Home, LimpCity, ProjectDetail, NotFound
  components/
    layout/           Navbar, Footer, Preloader, SmoothScroll, BackToTop, RouteSeo
    sections/         Secciones de la Home: Hero, Nosotros, Certificaciones, Actuacion,
                      Experiencia, Proyectos, Clientes, Contacto
    limpcity/         Secciones de /limp-city
    project/          Secciones de /proyectos/:slug (hero, ficha, aliados, galería)
    ui/               Button, Counter, Lightbox, PageLink, Parallax
  lib/                Datos y utilidades (ver abajo)
  assets/images/      Imágenes que procesa Vite (con hash en el nombre)
public/               Archivos que se sirven tal cual: heros, íconos, og/, robots.txt, manifest
scripts/              prerender.mjs, semantic-html.mjs, hostinger.mjs
deploy/               .htaccess y guía de publicación en Hostinger
docs/SEO.md           Cómo está hecho el SEO y dónde cambiarlo
vercel.json           Redirecciones, cabeceras de seguridad y caché en Vercel
```

### Datos del sitio en `src/lib/`

Los textos y datos viven aquí, separados del diseño: para cambiar un texto o agregar un proyecto casi siempre se edita un archivo
de esta carpeta y no los componentes.

- **Contenido:** `projects.ts` (proyectos y aliados), `clients.ts`, `certifications.ts`, `limp-city.ts`, `partners.ts`, `nav-links.ts`.
- **Empresa y SEO:** `site.ts` (dominio, nombre, logo), `contact.ts` (correo), `seo.ts` (título y descripción de cada página).
- **Internos de carga:** el resto (`routes`, `prefetch-*`, `hero-image`, etc.); normalmente no hace falta tocarlos.

## Cómo funciona

- **Prerenderizado:** `npm run build` genera un HTML completo por página (con su SEO) para que buscadores y vistas previas
  (WhatsApp, LinkedIn) lean el contenido sin ejecutar JavaScript. Al abrir el sitio, la app lo reemplaza y se dibuja normalmente.
  Detalle y reglas en [docs/SEO.md](docs/SEO.md).
- **Carga rápida:** el código se divide por página, el CSS va dentro del HTML y las imágenes de los heros tienen versiones por
  tamaño de pantalla. `public/hero-preload.js` no puede importar módulos: sus `srcset` se mantienen a mano iguales a los de
  `hero-image.ts` y `limp-city-hero.ts`.
- **Animaciones:** se respeta la opción de "reducir movimiento" del sistema.

## Tareas comunes

**Agregar un proyecto**
1. Poner sus imágenes en `src/assets/images/proyectos/<slug>/` (portadas `cover-640/960/…`, `galeria-0N`, `thumb-0N`).
2. Agregar el objeto en `projects` de `src/lib/projects.ts`.
3. Opcional: título corto para Google en `PROJECT_SEO_TITLES` (`src/lib/seo.ts`).
4. Crear la imagen para compartir `public/og/proyecto-<slug>.jpg` (1200×630).

La ruta, el sitemap y el prerenderizado salen solos de la lista de proyectos.

**Agregar una página nueva:** ruta en `src/App.tsx` **y** en `src/entry-server.tsx`, datos en `getSeo()` y su ruta en
`indexablePaths` (`src/lib/seo.ts`).

**Cambiar dominio, nombre o correo:** `src/lib/site.ts` y `src/lib/contact.ts`. El dominio también está en `public/robots.txt`
(el build avisa si no coinciden).

**Cambiar el menú:** `src/lib/nav-links.ts`.

## Publicación

El resultado de `npm run build` es estático (`dist/`).

- **Vercel:** cada push a `main` despliega solo. `vercel.json` ya trae URLs limpias, 404 real, redirección de `cbsperu.com` a
  `www.cbsperu.com`, cabeceras de seguridad (incluida CSP) y `noindex` en las direcciones `*.vercel.app`, así que mientras el
  sitio viva solo ahí, Google no lo indexa. Al pasar a `www.cbsperu.com` (agregar el dominio en *Domains* y apuntar el DNS, ver
  [deploy/README.md](deploy/README.md)) empieza a indexarse solo.
- **Hostinger (Apache/LiteSpeed):** `npm run build:hostinger` y subir todo el contenido de `dist/` (incluido el `.htaccess`) a
  `public_html`. Pasos, DNS y comprobaciones en [deploy/README.md](deploy/README.md). El `.htaccess` aún está sin probar en
  Hostinger.

Si se agrega un servicio externo (analítica, mapas, etc.), hay que permitirlo en la `Content-Security-Policy` de **ambos**
archivos: `vercel.json` y `deploy/hostinger.htaccess`.

## Convenciones

- Textos y comentarios del código en español.
- Colores solo de la paleta de `src/index.css` (`navy`, `cyan`, y `moss` exclusivo de Limp City; `brand-red` solo para el logo).
- Un único `<h1>` por página, y títulos/descripciones únicos (máx. ~60 y ~155 caracteres).
- No agregar a los datos estructurados información sin confirmar (por ejemplo, las certificaciones).
