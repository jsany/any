/**
 * 集中式错误工厂
 * Error 扩展
 */
export class BaseError extends Error {
  public constructor(message?: string) {
    super(message);
    this.name = new.target.name;

    if (typeof Object.setPrototypeOf === 'function') {
      // es6+
      Object.setPrototypeOf(this, new.target.prototype);
    } else if (typeof (Error as any).captureStackTrace === 'function') {
      // v8 引擎暴露的 api，nodejs 可用
      // https://devdocs.io/node/errors#errors_class_error
      (Error as any).captureStackTrace(this, new.target);
    } else {
      // es5
      // eslint-disable-next-line no-proto
      (this as any).__proto__ = new.target.prototype;
    }
  }
}

/**
 * node 程序抛出的错误
 */
export class NodeError extends BaseError {
  public status?: number;
  public statusText?: string | { [prop: string]: any };
  public data?: string | { [prop: string]: any };
}

/**
 * 请求抛出的错误
 */
export class ResError extends BaseError {
  public status?: number;
  public statusText?: string | { [prop: string]: any };
  public data?: string | { [prop: string]: any };
  public config?: string | { [prop: string]: any };

  /* 其他自定义属性，例如 issues、api、be */
  [prop: string]: any;
}

/**
 * 其他错误
 */
export class UnhandleError extends BaseError {}
