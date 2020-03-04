require('dotenv/config')
const pg = require('pg')
const createApi = require('api/create-api')

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

const api = createApi({ db })

api.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT)
})
