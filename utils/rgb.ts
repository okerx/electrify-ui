/**
 * Convert a HEX color to RGB or RGBA format
 * */
export default function rgb(hex: string, alpha?: number) {
  let _hex = hex;

  if (hex.length === 4) {
    _hex = hex
      .split('')
      .slice(1, 4)
      .map(i => i + i)
      .join('');
  }

  const R = parseInt(_hex.slice(1, 3), 16);
  const G = parseInt(_hex.slice(3, 5), 16);
  const B = parseInt(_hex.slice(5, 7), 16);

  if (alpha !== undefined) return `rgba(${R},${G},${B},${alpha})`;

  return `rgb(${R},${G},${B})`;
}
