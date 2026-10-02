// La imagen del hero de Limp City vive en su propio módulo para que el
// prefetch que corre desde el Home (lib/prefetch-limp-city.ts) pueda
// conocer su URL sin arrastrar el resto de lib/limp-city.ts.
import heroImage from '@/assets/images/limpcity/hero-limpieza.webp'

export { heroImage as limpCityHeroImage }
