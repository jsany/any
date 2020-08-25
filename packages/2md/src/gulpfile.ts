import { src, dest } from 'gulp';
import concat from 'gulp-concat';
import through2 from 'through2';
import get2mdConfig from '@/helper/get2mdConfig';
import { join } from 'path';

export interface I2mdConfig {
  /* glob */
  src: string | string[];
}
interface ICodeConfig {
  title: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}
interface IData {
  codeConfig: ICodeConfig;
  codeStr: string;
}

const REG = new RegExp(/\/\*\*([^*/]+)\*\/([^]+)/g);

const str2Config = (str: string) => {
  const arr = str.split('\n');
  const config: any = {};
  // console.log(arr)
  arr.reduce((prev, next) => {
    const [key, value] = next.split(':');
    prev[key.trim()] = (value || '').trim();
    return prev;
  }, config);
  return config;
};

const getMergeStr = (arr: IData[], ext: string) => {
  return arr.reduce((prev, next) => {
    const { codeConfig, codeStr } = next;
    const mdTitle = '\n' + '#'.repeat(codeConfig.level) + ' ' + codeConfig.title + '\n\n';
    const mdCode = '```' + ext + '\n' + codeStr + '\n```\n';
    return prev + mdTitle + mdCode;
  }, '');
};

const compiler = () => {
  // const cwd = process.cwd()
  // console.info(cwd)
  const config = get2mdConfig();
  // console.info(config)
  const argv = require('minimist')(process.argv.slice(2));
  console.info(argv);
  const parttens = config.src.map((item) => join(argv.baseSrc, item));
  console.info(parttens);
  return src(parttens)
    .pipe(
      through2.obj(function (file, encoding, cb) {
        console.info(file.path);
        const ext = file.extname.replace(/^\./, '');
        const fileStr = file.contents.toString();

        console.info(fileStr);
        const dataArr: IData[] = [];
        fileStr.replace(REG, (_: string, p1: string, p2: string) => {
          const codeConfig = str2Config((p1 || '').trim());
          const codeStr = (p2 || '').trim();
          dataArr.push({ codeConfig, codeStr });
        });
        console.info(dataArr);
        const mergeStr = getMergeStr(dataArr, ext);
        file.contents = Buffer.from(mergeStr);
        cb(null, file);
      })
    )
    .pipe(concat(config.name))
    .pipe(dest(config.dest));
};

exports.compiler = compiler;
