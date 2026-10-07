// Versión SEMÁNTICA del HTML que dibuja la app: los mismos títulos, textos, enlaces e imágenes (sale del mismo render),
// pero sin clases, estilos, iconos ni elementos decorativos. Es lo que necesitan los buscadores y las vistas previas
// al compartir, y pesa una fracción. Quien tiene JavaScript lo descarta al arrancar la app (ver main.tsx), así que no
// debe costarle tiempo de carga. Lo usa scripts/prerender.mjs.
export function toSemanticHtml(html) {
  let out = html
    // comentarios que React deja entre textos (<!-- -->): se quitan primero para no perder los espacios que los rodean
    .replace(/<!--[\s\S]*?-->/g, '')
    // enlaces de precarga que React deja dentro del contenido
    .replace(/<link\b[^>]*>/g, '')
    // <picture> y <source>: una <img> dentro de un <picture> descarga la fuente que elija el navegador aunque no tenga src
    .replace(/<\/?picture\b[^>]*>/g, '')
    .replace(/<source\b[^>]*>/g, '')
    // iconos y dibujos decorativos
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    // imágenes decorativas (fondos): sin texto alternativo no aportan al contenido
    .replace(/<img\b[^>]*\baria-hidden="true"[^>]*>/g, '')
    // elementos decorativos vacíos (esquinas, degradados, cortinas)
    .replace(/<(span|div)\b[^>]*\baria-hidden="true"[^>]*><\/\1>/g, '')
    // atributos de presentación y de comportamiento de la app
    .replace(
      /\s(?:class|style|data-[\w-]+|fetchpriority|decoding|width|height|srcset|sizes|tabindex|draggable|autocomplete|maxlength|inputmode|aria-expanded|aria-invalid)="[^"]*"/g,
      '',
    )
    .replace(/\s(?:aria-hidden|aria-live|noValidate|novalidate)(?:="[^"]*")?(?=[\s>/])/g, '')

  // De las imágenes queda solo su texto alternativo, SIN la dirección del archivo. Con ella, el navegador descargaría
  // todas al arrancar (este contenido va oculto y sin estilos, así que todas quedan "cerca" y no se difieren): 19
  // imágenes y 1.4 MB que compiten con la del hero y retrasan la carga. Las imágenes reales las dibuja la app.
  out = out.replace(/<img\b([^>]*?)\s*\/?>/g, (_tag, attrs) => {
    const alt = (attrs.match(/\balt="([^"]*)"/) || [])[1] ?? ''
    return alt ? `<img alt="${alt}">` : ''
  })

  // Contenedores que quedaron vacíos tras quitar lo decorativo (varias pasadas por si estaban anidados).
  for (let i = 0; i < 4; i++) out = out.replace(/<(div|span|p|li)\b[^>]*>\s*<\/\1>/g, '')

  return out.replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ')
}
