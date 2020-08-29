import { obj2json } from '../obj2json';
import { TAnyObject } from '../types';

/**
 * 比原生 eval 安全,比 ast 轻量的 实现
 * @param returnCode - 要 eval 后返回的结果
 * @param vars - 代码字符串需要的变量
 * @param expression - 表达式
 */
export const safeEval = (returnCode: string, vars: TAnyObject, expression?: string) => {
  const varsStr = Object.entries(vars).reduce((prev, next) => {
    const [key, value] = next;
    prev += `const ${key} = ${obj2json(value)};`;
    return prev;
  }, '');
  return new Function(
    `"use strict";${varsStr};${expression ? expression : ''};return (${returnCode});`
  )();
};
