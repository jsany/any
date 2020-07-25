import { TPropertyName, TAnyObject } from '../types/index';
type Many<T> = T | ReadonlyArray<T>;

// path的类型，可以是单个的name，也可以是他们的数组
type PropertyPath = Many<TPropertyName>;

// 一个name类型为number，值类型固定的对象，类似数组
interface NumberDictionary<T> {
  [index: number]: T;
}

function baseGet(object: TAnyObject, path: PropertyPath): any {
  if (!Array.isArray(path)) {
    if (typeof path === 'string') {
      path = path
        .replace(/\[([^\[|^\]]+)\]/g, '.$1')
        .split('.')
        .filter((item) => !['', null, undefined].includes(item));
    } else if (typeof path === 'number' || typeof path === 'symbol') {
      path = [path];
    }
  }
  let index = 0;
  const length = path.length;
  // 循环取path对象的属性值
  while (object != null && index < length) {
    object = object[path[index++]];
  }
  // 如果取到了最后一个元素，则返回该值，否则返回undefined
  return index && index === length ? object : undefined;
}

// object为null和undefined的情况
export function getProperty(object: null | undefined, path: PropertyPath): undefined;
export function getProperty<TDefault>(
  object: null | undefined,
  path: PropertyPath,
  defaultValue: TDefault
): TDefault;

// object为数组时的情况
export function getProperty<T>(object: NumberDictionary<T>, path: number): T;
export function getProperty<T>(
  object: NumberDictionary<T> | null | undefined,
  path: number
): T | undefined;
export function getProperty<T, TDefault>(
  object: NumberDictionary<T> | null | undefined,
  path: number,
  defaultValue: TDefault
): T | TDefault;

// object为对象的情况
// 当path的元素只有一个的时候
export function getProperty<TObject extends object, TKey extends keyof TObject>(
  object: TObject,
  path: TKey | [TKey]
): TObject[TKey];
export function getProperty<TObject extends object, TKey extends keyof TObject>(
  object: TObject | null | undefined,
  path: TKey | [TKey]
): TObject[TKey] | undefined;
export function getProperty<TObject extends object, TKey extends keyof TObject, TDefault>(
  object: TObject | null | undefined,
  path: TKey | [TKey],
  defaultValue: TDefault
): Exclude<TObject[TKey], undefined> | TDefault;
// 当传入默认值时，返回值可能是默认值TDefault，也可能是对象的值TObject[TKey]，
// 但TObject[TKey]一定不是undefined，所以这里这么写:
// Exclude<TObject[TKey], undefined> | TDefault

// 当path有2个元素的时候
export function getProperty<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1]
>(object: TObject | null | undefined, path: [TKey1, TKey2]): TObject[TKey1][TKey2] | undefined;
export function getProperty<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TDefault
>(
  object: TObject | null | undefined,
  path: [TKey1, TKey2],
  defaultValue: TDefault
): Exclude<TObject[TKey1][TKey2], undefined> | TDefault;

// 兜底类型
export function getProperty(object: any, path: PropertyPath, defaultValue?: any): any;

// 实现思路是先处理null和undefined的情况，然后循环取属性值，
// 如果值为undefined则返回默认值，否则返回取到的值
export function getProperty(object: any, path: PropertyPath, defaultValue?: any): any {
  //处理null 和undefined
  const result = object == null ? undefined : baseGet(object, path);
  //如果取到的值是undefined则返回默认值
  return result === undefined ? defaultValue : result;
}
