import { TAnyObject } from '../types/index';
export type TQsStringify = (obj: TAnyObject, encode: boolean) => string | '';

/**
 * @description url query json对象转参数字符串
 * @param {object} obj - json对象
 * @param {bool} encode - 是否进行encode编码，默认false
 * @returns {string} - 返回 参数字符串
 */
export const qsStringify: TQsStringify = (obj = {}, encode = false) => {
  const str = Object.entries(obj).reduce((prev, next) => {
    let [key, value] = next;
    if (typeof value === 'object') {
      // NOTE: 如果 value 对象含有 NaN、Infinity、symbol、func等会转化成 null
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
      value = JSON.stringify(value);
    }

    if (prev) {
      prev += '&';
    }
    return `${prev}${key}=${value}`;
  }, '');
  return encode ? encodeURIComponent(str) : str;
};
