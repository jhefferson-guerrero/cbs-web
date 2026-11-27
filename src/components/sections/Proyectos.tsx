import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowLeftIcon, ArrowRightIcon, MapPinIcon } from '@phosphor-icons/react'
import { PageLink } from '@/components/ui/PageLink'
import { useMediaQuery } from '@/lib/use-media-query'
import { COVER_FEATURE_SIZES, COVER_STRIP_SIZES, COVER_THUMB_SIZES, DESKTOP_QUERY } from '@/lib/project-images'
import { projects } from '@/lib/projects'
import { cn } from '@/lib/utils'

// Los tamaños de las portadas (sizes) viven en lib/project-images.ts: la precarga de la Home usa los mismos, así el
// navegador descarga por adelantado la misma variante que luego se pinta.
const FEATURE_SIZES = COVER_FEATURE_SIZES
const THUMB_SIZES = COVER_THUMB_SIZES
const STRIP_SIZES = COVER_STRIP_SIZES

const EASE = [0.16, 1, 0.3, 1] as const
const pad = (n: number) => String(n).padStart(2, '0')

// Escritorio (desde lg): los proyectos son franjas verticales lado a lado, todos a la vista. La franja activa se abre y
// muestra el título, el lugar y el botón; las demás quedan angostas. Se abre con el cursor, el foco de teclado o un toque
// (la misma mecánica que los servicios de Limp City). Celular y tableta: un proyecto grande a la vez, con las miniaturas
// de los demás debajo, flechas y deslizamiento. Sin reproducción automática.
export function Proyectos() {
  const reduceMotion = useReducedMotion()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const [active, setActive] = useState(0)
  // Las fotos que no se ven (en celular, las grandes apiladas con opacidad 0) no se pintan: el navegador las deja
  // "perezosas" (lazy) y, aunque ya hayan bajado, no las decodifica (convierte a píxeles) hasta que se pintan. Al pulsar
  // la flecha la foto nueva se descargaba o decodificaba en ese momento y se veía un rato el fondo azul. Cuando la
  // sección se acerca a la pantalla se piden todas y se decodifican de antemano.
  const slidesRef = useRef<HTMLDivElement>(null)
  const nearScreen = useInView(slidesRef, { once: true, margin: '600px 0px 600px 0px' })
  useEffect(() => {
    if (!nearScreen) return
    const images = slidesRef.current?.querySelectorAll('img') ?? []
    images.forEach((img) => {
      const decode = () => void img.decode().catch(() => undefined)
      if (img.complete) decode()
      else img.addEventListener('load', decode, { once: true })
    })
  }, [nearScreen])

  return (
    <section className="bg-white">
      {/* Espacio blanco de respiro sobre la sección. Queda fuera del ancla (#proyectos
          está en el bloque de abajo), así al pulsar "Proyectos" el scroll se detiene
          donde empieza el contenido y este espacio solo se ve al bajar desde arriba. */}
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
      <div id="proyectos" className="lg:h-[calc(100svh-var(--nav-h))] lg:min-h-[540px]">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:flex lg:h-full lg:flex-row lg:items-center lg:gap-[clamp(2rem,4vw,4rem)] lg:px-10 lg:py-[clamp(1rem,3.5vh,3rem)] xl:px-16 2xl:max-w-[1700px] 2xl:px-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-2xl lg:w-[clamp(16rem,30%,26rem)] lg:max-w-none lg:shrink-0"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 2xl:text-sm">
              Nuestros proyectos
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-navy-900 md:text-4xl lg:mt-[clamp(0.5rem,1.6vh,1rem)] lg:text-[clamp(2rem,4.6vh,3rem)]">
              Presencia en el territorio peruano
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700 lg:mt-[clamp(0.25rem,1vh,0.75rem)] lg:text-[clamp(15.5px,1.9vh,19px)]">
              Obras de agua y saneamiento en distintas regiones del país, con organismos públicos y
              financiamiento multilateral.
            </p>
          </motion.div>

          <motion.div
            role="group"
            aria-roledescription={isDesktop ? undefined : 'carrusel'}
            aria-label="Proyectos"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mt-12 lg:mt-0 lg:flex lg:h-full lg:min-w-0 lg:flex-1 lg:items-center"
          >
            {/* En escritorio el bloque toma la altura disponible pero nunca pasa de 16:10 de proporción. */}
            <div ref={slidesRef} className="relative flex w-full flex-col gap-4 lg:block lg:aspect-[16/10] lg:max-h-full">
              {isDesktop ? (
                <ProjectStrips active={active} onActivate={setActive} nearScreen={nearScreen} />
              ) : (
                <ProjectCarousel active={active} onChange={setActive} nearScreen={nearScreen} />
              )}
            </div>
          </motion.div>

          {/* Enlaces a todos los proyectos para buscadores y lectores de pantalla: en la vista solo uno está grande y los
              demás son botones que cambian de proyecto, no enlaces. */}
          <nav aria-label="Páginas de los proyectos" className="sr-only">
            <ul>
              {projects.map((project) => (
                <li key={project.slug}>
                  <PageLink to={`/proyectos/${project.slug}`} tabIndex={-1}>
                    {project.title}
                  </PageLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div aria-hidden="true" className="hidden lg:block lg:h-[clamp(2rem,8vh,6rem)]" />
    </section>
  )
}

interface ViewProps {
  active: number
  nearScreen: boolean
}

// Escritorio: franjas verticales, la activa abierta. El ancho de cada columna se anima con grid-template-columns.
function ProjectStrips({ active, onActivate, nearScreen }: ViewProps & { onActivate: (index: number) => void }) {
  const columns = projects.map((_, i) => (i === active ? '5fr' : '1fr')).join(' ')

  return (
    <>
      <ul
        style={{ '--cols': columns } as CSSProperties}
        className="absolute inset-0 grid gap-3 [grid-template-columns:var(--cols)] [grid-template-rows:minmax(0,1fr)] transition-[grid-template-columns] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
      >
        {projects.map((project, i) => {
          const isActive = i === active
          const [mainTitle, subTitle] = project.title.split(' — ')

          return (
            <li
              key={project.slug}
              onMouseEnter={() => onActivate(i)}
              className="relative min-h-0 min-w-0 overflow-hidden bg-navy-950 shadow-card"
            >
              {/* Botón que cubre la franja cerrada: abre la franja con el foco de teclado o un toque. Va primero en el
                  orden del documento para que, ya abierta, el siguiente Tab llegue a su enlace "Ver proyecto". */}
              <button
                type="button"
                aria-expanded={isActive}
                aria-label={`Ver proyecto: ${project.title}`}
                tabIndex={isActive ? -1 : 0}
                onFocus={() => onActivate(i)}
                onClick={() => onActivate(i)}
                className={cn(
                  'absolute inset-0 z-10 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400',
                  isActive && 'pointer-events-none',
                )}
              />

              <img
                src={project.cover}
                srcSet={project.coverSrcSet}
                sizes={STRIP_SIZES}
                alt={isActive ? project.title : ''}
                aria-hidden={isActive ? undefined : true}
                draggable={false}
                loading={nearScreen ? 'eager' : 'lazy'}
                decoding="async"
                className={cn(
                  'absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
                  isActive ? 'scale-100' : 'scale-110 grayscale-[25%]',
                )}
              />

              {/* Franja abierta: degradado desde la izquierda para leer el texto. Cerrada: velo navy parejo. */}
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/45 via-45% to-transparent transition-opacity duration-700 motion-reduce:transition-none',
                  isActive ? 'opacity-100' : 'opacity-0',
                )}
              />
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/35 to-navy-950/10 transition-opacity duration-700 motion-reduce:transition-none',
                  isActive ? 'opacity-0' : 'opacity-100',
                )}
              />

              <span aria-hidden="true" className="absolute left-4 top-4 font-mono text-xs font-semibold tracking-[0.2em] text-white/90">
                {pad(i + 1)}
              </span>

              {/* Categoría en vertical cuando la franja está cerrada. */}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute bottom-5 left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap text-base font-semibold text-white transition-opacity [writing-mode:vertical-rl] lg:text-[clamp(1rem,2.2vh,1.375rem)]',
                  isActive ? 'opacity-0 duration-75' : 'opacity-100 delay-[350ms] duration-500',
                )}
              >
                {project.category}
              </span>

              {/* Texto de la franja abierta. Ancho fijo (no sigue al de la franja) para que no se reacomode mientras la
                  franja cambia de tamaño; sale rápido y entra cuando la franja ya casi terminó de abrirse. */}
              <div
                aria-hidden={isActive ? undefined : true}
                className={cn(
                  'absolute inset-y-0 left-0 z-20 flex w-[clamp(17rem,26vw,28rem)] flex-col justify-center p-[clamp(1.25rem,2.4vw,2.5rem)] pt-12 transition-opacity',
                  isActive ? 'opacity-100 delay-[350ms] duration-500' : 'pointer-events-none opacity-0 duration-75',
                )}
              >
                <h3 className="text-[clamp(1.35rem,3.6vh,2.25rem)] font-bold leading-[1.15] text-white">
                  {mainTitle}
                  {subTitle && (
                    <>
                      <span className="sr-only"> — </span>
                      <span className="mt-2 block text-[clamp(0.95rem,2.2vh,1.35rem)] font-medium leading-snug text-white/80">
                        {subTitle}
                      </span>
                    </>
                  )}
                </h3>
                <p className="mt-[clamp(0.5rem,1.8vh,1.25rem)] flex items-center gap-1.5 text-[clamp(0.875rem,1.9vh,1.1rem)] text-navy-100">
                  <MapPinIcon size={16} weight="regular" className="shrink-0 text-cyan-400" />
                  {project.location}
                </p>
                {/* Botón blanco sólido de esquinas casi rectas: se lee bien sobre la foto. Solo la flecha avanza al pasar el cursor. */}
                <PageLink
                  to={`/proyectos/${project.slug}`}
                  tabIndex={isActive ? 0 : -1}
                  className="group mt-[clamp(1rem,3.2vh,2rem)] inline-flex w-fit items-center gap-3 rounded-lg bg-white px-6 py-3 text-base font-semibold text-navy-900 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 2xl:text-lg"
                >
                  Ver proyecto
                  <ArrowRightIcon
                    size={18}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
                  />
                </PageLink>
              </div>
            </li>
          )
        })}
      </ul>

      {/* Marcas en L en dos esquinas opuestas (arriba a la derecha y abajo a la izquierda), como en el hero y en Clientes. */}
      <span aria-hidden="true" className="absolute right-5 top-5 z-30 h-6 w-6 border-r-2 border-t-2 border-white/70" />
      <span aria-hidden="true" className="absolute bottom-5 left-5 z-30 h-6 w-6 border-b-2 border-l-2 border-white/70" />
    </>
  )
}

