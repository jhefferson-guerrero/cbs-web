// Símbolo universal de reciclaje (la cinta de Möbius con tres flechas). El diseño, de Gary Anderson (1970), es de dominio
// público y no es marca registrada; los trazos vienen de "Recycle001.svg" de Wikimedia Commons (dominio público), sin el
// contorno y con el color del texto (currentColor), así que en el hero sale blanco como el logo de Limp City.
const PIECES = [
  'M280 272C134 187 134 187 134 187C210 54 210 54 210 54C231 17 309 16 336 48C373 110 373 110 373 110Z',
  'M162 475C84 475 84 475 84 475C54 471.75 4 410 34 354C68 297 68 297 68 297C15 266 15 266 15 266C183 266 183 266 183 266C268 412 268 412 268 412C215 383 215 383 215 383Z',
  'M363 496C363 667 363 667 363 667C176 667 176 667 176 667C165 668 157 657 151 648C63 492 64 493 60 488C64.75 492 70 496 85 496Z',
  'M687 496C706 494 709 489 714 486C620 652 620 652 620 652C616 660 608 667 596 667C492 667 492 667 492 667C492 728 492 728 492 728C407 583 407 583 407 583C492 437 492 437 492 437C492 496 492 496 492 496Z',
  'M519 315C666 231 666 231 666 231C743 362 743 362 743 362C771 416 723 468 691 474C612 474 612 474 612 474Z',
  'M357 35C351 27 339 17 328 15C525 15 525 15 525 15C536 15 546 19 551 28C602 118 602 118 602 118C653 89 653 89 653 89C570 233 570 233 570 233C404 233 404 233 404 233C454 203 454 203 454 203Z',
]

export function RecycleSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="2 12 771 719" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      {PIECES.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
