/**
  - title: baseError
  - level: 4
 */

import { BaseError, NodeError, ResError } from '@jsany/shared-utils';

class MyError extends BaseError {}

try {
  throw new MyError('my error');
} catch (err) {
  console.log(err);
}

try {
  throw new NodeError('node error');
} catch (err) {
  console.log(err);
}

try {
  throw new ResError('respose error');
} catch (err) {
  console.log(err);
}
