export interface NavLink {
  label: string
  href: string
}

// Los enlaces a secciones de la Home: en la Home son anclas (#nosotros) y en las demás páginas apuntan a la Home
// (/#nosotros). Así los buscadores los leen como enlaces internos a la Home, y no como anclas de la misma página.
export const sectionHref = (pathname: string, hash: string) => (pathname === '/' ? hash : `/${hash}`)

export const navLinks: NavLink[] = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Certificaciones', href: '#certificaciones' },
  { label: 'Actuación', href: '#actuacion' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contacto', href: '#contacto' },
]
