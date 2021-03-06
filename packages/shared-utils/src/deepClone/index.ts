import { BaseError } from '../baseError';
import { getRawType, isFunction } from '../getType';
import { TAnyObject } from '../types/index';

export type TTarget = TAnyObject;
export type TDeepClone = (target: TTarget) => TTarget;
/**
 * @description 深拷贝，考虑循环引用
 * @param {(object|array)} target - 要深拷贝的目标
 * @returns {(object|array)} - 返回 深拷贝
 */
export const deepClone: TDeepClone = (target) => {
  // 如果是json格式,调用原生JSON方法,
  // NOTES: 会忽略函数、symbol等属性,弃用
  // if (JSON.stringify(target)) {
  //   return JSON.parse(JSON.stringify(target));
  // }
  const limitTypes = ['Object', 'Array'];
  const dataType = getRawType(target);
  if (!limitTypes.includes(dataType))
    throw new BaseError('params invalid: it must one of ["Object, "Array]');

  const wm = new WeakMap();

  const _clone = (originObj: TTarget): TTarget => {
    const existObj = wm.get(originObj);
    if (existObj) return existObj;

    const newObj: TTarget = getRawType(originObj) === 'Array' ? [] : {};
    wm.set(originObj, newObj);
    return Object.entries(originObj).reduce((prve, next) => {
      const [key, value] = next;
      const originType = isFunction(value) ? 'Function' : getRawType(value);
      switch (originType) {
        case 'Array':
          prve[key] = [...value];
          break;
        case 'Object':
          prve[key] = _clone(value);
          break;
        case 'Date':
          prve[key] = new Date(value.getTime());
          break;
        case 'Function':
          // console.log('key:::', key);
          // console.log('value:::', value.toString());
          // prve[key] = eval(value.toString())
          prve[key] = new Function(`return ${value.toString()};`)();
          break;
        default:
          prve[key] = value;
      }
      return prve;
    }, newObj);
  };
  const duplicate = _clone(target);
  return duplicate;
};
