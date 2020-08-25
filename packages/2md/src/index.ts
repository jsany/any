import { execSync } from 'child_process';
import { resolve } from 'path';

const gulpfilePath = resolve(__dirname, './gulpfile.js');
console.log(gulpfilePath);
execSync(`npx gulp compiler -f ${gulpfilePath} --baseSrc=${process.cwd()} `, { stdio: 'inherit' });
