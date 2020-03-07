const inquirer = require('inquirer')
const execa = require('execa')
const chalk = require('chalk')

const fs = require('fs')
const path = require('path')

;(async () => {
  const versions = ['major', 'minor', 'patch']

  const { publishType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'publishType',
      message: '选择要发布版本的类型',
      choices: [
        { name: '不发布版本', value: 'no' },
        ...versions.reverse().map(v => ({ name: v, value: v }))
      ],
      default: 'no'
    }
  ])

  if (publishType === 'no') {
    await pushToRemote()
    return
  }

  // 更新脚本版本
  const scriptPath = path.resolve(__dirname, '../src/myself.user.js')
  let content = fs.readFileSync(scriptPath, 'utf-8')
  let newVersions
  content = content.replace(/(\/\/\s*@version\s*)(\d\.\d\.\d)/, (m, g1, g2) => {
    const v = g2.split('.')
    let i = versions.indexOf(publishType)
    v[i] = +v[i] + 1
    for (i = i + 1; i < v.length; i++) {
      v[i] = 0
    }
    return g1 + (newVersions = v.join('.'))
  })
  fs.writeFileSync(scriptPath, content)

  // 提交修改后的代码
  console.log(chalk.cyanBright('版本号修订中...'))
  await execa('git', ['add', '.'])
  await execa('git', ['commit', '-m', `release: 脚本发布v${newVersions}`])
  await execa('npm', ['version', publishType])
  console.log(chalk.greenBright('版本号更新完成'))
  pushToRemote()
})()

async function pushToRemote () {
  console.log(chalk.cyanBright('正在将代码推送到远程...'))
  await execa('git', ['push', '--no-verify'])
  console.log(chalk.green('代码推送成功'))
}
