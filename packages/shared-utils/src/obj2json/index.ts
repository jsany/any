import { TAnyObject } from '../types';

/**
 * 对象转字符串,保留 undefined,NaN,Infinity,-Infinity,function,symbol
 * @param obj
 */
export const obj2json = (obj: TAnyObject): string => {
  try {
    return JSON.stringify(obj, (key, value) => {
      if ([undefined, NaN, Infinity, -Infinity].includes(value) || typeof value === 'function') {
        return `{{{${value}}}}`;
      }
      if (typeof value === 'symbol') {
        value = value.toString();
        return `{{{${value}}}}`;
      }
      return value;
    })
      .replace(/"{{{/g, '')
      .replace(/}}}"/g, '');
  } catch (err) {
    throw new Error(err);
  }
};
