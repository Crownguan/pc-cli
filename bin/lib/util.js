// system import
const cp = require('child_process')
const fs = require('fs')
const package = require('../../package.json')
const path = require('path')
const rimraf = require('rimraf')

// check the node and npm version
module.exports.checkVersion = function () {
  if (package.engines) {
    for (let i in package.engines) {
      let _versions = cp.execSync(i + ' --version').toString(),
          _versionNeeded = package.engines[i].match(/\d+\.\d+\.\d+/g)
      let _version = _versions.match(/\d+\.\d+\.\d+/g);
      if (_version && _versionNeeded) {
        let _ver = parseInt(_version[0].replace(/\./g, ''), 10)
        let _verNeeded = parseInt(_versionNeeded[0].replace(/\./g, ''), 10)
        if (_ver < _verNeeded) {
          return {
            state: true,
            message: i + ` version should upgrade to version : ${_versionNeeded[0]}`,
            warning: true
          }
        }
      }
    }
    return {
      state: true,
      message: ` node and npm version check successful!`,
    }
  }
  return {
    state: true,
    message: ` please check the node and npm version! `,
    warning: true
  }
}
// declare the log info action
module.exports.log = function (info, spinner) {
  if (!info.state) {
    spinner.fail(info.message)
    process.exit();
  }
  else if (info.warning)
    spinner.warn(info.message)
  else
    spinner.succeed(info.message)
}

// delete the category
module.exports.cleanDir = function (srcDir) {
  function _clean(srcDir) {
    if (fs.existsSync(srcDir)) {
      fs.readdirSync(srcDir).forEach(function (file) {
        // cur path find
        var curPath = srcDir + "/" + file
        if (fs.statSync(curPath).isDirectory()) {
          // recurse
          _clean(curPath)
        } else {
          // delete file
          fs.unlinkSync(curPath)
        }
      })
      fs.rmdirSync(srcDir);
    }
  }
}
// delete the category
function rmCmd(array, cb) {
  let _array = array.shift()
  // delete the category
  rimraf(_array, function (err) {
    if (err) {
      cb && cb({
        message: `delete error : ${err}!`,
        state: false
      })
    }
    array.length && rmCmd(array)
    if(!array.length){
      cb && cb({
        message: `delete successfully`,
        state: true
      })
    }
  })
}

module.exports.rmCmd = rmCmd
