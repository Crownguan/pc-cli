const download = require('download-git-repo')
const path = require('path')
const npmPrefix = require('npm-prefix')
const package = require('../../package.json')
const fs = require('fs')
const rimraf = require('rimraf')

module.exports = (data) => {
  let target = path.join(data.projectName || '.', '.')

  return new Promise((resolve, reject) => {
    let spinner = require('ora')('finance pc download...').start()

    try {
      let tmpCate = npmPrefix() + `/lib/node_modules/pc-cli/download/${package.version}`

      fs.stat(tmpCate, (err, stat) => {
        if (err) {
          fs.mkdirSync(tmpCate)
          downloadSource(tmpCate, spinner, data, resolve, reject)
        } else if (err == null && stat.isDirectory()) {
          rimraf(tmpCate, (err) => {
            fs.mkdirSync(tmpCate)
            downloadSource(tmpCate, spinner, data, resolve, reject)
          })
        } 
      })
    } catch (e) {
      spinner.stop()
      reject({
        message: `source download failure! ${e}`,
        state: false
      })
    }
  })
}

function downloadSource(tmpCate, spinner, data, resolve, reject) {
  try {
    download(package.download.url + '#' + data.versionName, tmpCate, { clone: true }, (err) => {
      spinner.stop()

      if (err) {
        reject({
          message: `please check version:${data.versionName},${err}`,
          state: false
        })
      } else {
        resolve({
          message: `source download success!`,
          state: true,
          data: {
            current: tmpCate,
            target: path.resolve('./', data.projectName)
          }
        })
      }
    })
  } catch (e) {
    reject({
      message: `please check version: ${data.versionName}, ${e}`,
      state: false
    })
  }
}
