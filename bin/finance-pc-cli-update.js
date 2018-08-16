const spinner = require('ora')().start()
const path = require('path')
const util   = require('./lib/util')
const main   = require('./lib/main')({ update: true })
const down   = require('./lib/down')
const rename = require('./lib/rename')

// tips for shell commander
spinner.info('tuhu finace pc-cli install...')
// node npm version check
util.log(util.checkVersion(), spinner)
// business para check
util.log(main, spinner)
down(main.data).then((res) => {
  util.log(res, spinner)
  rename(
    res.data.current,
    res.data.target, function (res) {
      util.log(res, spinner)
      util.log({
        message: `update project name : ${main.data.projectName} , and the start-kit version : ${main.data.versionName} `,
        state: true
      }, spinner)
    })
}).catch((res) => {
  util.log(res, spinner)
})
