 //usr/bin/env node

const program = require('commander')

program
    .version(require('../package.json').version)
    .usage('<commander> [options]')
    .command('init [filename]', 'create the project').alias('i')
    .command('update [filename]', 'update the project').alias('u')
    .command('cache [clean]', 'clean the cache').alias('c')
    .command('ignore [ls]', 'ignore the files').alias('ig')
    .command('ignore-add [category]', 'ignore adding the files').alias('ig-a')
    .command('ignore-rm [category]', 'ignore rm the files').alias('ig-r')
    .parse(process.argv)