// system import
const spinner = require('ora')().start()
const path = require('path')
// business import
const util = require('./lib/util')
const main = require('./lib/main')()
const down = require('./lib/down')
const copy = require('./lib/copy')

// tips for shell commander
spinner.info('tuhu finace pc-cli install...')
// node npm version check
util.log(util.checkVersion(), spinner)
// business para check
util.log(main, spinner)
// business package download
down(main.data).then((res) => {
  // tips for log
  util.log(res, spinner)
  // business package copy
  copy(
    res.data.current,
    res.data.target, function (res) {
      util.log(res, spinner)
      util.log({
        message: `create project name : ${main.data.projectName} , and the start-kit version : ${main.data.versionName} `,
        state: true
      }, spinner)
    })
}).catch((res) => {
  // tips for catch error
  util.log(res, spinner)
})
