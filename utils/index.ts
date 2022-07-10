/**
 * helper to get an array containing the object values with
 * the correct type inferred.
 * */
export function objectValues<T extends {}>(obj: T) {
  return Object.keys(obj).map(objKey => obj[objKey as keyof T]);
}
export function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map(objKey => objKey as keyof T);
}

/**
 * Type guard for the primitive types which will support printing
 * out of the box
 * */
export function isPrimitive(value: any): value is PrimitiveType {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol'
  );
}
