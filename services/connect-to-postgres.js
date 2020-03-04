const pg = require('pg')
const retry = require('promise-retry')

module.exports = function connectToPostgres() {
  return retry(async retry => {
    const db = new pg.Pool({
      connectionString: process.env.DATABASE_URL
    })
    try {
      await db.query('select 1')
      return db
    } catch (err) {
      if (err.code === 'ETIMEDOUT') throw err
      return retry(err)
    }
  }, { retries: 5 })
}
