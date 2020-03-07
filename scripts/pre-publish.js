const chalk = require('chalk')

console.error('\n' + chalk.bgYellow.black(' WARN ') + chalk.yellow(' 请使用 yarn push 代理 git push\n'))
process.exit(1)
