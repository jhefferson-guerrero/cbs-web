// Símbolo de reciclaje clásico (tres flechas macizas que se persiguen), dibujado a mano para que sea sólido y con
// esquinas redondeadas; el ícono de Phosphor es de trazo fino. Toma el color del texto (currentColor).
// Cada flecha es la misma figura (una banda gruesa que dobla en un vértice del triángulo y termina en punta) girada
// 0°, 120° y 240° alrededor del centro.
const ARROW_BAND = 'M-17.42 -15.83 L-4.5 -38.21 Q0 -46 4.5 -38.21 L10.42 -27.95'
const ARROW_HEAD = '0.03,-21.95 20.81,-33.95 17.42,-15.83'

export function RecycleSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="-45.5 -51 91 91" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      {[0, 120, 240].map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <path d={ARROW_BAND} fill="none" stroke="currentColor" strokeWidth="10" strokeLinejoin="round" />
          <polygon points={ARROW_HEAD} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  )
}
