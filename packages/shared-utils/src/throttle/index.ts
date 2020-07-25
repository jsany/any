import { TDecorator } from '../types/index';

export interface IThrottleProp {
  delay?: number;
}

export type TThrottle = (params: IThrottleProp) => TDecorator;

/**
 * @description 节流：（decorator）可装饰类内箭头函数
 * @param {object} params - 配置
 * @param {number} params.delay - 时间阀值（单位：ms），默认：delay=300
 * @returns {function} - 返回装饰器方法
 */
export const throttle: TThrottle = (params = {}) => {
  // reference：http://es6.ruanyifeng.com/#docs/decorator#%E6%96%B9%E6%B3%95%E7%9A%84%E4%BF%AE%E9%A5%B0
  return function (target, name, descriptor) {
    let [timer, startTime] = [0, Date.now()];
    const { delay = 300 } = params;

    // high order function
    if (!descriptor || (arguments.length === 1 && typeof target === 'function')) {
      return createThrottle(target);
    }

    function createThrottle(fn: Function) {
      return function throttle(this: any) {
        const [argumentsCopy, that, curTime] = [arguments, this, Date.now()];
        const remainimg = delay - (curTime - startTime);

        if (remainimg <= 0) {
          if (timer) {
            clearTimeout(timer);
          }
          fn.apply(that, argumentsCopy);
          startTime = Date.now();
        } else {
          timer = setTimeout(fn, remainimg);
        }
      };
    }

    // 修饰类内的箭头函数
    // https://tc39.es/proposal-class-public-fields/#runtime-semantics-class-public-field-definition-evaluation
    if (descriptor.initializer) {
      return {
        enumerable: false,
        configurable: true,
        get: function () {
          return createThrottle(descriptor.initializer!.call(this));
        }
      };
    }

    return descriptor;
  };
};
