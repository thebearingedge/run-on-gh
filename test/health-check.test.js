require('dotenv/config')
const pg = require('pg')
const axios = require('axios')
const { expect } = require('chai')
const createApi = require('../api/create-api')
const connectToPostgres = require('../services/connect-to-postgres')

let db
let server

before(done => {
  (async () => {
    db = await connectToPostgres()
    const api = createApi({ db })
    server = api.listen(process.env.PORT, done)
  })()
})

after(done => {
  db.end()
    .then(() => server.close(done))
})

describe('/api/health-check', () => {

  context('when the server is working', () => {

    it('returns ok', async () => {
      const { status, data } = await axios.get('http://localhost:3000/api/health-check')
      expect(status).to.equal(200)
      expect(data).to.deep.equal({
        message: 'it works'
      })
    })

  })

})