// Celular y tableta: un proyecto grande a la vez. Se cambia con las miniaturas, las flechas o deslizando.
function ProjectCarousel({ active, onChange, nearScreen }: ViewProps & { onChange: (index: number) => void }) {
  const reduceMotion = useReducedMotion()
  const count = projects.length
  const current = projects[active]
  const go = (index: number) => onChange(((index % count) + count) % count)
  // Las miniaturas van en orden a partir del siguiente al activo.
  const others = Array.from({ length: count - 1 }, (_, k) => (active + 1 + k) % count)
  const canSwitch = count > 1
  const [mainTitle, subTitle] = current.title.split(' — ')

  return (
    <>
      {/* Proyecto activo. Las fotos de todos los proyectos están apiladas y solo cambia cuál se ve: así la
          siguiente ya está descargada cuando se pulsa y no hay parpadeo. */}
      <motion.div
        drag={canSwitch ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50) go(active + 1)
          else if (info.offset.x > 50) go(active - 1)
        }}
        className="relative aspect-[4/5] overflow-hidden bg-navy-950 shadow-card sm:aspect-[16/10]"
      >
        {projects.map((project, i) => (
          <motion.img
            key={project.slug}
            src={project.cover}
            srcSet={project.coverSrcSet}
            sizes={FEATURE_SIZES}
            alt={i === active ? project.title : ''}
            aria-hidden={i === active ? undefined : true}
            draggable={false}
            loading={nearScreen ? 'eager' : 'lazy'}
            decoding="async"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-navy-950/0" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/20 via-transparent to-transparent" />

        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
            >
              {/* El título largo ("Obra — Lugar") se parte en dos niveles: la obra grande y el lugar debajo, más chico (en celular se oculta el segundo para no recargar el texto). */}
              <h3 className="text-2xl font-bold leading-[1.15] text-white sm:text-3xl">
                {mainTitle}
                {subTitle && (
                  <>
                    <span className="sr-only"> — </span>
                    <span className="mt-2 hidden text-base font-medium leading-snug text-white/80 sm:block sm:text-lg">
                      {subTitle}
                    </span>
                  </>
                )}
              </h3>
              <p className="mt-4 flex items-center gap-1.5 text-sm text-navy-100">
                <MapPinIcon size={16} weight="regular" className="shrink-0 text-cyan-400" />
                {current.location}
              </p>
              <PageLink
                to={`/proyectos/${current.slug}`}
                className="group mt-7 inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 text-base font-semibold text-navy-900 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                Ver proyecto
                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
                />
              </PageLink>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Controles (flechas y contador), arriba a la derecha de la foto. */}
      {canSwitch && (
        <div className="absolute right-4 top-4 z-30 flex items-center gap-3 sm:right-6 sm:top-6">
          <p aria-live="polite" className="mr-1 font-mono text-xs font-semibold tracking-[0.2em] text-white/90">
            {pad(active + 1)} / {pad(count)}
          </p>
          {[
            { label: 'Proyecto anterior', icon: <ArrowLeftIcon size={18} weight="bold" />, to: active - 1 },
            { label: 'Proyecto siguiente', icon: <ArrowRightIcon size={18} weight="bold" />, to: active + 1 },
          ].map((arrow) => (
            <button
              key={arrow.label}
              type="button"
              onClick={() => go(arrow.to)}
              aria-label={arrow.label}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 bg-white/15 text-white backdrop-blur-md outline-none transition-colors duration-300 hover:border-white/70 hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white active:scale-95"
            >
              {arrow.icon}
            </button>
          ))}
        </div>
      )}

      {/* Los demás proyectos: una fila de miniaturas debajo de la foto. */}
      {canSwitch && (
        <div className="grid auto-cols-fr grid-flow-col gap-3">
          {others.map((index) => {
            const project = projects[index]
            return (
              <motion.button
                key={project.slug}
                layout={reduceMotion ? false : 'position'}
                transition={{ duration: 0.5, ease: EASE }}
                type="button"
                onClick={() => onChange(index)}
                aria-label={`Ver proyecto: ${project.title}`}
                className="group relative h-28 overflow-hidden bg-navy-950 text-left shadow-xl shadow-navy-950/40 outline-none ring-1 ring-white/20 focus-visible:ring-2 focus-visible:ring-cyan-400 sm:h-32"
              >
                <img
                  src={project.cover}
                  srcSet={project.coverSrcSet}
                  sizes={THUMB_SIZES}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  loading={nearScreen ? 'eager' : 'lazy'}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-navy-950/0" />
                <span className="absolute inset-x-3 bottom-3 text-sm font-semibold leading-snug text-white">
                  {project.location}
                </span>
              </motion.button>
            )
          })}
        </div>
      )}
    </>
  )
}
