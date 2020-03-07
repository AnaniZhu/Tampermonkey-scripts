const chalk = require('chalk')
const fs = require('fs')
const commitMsg = fs.readFileSync(process.env.HUSKY_GIT_PARAMS, 'utf-8')
const commitPattern = /^(feat|fix|docs|style|refactor|chore|release):\s[\s\S]+$/g
const versionPattern = /^\s*\d\.\d\.\d\s*$/

if (!commitPattern.test(commitMsg) && !versionPattern.test(commitMsg)) {
  console.error(
    `\n  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(' sorry, its a invalid commit message format.')}\n\n` +
    chalk.red(' please see under examples:\n\n') +
    `     👉  commit message: ${chalk.green('feat: 新增xx功能')}\n`
  )
  process.exit(1)
}
