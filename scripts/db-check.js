#!/usr/bin/env node --unhandled-rejections=strict
require('dotenv/config')
const connectToPostgres = require('../services/connect-to-postgres')

;(async () => {
  const db = await connectToPostgres()
  await db.end()
})()
