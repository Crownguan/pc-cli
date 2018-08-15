const fs = require('fs')
const path = require('path')
const array = JSON.parse(fs.readFileSync(path.join(__dirname, '../../.pc-clirc')).toString()).ignore

let copyFolder = function (srcDir, tarDir, cb) {
  // read src category
  fs.readdir(srcDir, function (err, files) {
    let count = 0
    let checkEnd = function () {
      ++count == files.length && cb && cb({
        message: `the project is updated successfully!`,
        state: true
      })
    }
    // error break
    if (err) {
      checkEnd({
        message: `copy error: + ${err}`,
        state: false 
      })
      return
    }
    // every file check
    files.forEach(() => {
      const srcPath = path.join(srcDir, file)
      const tarPath = path.join(tarDir, file)
      fs.stat(srcPath, (err, stats) => {
        if (stats.isDirectory() && !array.filter(name => srcPath.indexOf(name) > -1).length) {
          fs.mkdir(tarPath, function (err) {
            if (err && err.message.indexOf('already exists') == -1) {
              cb && cb({
                message: `copy error: + ${err}`,
                state: false
              })
              return
            }
            copyFolder(srcPath, tarPath, checkEnd)
          })
        } else {
          try {
            // fs.copyFile(srcPath, tarPath, checkEnd)
            fs.rename(srcPath, tarPath, checkEnd)
          }
          catch (e) {
            /* low version 8.5.0 bellow */
            cb && cb({
                message: `copy error: + ${err}`,
                state: false
            })
            return
          }
        }
      })
    })
    //return when empty
    files.length === 0 && cb && cb({
      message: `the document is empty!`,
      state: true,
      warning: true
    })
  })
}

module.exports = (srcDir, tarDir, cb) => {
  // check the target cate exist
  if (fs.existsSync(tarDir) == false) {
    fs.mkdirSync(tarDir, 0755)
  }
  // copy here
  copyFolder(srcDir, tarDir, cb)
}
