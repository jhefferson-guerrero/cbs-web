import { Link } from 'react-router-dom'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { locationGroups } from '@/lib/actuacion'
import { cn } from '@/lib/utils'

// Separación entre los lienzos de cada país y margen superior reservado para
// el rótulo del país (PERÚ / BRASIL). Todo lo demás sale de las dimensiones
// que ya trae cada grupo en `lib/actuacion.ts`.
const GAP = 30
const LABEL_MARGIN = 26

const offsets = (() => {
  let x = 0
  return locationGroups.map((group) => {
    const offset = x
    x += group.mapWidth + GAP
    return offset
  })
})()

const TOTAL_WIDTH = offsets[offsets.length - 1] + locationGroups[locationGroups.length - 1].mapWidth
const TOTAL_HEIGHT = LABEL_MARGIN + Math.max(...locationGroups.map((g) => g.mapHeight))

export function CoverageMap() {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${TOTAL_WIDTH} / ${TOTAL_HEIGHT}` }}>
      <svg viewBox={`0 0 ${TOTAL_WIDTH} ${TOTAL_HEIGHT}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        {locationGroups.map((group, i) => (
          <path
            key={group.country}
            d={group.mapPath}
            transform={`translate(${offsets[i]}, ${LABEL_MARGIN})`}
            className="fill-navy-700 stroke-navy-500/60"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        ))}
      </svg>

      <div className="absolute inset-0">
        {locationGroups.map((group, i) => {
          const offsetX = offsets[i]

          return (
            <div key={group.country}>
              <span
                className="absolute font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400 sm:text-xs"
                style={{ left: `${(offsetX / TOTAL_WIDTH) * 100}%`, top: 0 }}
              >
                {group.country}
              </span>

              {group.locations.map((location) => {
                const leftPct = ((offsetX + location.x) / TOTAL_WIDTH) * 100
                const topPct = ((LABEL_MARGIN + location.y) / TOTAL_HEIGHT) * 100
                const onRight = location.labelSide === 'right'

                const dot = (
                  <span className="absolute left-1/2 top-1/2 flex h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <span className="absolute h-2.5 w-2.5 rounded-full bg-cyan-500/25" />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  </span>
                )

                const label = (
                  <span
                    className={cn(
                      'absolute top-1/2 flex -translate-y-1/2 items-center gap-1 whitespace-nowrap font-mono text-[10px] font-medium text-white sm:text-[11px]',
                      onRight ? 'left-1/2 ml-2' : 'right-1/2 mr-2 flex-row-reverse',
                    )}
                  >
                    {location.name}
                    {location.projectSlug && (
                      <ArrowUpRightIcon size={10} weight="regular" className="shrink-0 text-navy-300 transition-colors group-hover:text-cyan-300" />
                    )}
                  </span>
                )

                const wrapperStyle = { left: `${leftPct}%`, top: `${topPct}%` }

                if (location.projectSlug) {
                  return (
                    <Link
                      key={location.name}
                      to={`/proyectos/${location.projectSlug}`}
                      aria-label={location.name}
                      className="group absolute outline-none"
                      style={wrapperStyle}
                    >
                      {dot}
                      {label}
                    </Link>
                  )
                }

                return (
                  <span key={location.name} className="absolute" style={wrapperStyle}>
                    {dot}
                    {label}
                  </span>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
