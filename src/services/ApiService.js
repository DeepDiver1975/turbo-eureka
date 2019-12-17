import Sdk from 'owncloud-sdk'

export default class ApiService {
  constructor(config, token) {
    this.config = config
    this.token = token
  }

  async getFiles(){
    const client = new Sdk()

    client.init({
      baseUrl: this.config.server,
      auth: {
        bearer: this.token
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return client.files.list('/')
  }
}

