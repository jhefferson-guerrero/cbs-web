// Símbolo de reciclaje clásico (tres flechas macizas que se persiguen), dibujado a mano para que sea sólido y con
// esquinas redondeadas; el ícono de Phosphor es de trazo fino. Toma el color del texto (currentColor).
// Cada flecha es la misma figura (una banda gruesa que dobla en un vértice del triángulo y termina en punta) girada
// 0°, 120° y 240° alrededor del centro.
const ARROW_BAND = 'M-16.05 -16.2 L-3 -38.8 Q0 -44 3 -38.8 L9.55 -27.45'
const ARROW_HEAD = '-4.3,-19.45 23.41,-35.45 16.05,-16.2'

export function RecycleSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="-52.65 -53.5 101 101" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      {[0, 120, 240].map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <path d={ARROW_BAND} fill="none" stroke="currentColor" strokeWidth="19" strokeLinejoin="round" />
          <polygon points={ARROW_HEAD} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  )
}
