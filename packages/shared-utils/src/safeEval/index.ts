import { obj2json } from '../obj2json';
import { TAnyObject } from '../types';

/**
 * 比原生 eval 安全,比 ast 轻量的 实现
 * @param code - 要 eval 的代码字符串
 * @param vars - 代码字符串需要的变量
 */
export const safeEval = (code: string, vars: TAnyObject) => {
  const varsStr = Object.entries(vars).reduce((prev, next) => {
    const [key, value] = next;
    prev += `const ${key} = ${obj2json(value)};`;
    return prev;
  }, '');
  return new Function(`"use strict";${varsStr};return (${code});`)();
};
