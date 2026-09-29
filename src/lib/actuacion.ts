export interface LocationEntry {
  name: string
  projectSlug?: string
  /** Posición del punto en el mapa, en las mismas unidades que `mapWidth`/`mapHeight` del grupo. */
  x: number
  y: number
  /** Lado hacia el que crece la etiqueta de texto, para evitar que choque con la del vecino. */
  labelSide: 'left' | 'right'
}

export interface LocationGroup {
  country: string
  locations: LocationEntry[]
  /** Contorno del país (trazado desde datos geográficos reales, simplificado). */
  mapPath: string
  mapWidth: number
  mapHeight: number
}

// Contornos generados a partir de datos geográficos reales (johan/world.geo.json,
// Natural Earth simplificado), proyectados en equirrectangular y escalados cada uno
// a su propio lienzo local -- por eso Perú y Brasil no guardan proporción real entre
// sí (si no, Perú se vería casi invisible al lado de Brasil).
export const locationGroups: LocationGroup[] = [
  {
    country: 'Perú',
    mapWidth: 260,
    mapHeight: 380,
    mapPath:
      'M236,353L230.8,363L220.8,367.9L201.3,356.8L199.6,348.8L161,329.3L126.1,308L111.1,296L103,279.9L106.2,274.3L89.8,248.8L70.6,212.9L52.2,174.1L44.2,165.3L38.1,150.9L23,138.2L9.1,130.3L15.4,121.7L6,103.1L12.1,89.5L27.6,77.2L29.9,85.3L24.3,89.9L24.8,97.1L32.9,95.5L40.8,97.6L48.9,107.4L59.9,99.4L63.6,86.3L75.5,69.4L98.9,61.7L120.1,41.3L126.2,28.7L123.5,13.9L128.7,12.1L141.6,21.3L147.8,30.5L156.8,35.5L168.3,55.9L182.8,58.3L193.5,53.2L200.5,56.5L212.2,54.9L227.1,64L214.5,83.8L220.4,84.2L230.1,94.6L212.6,93.7L210,96.6L194,100.3L171.8,113.6L170.3,122.7L165.4,129.4L167.3,139.9L155.6,145.6L155.6,153.8L150.4,157.3L158.5,174.9L169.4,186.7L165.2,195.1L178.2,196.2L185.5,206.6L202.7,207.1L218.6,195.6L217.4,225.2L226.2,227.4L237.2,224L254,255.4L249.8,261.9L248.9,275.6L248.5,292.2L240.9,301.9L244.4,309.1L239.9,315.6L248.3,332Z',
    locations: [
      { name: 'Cusco', projectSlug: 'rio-huatanay', x: 189.7, y: 274.2, labelSide: 'right' },
      { name: 'Puerto Maldonado', projectSlug: 'drenaje-tambopata', x: 243.8, y: 256, labelSide: 'left' },
      { name: 'Pasco', x: 106.2, y: 218.8, labelSide: 'right' },
    ],
  },
  {
    country: 'Brasil',
    mapWidth: 560,
    mapHeight: 420,
    mapPath:
      'M245.8,376.9L259.8,362.6L271.6,352.4L278.6,348.2L287.4,342.4L287.6,334.1L282.4,328L277.2,330L279.3,324L280.7,317.8L280.7,312.1L276.9,310.2L273,311.9L269.1,311.4L267.9,307.4L266.9,297.8L264.9,294.7L257.9,291.8L253.6,293.9L242.6,291.9L243.3,277.7L240.2,271.9L243.4,269.7L242.4,263.7L245.3,259.2L247.2,250.9L244.7,244.4L239,241.5L237.9,237.3L239.4,231.3L219.3,230.9L215.3,218.7L218.4,218.5L218.2,214L216.2,211L215.7,204.9L209.7,201.8L203.1,201.9L198.8,198.9L191.7,196.8L187.6,192.9L175.9,191.2L164.5,181.8L165.3,174.8L164.1,170.8L165.2,162.9L151.5,164.7L146,168.6L136.8,172.9L134.5,176L129.1,176.3L121.3,175.4L115.4,177.2L110.7,176L111.4,160.1L102.8,166.3L93.6,166L89.6,160.4L82.7,159.8L84.9,155.3L79.1,149L74.7,139.5L77.5,137.6L77.5,133.2L83.8,130.2L82.7,124.5L85.4,120.9L86.2,116L98.1,108.9L106.7,106.9L108.1,105.3L117.5,105.8L122.2,77.1L122.5,72.6L120.8,66.6L116.2,62.8L116.3,55.2L122.1,53.5L124.2,54.5L124.6,50.5L118.5,49.5L118.3,42.9L138.7,43.1L142.2,39.5L145.1,42.9L147.1,49L149.1,47.7L154.8,53.3L163,52.6L165,49.4L172.8,47L177.1,45.2L178.3,40.8L185.8,37.8L185.2,35.6L176.3,34.7L174.9,28.1L175.3,21.1L170.6,18.4L172.6,17.5L180.3,18.8L188.7,21.4L191.7,18.9L199.2,17.3L210.9,13.4L214.7,9.4L213.3,6.5L218.8,6L221.2,8.4L219.8,13L223.4,14.6L225.8,19.4L222.9,23.1L221.3,32L223.9,37.3L224.7,42.2L231.1,47.1L236.3,47.6L237.4,45.5L240.7,45.1L245.5,43.3L248.9,40.5L254.6,41.4L257.2,41L262.9,41.8L263.8,39.7L262.1,37.6L263.1,34.6L267.3,35.5L272.3,34.5L278.3,36.7L282.8,38.8L286.1,36L288.4,36.4L289.8,39.4L294.8,38.6L298.8,34.7L302.1,27L308.2,17.4L311.8,16.9L314.4,22.7L320.3,41L325.9,42.7L326.1,49.9L318.3,58.5L321.5,61.7L340,63.3L340.4,73.8L348.3,66.9L361.5,70.7L378.9,77.1L384,83.2L382.2,89L394.4,85.8L414.8,91.3L430.4,90.9L445.8,99.5L459.2,111.3L467.3,114.3L476.2,114.7L480,118L483.5,131.3L485.3,137.6L481.1,154.9L475.8,161.8L461.1,176.3L454.4,188.1L446.6,197.2L444,197.4L441.1,205.1L441.9,224.7L438.9,240.8L437.8,247.7L434.5,251.8L432.7,265.8L422.1,279.5L420.3,290.3L411.8,294.8L409.4,301.1L398,301L381.6,305.1L374.2,309.7L362.5,312.8L350.2,321.1L341.3,331.5L339.8,339.3L341.5,345.1L339.6,355.6L337.2,360.7L329.9,366.5L318.3,384.9L309.1,393.2L302,398.1L297.2,408L290.3,414L287.4,408.1L292,403.1L286,396L277.8,390.2L267,383.5L263.1,383.8L252.6,375.7Z',
    locations: [
      { name: 'Piauí', x: 400.9, y: 114.1, labelSide: 'right' },
      { name: 'Pernambuco', x: 483.7, y: 145, labelSide: 'right' },
      { name: 'Alagoas', x: 474.8, y: 161.9, labelSide: 'right' },
      { name: 'Sergipe', x: 460.8, y: 175, labelSide: 'left' },
      { name: 'Bahía', x: 445.7, y: 196.5, labelSide: 'right' },
      { name: 'Espírito Santo', x: 426.6, y: 273.4, labelSide: 'right' },
      { name: 'São Paulo', x: 360.8, y: 307.1, labelSide: 'left' },
      { name: 'Río de Janeiro', x: 397, y: 300.4, labelSide: 'right' },
      { name: 'Santa Catarina', x: 340.8, y: 349.4, labelSide: 'right' },
    ],
  },
]
