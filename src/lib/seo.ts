import { CONTACT_EMAIL } from '@/lib/contact'
import { limpCityCities } from '@/lib/limp-city'
import { getProjectBySlug, projects, type Project } from '@/lib/projects'
import {
  FOUNDING_YEAR,
  OG_IMAGE_SIZE,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_LOGO,
  SITE_NAME,
  SITE_SLOGAN,
  SITE_URL,
} from '@/lib/site'

type JsonLd = Record<string, unknown>

export interface SeoData {
  title: string
  description: string
  /** Ruta de la página ("/", "/limp-city"...). La URL canónica se arma con SITE_URL. */
  path: string
  /** Ruta de la imagen para compartir (1200x630) dentro de public/. */
  image: string
  imageAlt: string
  ogType: 'website' | 'article'
  /** Páginas que no deben aparecer en Google (404). */
  noindex: boolean
  jsonLd: JsonLd[]
}

const absolute = (path: string) => `${SITE_URL}${path}`
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

// Datos estructurados de la empresa: salen en todas las páginas. No se incluyen las certificaciones ISO ni otros datos
// que la empresa aún no haya confirmado (ver certifications.ts).
const organization: JsonLd = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  alternateName: ['Construtora Baiana de Saneamento', 'CBS'],
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}${SITE_LOGO.path}`, width: SITE_LOGO.width, height: SITE_LOGO.height },
  email: CONTACT_EMAIL,
  slogan: SITE_SLOGAN,
  foundingDate: String(FOUNDING_YEAR),
  description:
    'Empresa de ingeniería y construcción especializada en obras de agua potable, alcantarillado sanitario, drenaje pluvial urbano, represas y defensa ribereña, con proyectos en Perú y Brasil.',
  areaServed: [
    { '@type': 'Country', name: 'Perú' },
    { '@type': 'Country', name: 'Brasil' },
  ],
  knowsAbout: [
    'Agua potable',
    'Alcantarillado sanitario',
    'Drenaje pluvial urbano',
    'Represas',
    'Defensa ribereña',
    'Infraestructura urbana',
  ],
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', email: CONTACT_EMAIL, availableLanguage: ['es'] }],
}

const website: JsonLd = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: SITE_LANGUAGE,
  publisher: { '@id': ORGANIZATION_ID },
}

const breadcrumbs = (items: { name: string; path: string }[]): JsonLd => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: absolute(item.path) })),
})

const webPage = (path: string, name: string, description: string, image: string): JsonLd => ({
  '@type': 'WebPage',
  '@id': `${absolute(path)}#webpage`,
  url: absolute(path),
  name,
  description,
  inLanguage: SITE_LANGUAGE,
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORGANIZATION_ID },
  primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}${image}` },
})

const HOME: SeoData = {
  title: 'CBS Perú · Obras de agua y saneamiento | Construtora Baiana',
  description:
    'Obras de agua potable, alcantarillado, drenaje pluvial y represas en Perú y Brasil. CBS Perú, Construtora Baiana de Saneamento: más de 80 proyectos desde 2009.',
  path: '/',
  image: '/og/inicio.jpg',
  imageAlt: 'Planta de tratamiento de agua construida por CBS Perú',
  ogType: 'website',
  noindex: false,
  jsonLd: [],
}
HOME.jsonLd = [organization, website, webPage(HOME.path, HOME.title, HOME.description, HOME.image)]

const LIMP_CITY_DESCRIPTION =
  'Limp City presta servicios de limpieza urbana y manejo de residuos sólidos en siete ciudades del nordeste de Brasil: recolección, barrido mecanizado, limpieza de playas y canales.'

const LIMP_CITY: SeoData = {
  title: 'Limp City · Limpieza urbana y residuos sólidos en Brasil | CBS Perú',
  description: LIMP_CITY_DESCRIPTION,
  path: '/limp-city',
  image: '/og/limp-city.jpg',
  imageAlt: 'Operarios de Limp City en limpieza urbana',
  ogType: 'website',
  noindex: false,
  jsonLd: [
    organization,
    website,
    {
      '@type': 'Organization',
      '@id': `${absolute('/limp-city')}#organization`,
      name: 'Limp City',
      url: absolute('/limp-city'),
      foundingDate: '2012',
      description: LIMP_CITY_DESCRIPTION,
      areaServed: limpCityCities.map((name) => ({ '@type': 'City', name })),
    },
    webPage('/limp-city', 'Limp City', LIMP_CITY_DESCRIPTION, '/og/limp-city.jpg'),
    breadcrumbs([
      { name: 'Inicio', path: '/' },
      { name: 'Limp City', path: '/limp-city' },
    ]),
  ],
}

const NOT_FOUND: SeoData = {
  title: 'Página no encontrada | CBS Perú',
  description: 'La página que buscas no existe o cambió de dirección. Vuelve al inicio de CBS Perú.',
  path: '/404',
  image: HOME.image,
  imageAlt: HOME.imageAlt,
  ogType: 'website',
  noindex: true,
  jsonLd: [],
}

