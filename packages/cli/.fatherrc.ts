import { IBundleOptions } from 'father-build/src/types';

const options: IBundleOptions = {
  disableTypeCheck: true
  // extraBabelPlugins: [
  //   ['transform-remove-console', { exclude: ['error', 'warn'] }],
  //   [
  //     'module-resolver',
  //     {
  //       root: ['.'],
  //       alias: {
  //         '@': './src',
  //         '@~': './'
  //       }
  //     }
  //   ]
  // ]
};
export default options;
