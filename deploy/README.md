# Publicar el sitio

El sitio se compila con `npm run build` y el resultado queda en `dist/`: son archivos estáticos (HTML por página, JS, CSS,
imágenes, `sitemap.xml`, `robots.txt`). Se puede publicar en **Vercel** o en **Hostinger** (u otro hosting de archivos).

## La clave del formulario de contacto (Web3Forms)

`VITE_WEB3FORMS_ACCESS_KEY` se **incrusta en el JavaScript al compilar**; no es una variable que se lea en el servidor.

- **Vercel:** se configura en el panel del proyecto (Settings → Environment Variables), porque Vercel compila el sitio.
- **Hostinger:** NO se configura en hPanel. Se compila antes de subir (`npm run build:hostinger`), y la clave debe estar
  en un archivo `.env.local` en la raíz del proyecto (copia de `.env.example`), o como secreto de GitHub si se automatiza.
- En el panel de Web3Forms conviene **restringir la clave al dominio** `www.cbsperu.com` y comprobar que los mensajes
  lleguen a `contacto@cbsperu.com` (y no a un correo personal).

## Vercel

1. Importar el repositorio (o transferir el proyecto al equipo de la empresa).
2. Agregar la variable de la clave (arriba) y, en Domains, `www.cbsperu.com` y `cbsperu.com`.
3. `vercel.json` ya trae lo necesario: URLs limpias, 404 real, redirección de `cbsperu.com` a `www.cbsperu.com`,
   cabeceras de seguridad y `noindex` en las direcciones `*.vercel.app` (para que Google no las indexe duplicadas).

## Hostinger (Apache / LiteSpeed)

1. En tu equipo: `npm run build:hostinger`. Genera `dist/` con el sitio **y** el `.htaccess` (de `deploy/hostinger.htaccess`).
2. Hacer una **copia de seguridad** del WordPress actual (UpdraftPlus) si se va a reemplazar.
3. Subir **todo el contenido** de `dist/` (incluido el archivo oculto `.htaccess`) a `public_html`.
   Si hay un `robots.txt` de WordPress, debe quedar reemplazado por el de `dist/`: **el de WordPress bloquea a Google**
   (`Disallow: /`) y dejarlo es el error más común al lanzar un sitio.
4. DNS en OrderBox: agregar solo el registro **A** de `cbsperu.com` (IP del hosting) y el **CNAME** de `www`.
   **No cambiar los nameservers** ni borrar los registros MX/TXT: el correo es de Microsoft 365 y dejaría de funcionar.
5. Comprobar (el `.htaccess` está **sin probar** en Hostinger):
   - `curl -I http://cbsperu.com/` → redirige a `https://www.cbsperu.com/`
   - `curl -I https://www.cbsperu.com/limp-city` → 200 (sin barra final ni `.html`)
   - `curl -I https://www.cbsperu.com/limp-city/` → 301 a `/limp-city`
   - `curl -I https://www.cbsperu.com/no-existe` → **404**
   - `curl -I https://www.cbsperu.com/sitemap.xml` → 200
   - Cabeceras de seguridad y `cache-control` presentes. Si algún comando falla, revisar `deploy/hostinger.htaccess`.

## Después de publicar (SEO)

- Registrar `https://www.cbsperu.com/` como **propiedad de dominio** en Google Search Console (verificación con un registro
  TXT en OrderBox) y enviar `https://www.cbsperu.com/sitemap.xml`. Repetir en Bing Webmaster Tools.
- Revisar con la herramienta de compartir (WhatsApp, LinkedIn) que salga la imagen y el título de cada página.
- Ver `docs/SEO.md` para saber dónde cambiar títulos, descripciones y datos de la empresa.
