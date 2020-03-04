const express = require('express')

module.exports = function createApi({ db }) {
  return express()
    .get('/api/health-check', (req, res, next) => {
      db.query('select 1')
        .then(() => res.json({ message: 'it works' }))
        .catch(err => next(err))
    })
    .use((err, req, res, next) => {
      console.error(err)
      res.status(500).json({ message: 'it does not work' })
    })
}
