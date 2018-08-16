const spinner = require('ora')('pc-cli cache clean...')
const npmPrefix = require('npm-prefix')
const util = require('./lib/util')
const program = require('commander')
const rimraf = require('rimraf')
const package = require('../package.json')

// tip for shell commander
spinner.start()
// init commander
program.usage('<project-name> (please input the project name)').parse(process.argv)
// para getting and judge
let para = program && typeof program.args == 'object' &&
  program.args.length ?
  program.args[0] :
  null
if (!para) {
  util.log({
    message: 'please input the cache type',
    state: false
  }, spinner)
  return
}
else if (para != 'clean') {
  util.log({
    message: `the cache type '${para}' is not allowed!`,
    state: false
  }, spinner)
  return
}
// cache clean here
rimraf(npmPrefix() + `/lib/node_modules/tuhu-h5-cli/download/${package.version}`, function (err) {
  spinner.stop()
  if (err)
    util.log({
      message: `the cache clean error : '${err}' `,
      state: false
    }, spinner)
  else
    util.log({
      message: `the cache clean successful !`,
      state: true
    }, spinner)
})
