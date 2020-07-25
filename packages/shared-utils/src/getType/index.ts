/**
 * Get the raw type string of a value e.g. [object Object]
 */

const _toString = Object.prototype.toString;
const isOfType = (type: string) => (x: any) => typeof x === type;

export const getRawType = (x: any) => _toString.call(x).slice(8, -1);
const isObjectOfType = (type: string) => (x: string) => getRawType(x) === type;

export const isFunction = isOfType('function');
export const isString = isOfType('string');
export const isBoolean = isOfType('boolean');
export const isPlainObject = isObjectOfType('Object');
export const isUndefined = isOfType('undefined');
export const isNull = (x: any) => x === null;
export const isNullOrUndefined = (x: any) => isUndefined(x) || isNull(x);
