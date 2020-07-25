export type TOrdinalSuffixOf = (i: number, lower: boolean) => string;
/**
 * @description 格式化名次：在数字后面加上st/nd/rd/th
 * @param {number} i - 数字
 * @param {bool} lower - 是否小写,默认:是
 * @returns {string} -返回格式化后的名次
 */
export const ordinalSuffixOf: TOrdinalSuffixOf = (i, lower = true) => {
  let [j, k, res] = [i % 10, i % 100, 'th'];
  if (j == 1 && k != 11) {
    res = 'st';
  }
  if (j == 2 && k != 12) {
    res = 'nd';
  }
  if (j == 3 && k != 13) {
    res = 'rd';
  }
  return i + (lower ? res : res.toLocaleUpperCase());
};
