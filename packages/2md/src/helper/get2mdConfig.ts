import { ALLOWED_CONFIG } from '../const/config';
import { resolve } from 'path';
import { existsSync } from 'fs';
import defaultConfig from '../template/.2mdrc';
export default (cwd?: string) => {
  if (!cwd) cwd = process.cwd();

  const config = { ...defaultConfig };
  for (const configName of ALLOWED_CONFIG) {
    const path = resolve(cwd, configName);
    if (existsSync(path)) {
      Object.assign(config, require(path));
      break;
    }
  }
  console.log(config);
  return config;
};
