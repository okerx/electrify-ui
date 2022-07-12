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
