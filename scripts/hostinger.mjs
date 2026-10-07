// Para publicar en Hostinger: deja el .htaccess (deploy/hostinger.htaccess) dentro de dist/, junto al sitio compilado.
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
fs.copyFileSync(path.join(root, 'deploy', 'hostinger.htaccess'), path.join(root, 'dist', '.htaccess'))
console.log('Listo para Hostinger: dist/ contiene el sitio y su .htaccess. Súbelo completo a public_html (ver deploy/README.md).')
