/**
 * opt is an object instance
 * option is an para in commander, format
 * @param {*} opt
 */

const program = require('commander')
const fs = require('fs')
const glob = require('glob')
const path = require('path')

let mainEntry = function(opt) {
  Object.assign(this, opt)
  return this.init()
}

mainEntry.prototype = {
  constructor: mainEntry,
  init: function () {
    // init commander
    program.usage('<project-name> (please input the project name)').parse(process.argv)
    let projectName = this.getProjectName(program)
    // check project name
    if (!projectName) {
      return {
        message: 'please input the project name',
        state: false,
        callback: program.argv
      }
    }
    if (!this.update && this.checkProjectName(projectName)) {
      return {
        message: `the category of " ${projectName} " does exist , please change another name and try again`,
        state: false
      }
    }
    if (this.update && !this.checkProjectName(projectName)) {
      return {
        message: `the category of " ${projectName} " does not exist , please check the project name and try again`,
        state: false
      }
    }
    let versionName = this.getVersionName(program)
    return this.update ? {
      message: `the start kit's project of " ${projectName} "  checking is successful !`,
      state: true,
      data: {
        projectName,
        versionName
      }
    } : {
          message: `the start kit's project of " ${projectName} "  checking is successful !`,
          state: true,
          data: {
            projectName,
            versionName
          }
        }
  },
  getOption: function () {
    if (!this.option) return
  },
  getProjectName: function () { // return project name
    let projectName = program && typeof program.args == 'object' && program.args.length ? program.args[0] : ''
    if (projectName.length && projectName.match(/@\d+\.?\d+\.?\d+\.?/)) {
      projectName = projectName.replace(/@\d+\.?\d+\.?\d+\.?/g, '')
    }
    return projectName
  },
  getVersionName: function (version) {
    let projectName = program && typeof program.args == 'object' && program.args.length ? program.args[0] : ''
    if (projectName.length && projectName.match(/\d+\.?\d+\.?\d+\.?/)) {
      return projectName.match(/\d+\.?\d+\.?\d+\.?/)[0]
    }
    return 'master'
  },
  checkProjectName: function (projectName) {
    const category = glob.sync('*')
    return category.length && category.filter(name => {
      return fs.statSync(name).isDirectory() && name.toLocaleLowerCase() === projectName.toLocaleLowerCase()
    }).length
  },
}

module.exports = function (opt) {
  return new mainEntry(opt)
}
