import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const withCommas = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
