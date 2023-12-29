export default function getRange(start: number, end: number) {
  const length = end - start + 1

  return Array.from({ length }, (_, index) => index + start)
}
