
const program = require('commander')
const pkg = require('../package.json')
const configure = require('../commands/configure')

program
  .version(pkg.version)
  .parse(process.argv)

program
  .command('consumer')
  .description('Add a Twitter API key and secret')
  .action(async () => {
    await configure.consumer(pkg.name)
  })


if(!process.argv.slice(2).length) {
  program.outputHelp()
}