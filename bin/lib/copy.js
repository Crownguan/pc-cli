const fs = require('fs')
const path = require('path')

/**
 * copy the src content to the target content 
 * @param {*} srcDir src category
 * @param {*} tarDir tag category
 * @param {*} cb the call back function
 */
var copyFolder = function (srcDir, tarDir, cb) {

    /* read src category */
    fs.readdir(srcDir, function (err, files) {

        var count = 0
        var checkEnd = function () {
            ++count == files.length && cb && cb({
                message: `the project is created successfully!`,
                state: true
            })
        }

        /* error break */
        if (err) {
            checkEnd({
                message: `copy error: + ${err}`,
                state: false
            })
            return
        }

        /* every file check*/
        files.forEach(function (file) {
            var srcPath = path.join(srcDir, file)
            var tarPath = path.join(tarDir, file)

            fs.stat(srcPath, function (err, stats) {
                if (stats.isDirectory()) {

                    fs.mkdir(tarPath, function (err) {
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
                        fs.copyFile(srcPath, tarPath, checkEnd)
                    }
                    catch (e) {
                        /* low version 8.5.0 bellow */
                        fs.createReadStream(srcPath).pipe(fs.createWriteStream(tarPath), checkEnd)
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

module.exports = function (srcDir, tarDir, cb) {

    /* check the target cate exist */
    if (fs.existsSync(tarDir) == false) {
        fs.mkdirSync(tarDir, 0755)
    }

    /* copy here */
    copyFolder(srcDir, tarDir, cb)
}