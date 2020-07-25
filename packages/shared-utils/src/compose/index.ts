/**
 * Build functional pipeline.
 * const simple = compose(A,B,C,...)
 * simple(params)
 */

export type TPipe<T, U> = (...args: T[]) => U;

export const compose = <T>(...processors: Array<TPipe<any, T>>): TPipe<any, T> => {
  if (processors.length === 0) return (input: T) => input;
  if (processors.length === 1) return processors[0];
  return processors.reduce((prev, next) => {
    return (...args: any[]) => next(prev(...args));
  });
};
