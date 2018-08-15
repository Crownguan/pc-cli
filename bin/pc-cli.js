const program = require('commander')

program
  .version(require('../package.json').version)
  .usage('<commander> [options]')
  .command('init [filename]', 'create the project').alias('i')
  .command('update [filename]', 'update the project').alias('u')
  .command('cache [clean]', 'clean the cache').alias('c')
  .command('ignore [ls]', 'ignore the file').alias('ig')
  .command('ignore-add [category]', 'ignore adding the file').alias('ig-a')
  .command('ignore-rm [category]', 'ignore remove the file').alias('ig-r')
  .parse(process.argv)