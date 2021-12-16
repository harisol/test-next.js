/**
 * return true if param is:
 * - zero (number)
 * - empty string
 * - null
 * - undefined
 * - empty array
 * - empty object
 */
export const isEmpty = (thing: any): boolean => {
  if (!thing) return true;
  if (Array.isArray(thing)) {
    return thing.length === 0;
  }
  return Object.keys(thing).length === 0 &&
    Object.getPrototypeOf(thing) === Object.prototype
  ;
}
