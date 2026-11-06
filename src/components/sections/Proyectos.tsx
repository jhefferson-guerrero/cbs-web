import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeftIcon, ArrowRightIcon, MapPinIcon } from '@phosphor-icons/react'
import { PageLink } from '@/components/ui/PageLink'
import { useMediaQuery } from '@/lib/use-media-query'
import { projects } from '@/lib/projects'

// Tamaños reales de las fotos para que el navegador elija la versión más chica que alcance: la grande ocupa casi todo
// el ancho; las miniaturas, un tercio del ancho en celular y ~11% en escritorio.
const FEATURE_SIZES = '100vw'
const THUMB_SIZES = '(min-width: 1024px) 14vw, 34vw'

const EASE = [0.16, 1, 0.3, 1] as const
const pad = (n: number) => String(n).padStart(2, '0')

// Un proyecto grande a la vez, con los demás como miniaturas verticales encima de la foto, a la derecha (debajo en
// celular). Se cambia de proyecto con las miniaturas, las flechas o deslizando en celular. Sin reproducción automática.
export function Proyectos() {
  const reduceMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [active, setActive] = useState(0)

  const count = projects.length
  const current = projects[active]
  const go = (index: number) => setActive(((index % count) + count) % count)
  // Las miniaturas van en orden a partir del siguiente al activo (el primero es el "siguiente").
  const others = Array.from({ length: count - 1 }, (_, k) => (active + 1 + k) % count)
  const canSwitch = count > 1
  const [mainTitle, subTitle] = current.title.split(' — ')

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
            aria-roledescription="carrusel"
            aria-label="Proyectos"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mt-12 lg:mt-0 lg:flex lg:h-full lg:min-w-0 lg:flex-1 lg:items-center"
          >
            {/* En escritorio la foto toma la altura disponible pero nunca pasa de 16:10 de proporción: con el título en la
                columna de al lado queda alta, no como una franja ancha. */}
            <div className="relative flex w-full flex-col gap-4 lg:block lg:aspect-[16/10] lg:max-h-full">
            {/* Proyecto activo. Las fotos de todos los proyectos están apiladas y solo cambia cuál se ve: así la
                siguiente ya está descargada cuando se pulsa y no hay parpadeo. */}
            <motion.div
              drag={canSwitch && !isDesktop ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) go(active + 1)
                else if (info.offset.x > 50) go(active - 1)
              }}
              className="relative aspect-[4/5] overflow-hidden rounded-md bg-navy-950 shadow-card sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto"
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
                  loading="lazy"
                  decoding="async"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
                  transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-navy-950/0 lg:from-navy-950/45 lg:via-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/20 via-transparent to-transparent lg:from-navy-950/90 lg:via-navy-950/55 lg:via-40%" />
              {/* Marcas en L en dos esquinas opuestas (arriba a la derecha y abajo a la izquierda), como en el hero y en Clientes. Solo en escritorio: en celular arriba a la derecha van los controles. */}
              <span aria-hidden="true" className="absolute right-5 top-5 z-20 hidden h-6 w-6 border-r-2 border-t-2 border-white/70 lg:block" />
              <span aria-hidden="true" className="absolute bottom-5 left-5 z-20 hidden h-6 w-6 border-b-2 border-l-2 border-white/70 lg:block" />

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8 lg:max-w-[54%] lg:justify-center lg:py-0 lg:pl-[clamp(2rem,4vw,4rem)] lg:pr-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.slug}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
                  >
                    {/* La categoría no se muestra aquí: el propio título ya dice si es agua potable o drenaje. */}
                    {/* El título largo ("Obra — Lugar") se parte en dos niveles: la obra grande y el lugar debajo, más chico. */}
                    <h3 className="text-2xl font-bold leading-[1.15] text-white sm:text-3xl lg:text-[clamp(1.75rem,5vh,3.25rem)]">
                      {mainTitle}
                      {subTitle && (
                        <>
                          <span className="sr-only"> — </span>
                          <span className="mt-2 block text-base font-medium leading-snug text-white/80 sm:text-lg lg:mt-[clamp(0.5rem,1.6vh,1rem)] lg:text-[clamp(1.05rem,2.5vh,1.6rem)]">
                            {subTitle}
                          </span>
                        </>
                      )}
                    </h3>
                    <p className="mt-4 flex items-center gap-1.5 text-sm text-navy-100 lg:mt-[clamp(0.75rem,2.4vh,1.5rem)] lg:text-[clamp(0.875rem,1.9vh,1.1rem)]">
                      <MapPinIcon size={16} weight="regular" className="shrink-0 text-cyan-400" />
                      {current.location}
                    </p>
                    {/* Botón blanco sólido de esquinas casi rectas: se lee bien sobre la foto. Al pasar el cursor el botón no cambia: solo la flecha avanza. */}
                    <PageLink
                      to={`/proyectos/${current.slug}`}
                      className="group mt-7 inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 text-base font-semibold text-navy-900 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 lg:mt-[clamp(1.25rem,3.8vh,2.5rem)] lg:px-7 2xl:text-lg"
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

            {/* Controles (flechas y contador): en escritorio van abajo y centrados;
                en celular, arriba a la derecha de la foto. */}
            {canSwitch && (
              <div className="absolute right-4 top-4 z-30 flex items-center gap-3 sm:right-6 sm:top-6 lg:bottom-[clamp(1rem,3.5vh,2rem)] lg:left-1/2 lg:right-auto lg:top-auto lg:-translate-x-1/2">
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

            {/* Los demás proyectos: en escritorio, miniaturas verticales encima de la foto, a la derecha y sobresaliendo un
                poco del borde; en celular, una fila debajo de la foto. */}
            {canSwitch && (
              <div className="grid auto-cols-fr grid-flow-col gap-3 lg:absolute lg:bottom-[12%] lg:-right-6 lg:z-30 lg:flex lg:h-[54%] lg:items-end lg:gap-[clamp(0.75rem,1.2vw,1.25rem)]">
                {others.map((index) => {
                  const project = projects[index]
                  return (
                    <motion.button
                      key={project.slug}
                      layout={reduceMotion ? false : 'position'}
                      transition={{ duration: 0.5, ease: EASE }}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Ver proyecto: ${project.title}`}
                      className="group relative h-28 overflow-hidden rounded-md bg-navy-950 text-left shadow-xl shadow-navy-950/40 outline-none ring-1 ring-white/20 focus-visible:ring-2 focus-visible:ring-cyan-400 sm:h-32 lg:h-full lg:w-auto lg:aspect-[7/8]"
                    >
                      <img
                        src={project.cover}
                        srcSet={project.coverSrcSet}
                        sizes={THUMB_SIZES}
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        loading="lazy"
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
