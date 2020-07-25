/**
 * 自定义常用 ts 类型
 */

// 对象的索引类型，只有三种，string、number、symbol
export type TPropertyName = string | number | symbol;

export type TAnyObject = Record<TPropertyName, any>;

// 根据参数获取元组：
// tuple('a','b') => ['a','b']
// tupleNum(1,2,3) => [1,2,3]
export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNum = <T extends number[]>(...args: T) => args;

// 从 T 中选出值类型是 V 的属性，并把这些属性联合起来
// interface A {a: string; b: boolean; c: number; d: number}
// TPickOption<A, number> => 'c'|'d'
export type TPickOption<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

// 从 T 中剔除值类型是 U 的属性
// interface A {a: string; b: boolean; c: number; d: number}
// OmitType<A, number> => {a: string; b: boolean;}
export type OmitType<T, U> = Pick<T, { [K in keyof T]: T[K] extends U ? never : K }[keyof T]>;

// 装饰器类型

type TTarget = any;

type TPropName = string | number | symbol;

type TDescriptor = PropertyDescriptor & ThisType<any> & { initializer?: Function };

export type TDecorator = (
  target: TTarget,
  name?: TPropName,
  descriptor?: TDescriptor
) => TDescriptor | Function;
