import { getRawType } from '../getType';
type TNoArray<T> = T extends [] ? never : T;

/**
 * 平铺多维数组
 */
export type TFlatten = <T>(arr: any[]) => TNoArray<T>[];

export const flatten: TFlatten = (arr) => {
  const flatArr: any[] = [];
  // 统计递归次数
  let count = 0;
  const iteratorFn = (array: any[]) => {
    const iterator = array[Symbol.iterator]();

    while (true) {
      const obj = iterator.next();
      if (obj.done) {
        break;
      }
      // 防止 循环引用，引起爆栈
      if (getRawType(obj.value) === 'Array' && count < 5000) {
        iteratorFn(obj.value);
      } else {
        flatArr.push(obj.value);
      }
    }
    count++;
  };
  iteratorFn(arr);
  console.log(count);
  return flatArr;
};
