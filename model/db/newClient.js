const { Client } = require('pg')
require('dotenv').config()

/**
 * create connection to SQL database
 * 1- define db parameters (user, port, password, ...)
 * 2- create a new connection using "new Client()" from pg library
 * 3- start the connection with the ".connect()" method from the new client
 */
const dbConnect = async (table) => {
  const newClient = new Client(chooseDb(table))
  newClient.connect()
  return newClient
}

const chooseDb = (table) => {
  if (table === 'paymentMethods') {
    return {
      host: PG_HOST_2,
      port: PG_PORT_2,
      user: PG_USER_2,
      password: PG_PASSWORD_2,
      database: PG_DATABASE_2,
      // ssl: { require: true, rejectUnauthorized: false },
    }
  }
  return {
    host: PG_HOST,
    port: PG_PORT,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    // ssl: { require: true, rejectUnauthorized: false },
  }
}

module.exports = dbConnect
