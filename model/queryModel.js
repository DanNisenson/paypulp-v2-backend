const dbConnect = require('./newClient')
const minify = require('pg-minify')
const camelize = require('camelize')
const { snakizeString } = require('../helpers/casing')
const snakeize = require('snakeize')

class QueryModel {
  static async selectBy(table, column, value) {
    const client = await dbConnect()

    const tbl = snakizeString(table)
    const col = snakizeString(column)
    const val = snakizeString(value)

    const query = `SELECT * FROM ${tbl}
        WHERE ${col} = ($1)`

    try {
      const { rows } = await client.query(minify(query), [val])

      if (rows.length === 0) return

      const instance = this.castData(rows[0])

      return Object.assign({}, instance)
    } catch (err) {
      console.error('Error executing query:', err)
      throw new Error('Error retrieving users from database')
    } finally {
      client.end()
    }
  }

  static async insertData(table, newDataObject) {
    const client = await dbConnect()

    const tbl = snakizeString(table)
    const keys = Object.keys(snakeize(newDataObject)).toString()
    const values = Object.values(newDataObject)

    const query = `INSERT INTO ${tbl} (${keys}) 
      VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9)) 
      RETURNING *`

    try {
      const { rows } = await client.query(minify(query), values)

      const instance = this.castData(rows[0])

      return instance
    } catch (err) {
      console.error('Error executing query:', err)
      throw new Error('Error inserting personal info in database')
    } finally {
      client.end()
    }
  }

  static castData(data) {
    const dt = camelize(data)
    return new constructor(dt)
  }
}

module.exports = QueryModel
