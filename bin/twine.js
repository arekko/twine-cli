#! /usr/bin/env node 

const program = require('commander')
const pkg = require('../package.json')


program
  .version(pkg.version)
  .command('configure', 'configure Twitter-related credentials')
  .parse(process.argv)
















// async function main() {
//   const creds = new CredentialManager('twine')
//   let [key, secret] = await creds.getKeyAndSecret()

//   console.log(key, secret)
// }


// main().catch(console.error)