function projectSeo(project: Project): SeoData {
  const path = `/proyectos/${project.slug}`
  const description = `${project.category} en ${project.location}. Cliente: ${project.client.name}. Contratista: ${project.contractor.name}. Monto contratado ${project.amount}, financiado por ${project.funding.name}.`
  const title = `${project.title} | CBS Perú`
  const image = `/og/proyecto-${project.slug}.jpg`
  return {
    title,
    description,
    path,
    image,
    imageAlt: project.title,
    ogType: 'article',
    noindex: false,
    jsonLd: [
      organization,
      website,
      webPage(path, project.title, description, image),
      breadcrumbs([
        { name: 'Inicio', path: '/' },
        { name: project.title, path },
      ]),
    ],
  }
}

/** Páginas que se prerrenderizan y entran al sitemap. */
export const indexablePaths = ['/', '/limp-city', ...projects.map((project) => `/proyectos/${project.slug}`)]

/** Los datos de SEO de una ruta; cualquier ruta que no exista es una 404 (con noindex). */
export function getSeo(pathname: string): SeoData {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  if (path === '/') return HOME
  if (path === '/limp-city') return LIMP_CITY
  const match = path.match(/^\/proyectos\/([^/]+)$/)
  const project = match ? getProjectBySlug(match[1]) : undefined
  return project ? projectSeo(project) : NOT_FOUND
}

// ---- Etiquetas del <head> ----

const escapeAttr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// Dentro de un <script> hay que evitar que un "<" cierre la etiqueta.
const jsonScript = (data: JsonLd[]) => JSON.stringify({ '@context': 'https://schema.org', '@graph': data }).replace(/</g, '\\u003c')

/** Pares [atributo, valor] de las etiquetas <meta>, y sus valores. La usan el HTML prerrenderizado y el cliente. */
function metaTags(seo: SeoData): { attr: 'name' | 'property'; key: string; content: string }[] {
  const image = `${SITE_URL}${seo.image}`
  return [
    { attr: 'name', key: 'description', content: seo.description },
    {
      attr: 'name',
      key: 'robots',
      content: seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1',
    },
    { attr: 'property', key: 'og:type', content: seo.ogType },
    { attr: 'property', key: 'og:site_name', content: SITE_NAME },
    { attr: 'property', key: 'og:locale', content: SITE_LOCALE },
    { attr: 'property', key: 'og:title', content: seo.title },
    { attr: 'property', key: 'og:description', content: seo.description },
    { attr: 'property', key: 'og:url', content: absolute(seo.path) },
    { attr: 'property', key: 'og:image', content: image },
    { attr: 'property', key: 'og:image:width', content: String(OG_IMAGE_SIZE.width) },
    { attr: 'property', key: 'og:image:height', content: String(OG_IMAGE_SIZE.height) },
    { attr: 'property', key: 'og:image:alt', content: seo.imageAlt },
    { attr: 'name', key: 'twitter:card', content: 'summary_large_image' },
    { attr: 'name', key: 'twitter:title', content: seo.title },
    { attr: 'name', key: 'twitter:description', content: seo.description },
    { attr: 'name', key: 'twitter:image', content: image },
    { attr: 'name', key: 'twitter:image:alt', content: seo.imageAlt },
  ]
}

/** El bloque de etiquetas del <head> como texto, para el HTML prerrenderizado. */
export function seoToHead(seo: SeoData): string {
  const lines = [
    `<title>${escapeAttr(seo.title)}</title>`,
    ...metaTags(seo).map((tag) => `<meta ${tag.attr}="${tag.key}" content="${escapeAttr(tag.content)}" />`),
  ]
  // Una página con noindex (404) no tiene dirección canónica.
  if (!seo.noindex) lines.push(`<link rel="canonical" href="${absolute(seo.path)}" />`)
  if (seo.jsonLd.length > 0) lines.push(`<script type="application/ld+json">${jsonScript(seo.jsonLd)}</script>`)
  return lines.join('\n    ')
}

/** En el navegador, al cambiar de página dentro de la app: actualiza las etiquetas que ya están en el <head>. */
export function applySeo(seo: SeoData) {
  document.title = seo.title
  document.documentElement.lang = SITE_LANGUAGE

  for (const tag of metaTags(seo)) {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${tag.attr}="${tag.key}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(tag.attr, tag.key)
      document.head.appendChild(el)
    }
    el.setAttribute('content', tag.content)
  }

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (seo.noindex) {
    canonical?.remove()
  } else {
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = absolute(seo.path)
  }

  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove())
  if (seo.jsonLd.length > 0) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = jsonScript(seo.jsonLd)
    document.head.appendChild(script)
  }
}

/** Entradas del sitemap. */
export const sitemapPaths = indexablePaths.map((path) => ({ url: absolute(path), path }))
