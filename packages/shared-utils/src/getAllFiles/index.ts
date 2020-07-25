import { $info, $error } from '../logger';
import { isAbsolute, resolve, dirname } from 'path';
import { existsSync, lstatSync } from 'fs';
import * as globby from 'globby';

export const getAllFiles = (fileDir: string, option?: globby.GlobbyOptions) => {
  $info(fileDir, 'fileDir:');
  let absoluteDir = fileDir;
  if (!existsSync(absoluteDir)) {
    $error(`no such file or directory: ${absoluteDir}`, 'absoluteDir');
    process.exit(0);
  }
  if (!isAbsolute(fileDir)) {
    absoluteDir = resolve(process.cwd(), fileDir);
  }
  $info(absoluteDir, 'absoluteDir:');
  const fileList = [];
  if (lstatSync(absoluteDir).isFile()) {
    const relativeDir = absoluteDir.replace(dirname(absoluteDir), '');
    fileList.push({ absolute: absoluteDir, relative: relativeDir });
  } else {
    globby
      .sync(absoluteDir + '/**/*', {
        expandDirectories: true,
        gitignore: false,
        dot: false,
        ...option
      })
      .forEach((item) => {
        fileList.push({ absolute: item, relative: item.replace(absoluteDir, '') });
      });
  }
  return fileList;
};
