/**
 * Type guard for the primitive types which will support printing
 * out of the box
 * */
export default function isPrimitive(value: any): value is PrimitiveType {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol'
  );
}
