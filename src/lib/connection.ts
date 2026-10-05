type NetworkInformation = { saveData?: boolean; effectiveType?: string }

// Con ahorro de datos o una conexión 2G no vale la pena gastar bytes en páginas que quizá el visitante
// nunca abra: las precargas en segundo plano lo comprueban antes de pedir nada.
export function isConnectionConstrained() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  return Boolean(connection?.saveData) || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'
}
