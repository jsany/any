import { getAllFiles } from '../src/getAllFiles'
import { info } from '../src/logger'

test('get all file list of one dir', () => {
  const arr = getAllFiles('/var/nodejs/verdaccio')
  info(JSON.stringify(arr).replace(/\,/g, ',\n'), 'file list:')
})
