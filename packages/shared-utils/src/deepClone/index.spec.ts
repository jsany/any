import { deepClone } from './index';
import { TAnyObject } from '../types/index';

const origin = {
  a: 0,
  b: '1',
  c: {
    1: NaN,
    2: undefined,
    3: null,
    4: Symbol('aa')
  },
  d: () => {
    console.log('ddd');
  },
  e: new Date(),
  f: [1, 2, 3]
};

const beEqual = (obj1: TAnyObject, obj2: TAnyObject, done: jest.DoneCallback) => {
  expect(obj1.a).toBe(obj2.a);
  expect(obj1.b).toBe(obj2.b);
  expect(String(obj1.c[1])).toBe(String(obj2.c[1]));
  expect(obj1.c[2]).toBe(obj2.c[2]);
  expect(obj1.c[3]).toBe(obj2.c[3]);
  expect(String(obj1.c[4])).toBe(String(obj2.c[4]));
  expect(obj1.d.toString()).toBe(obj2.d.toString());
  expect(obj1.e.getTime()).toBe(obj2.e.getTime());
  expect(obj1.f.toString()).toBe(obj2.f.toString());
  done();
};

describe('deepClone', () => {
  it('Object it shoule be pass', (done) => {
    const duplicate = deepClone(origin);
    // console.log(duplicate);
    // console.log(origin);
    beEqual(origin, duplicate, done);
  });
  it('Array it shoule be pass', (done) => {
    const duplicate = deepClone([origin]);
    // console.log(duplicate);
    // console.log(origin);
    beEqual(origin, duplicate[0], done);
  });
});
