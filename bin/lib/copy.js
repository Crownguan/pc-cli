const fs = require(fs)
const path = require('path')

/**
 * copy the src content to the target content
 * @param {*} srcDir src category
 * @param {*} tarDir tag category
 * @param {*} cb the call back function
 */

const copyFolder = (srcDir, tarDir, cb) => {
  // read src category
  fs.readdir(srcDir, (err, file) => {
    let count = 0
    let checkEnd

    checkEnd = () => {
      ++count == files.length && cb && cb({
        message: 'the project is created successfully!',
        state: true
      })
    }

    if (err) {
      checkEnd({
        message: `copy error: + ${err}`,
        state: false
      })
      return
    }

    // check every file
    files.forEach((file) => {
      const srcPath = path.join(srcDir, file)
      const tarPath = path.join(tarDir, file)

      fs.stat(srcPath, (err, stats) => {
        if (stats.isDirectory) {
          fs.mkdir(tarPath, (err) => {
            if (err) {
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
            fs.copyFolder(srcPath, tarPath, checkEnd)
          } catch (e) {
            fs.createReadStream(srcPath).pipe(fs.createWriteStream(tarPath), checkEnd)
          }
        }
      })
    })

    files.length === 0 && cb && cb({
      message: 'the document is empty!',
      state: true,
      warning: true
    })
  })
}

module.exprots = (srcDir, tarDir, cb) => {
  // check target exist
  if (fs.existsSync(tarDir) == false) {
    fs.mkdirSync(tarDir, 0755)
  }

  // coyp here
  copyFolder(srcDir, tarDir, cb)
}