const spinner   = require('ora')('tuhu-h5-cli ignore file list...')
const program   = require('commander')
const fs        = require('fs')
const util      = require('./lib/util')
const path      = require('path')

// tips for shell commander
spinner.start()
// init commander
program.usage('<project-name> (please input the project name)').parse(process.argv)
let para = program && typeof program.args == 'object' && program.args.length ? program.args[0] : null
if (!para) {
  util.log({
    message: 'please input the ignore category about adding',
    state: false
  }, spinner)
  return
}
/* cache clean here */
try {
  let json = JSON.parse(fs.readFileSync(path.join(__dirname, '../.tuhu-h5rc')).toString())
  json.ignore.push(para)
  fs.writeFileSync(path.join(__dirname, '../.tuhu-h5rc'), JSON.stringify(json))
  util.log({
    message: `ignore file adding successfully '${json.ignore.join('   ')}'`,
    state: true
  }, spinner)
}
catch (e) {
  util.log({
    message: `.tuhu-h5rc adding error: '${e}' `,
    state: false
  }, spinner)
}
