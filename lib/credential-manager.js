const Configstore = require('configstore')
const keytar = require('keytar-prebuild')

class CredentialManager {
  constructor(name) {
    this.conf = new Configstore(name)
    this.service = name
  }

  async getKeyAndSecret() {
    let key = this.conf.get('apiKey')
    if (key) {
      // let secret = this.conf.get('apiSecret')
      let secret = await keytar.getPassword(this.service, key)
      return [key, secret]
    } else {
      let answer = await inquirer.prompt([{
          type: 'input',
          name: 'key',
          message: 'Enter your Twitter API key'
        },
        {
          type: 'password',
          name: 'secret',
          secret: 'Enter your Twitter API secret'
        },
      ])
      this.conf.set('apiKey', answer.key)
      // this.conf.set('apiSecret', answer.secret)
      await keytar.setPassword(this.service, answer.key, answer.secret)
      return [answer.key, answer.secret]
    }
  }
  async storeKeyAndSecret(key, secret) {
    this.conf.set('apiKey', key)
    await keytar.setPassword(this.service, key, secret)
  }
  async clearKeyAndSecret() {
    let key = this.conf.get('apiKey')
    this.conf.delete('apiKey')
    await keytar.deletePassword(this.service, key)
  }
}

module.exports = CredentialManager