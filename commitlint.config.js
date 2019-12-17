const fs = require('fs')
const path = require('path')

const jsanyPackages = fs.readdirSync(path.resolve(__dirname, 'packages/@any'))

module.exports = {
  extends: ['@commitlint/config-lerna-scopes'],
  rules: {
    // 'type-enum': [2, 'always', ['workflow']],
    // 'scope-enum': [
    //   2,
    //   'always',
    //   [
    //     'cli',
    //     ...jsanyPackages
    //   ].map(name => `$${name}`)
    // ]
  }
};
