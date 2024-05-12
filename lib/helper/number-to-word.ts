export function numberToWord(n: number) {
  if (n === 2) {
    return 'zwei'
  }
  if (n === 3) {
    return 'drei'
  }
  if (n === 4) {
    return 'vier'
  }
  if (n === 5) {
    return 'fünf'
  }
  if (n === 6) {
    return 'sechs'
  }
  if (n === 7) {
    return 'sieben'
  }
  if (n === 8) {
    return 'acht'
  }
  if (n === 9) {
    return 'neun'
  }
  if (n === 10) {
    return 'zehn'
  }
  if (n === 11) {
    return 'elf'
  }
  if (n === 12) {
    return 'zwölf'
  }
  return n.toString()
}
