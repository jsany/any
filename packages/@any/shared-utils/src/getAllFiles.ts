import { info, error } from './logger'
import { exit } from './exit'
import * as path from 'path'
import * as fs from 'fs-extra'
import * as globby from 'globby'

export const getAllFiles = (fileDir: string) => {
  info(fileDir, 'fileDir:')
  let absoluteDir = fileDir
  if (!fs.existsSync(absoluteDir)) {
    error(`no such file or directory: ${absoluteDir}`, 'absoluteDir')
    exit(0)
  }
  if (!path.isAbsolute(fileDir)) {
    absoluteDir = path.resolve(process.cwd(), fileDir)
  }
  info(absoluteDir, 'absoluteDir:')
  const fileList = []
  if (fs.lstatSync(absoluteDir).isFile()) {
    const relativeDir = absoluteDir.replace(path.dirname(absoluteDir), '')
    fileList.push({ absolute: absoluteDir, relative: relativeDir })
  } else {
    // const findFile = (dir: string) => {
    //   if (fs.lstatSync(dir).isDirectory()) {
    //     const dirs = fs.readdirSync(dir)
    //     dirs.forEach(d => {
    //       findFile(`${dir}/${d}`)
    //     })
    //   } else {
    //     fileList.push({ absolute: dir, relative: dir.replace(path.dirname(dir), '') })
    //   }
    // }
    // findFile(absoluteDir)

    globby.sync(absoluteDir + '/**/(*.*|.*|*)', { expandDirectories: true }).forEach(item => {
      fileList.push({ absolute: item, relative: item.replace(path.dirname(item), '') })
    })
  }
  return fileList
}
