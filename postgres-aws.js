const { Pool } = require('pg')
const { RDS } = require('aws-sdk')
 
const signerOptions = {
  credentials: {
    accessKeyId: 'AKIAYATOX7F3UGCBPHEG',
    secretAccessKey: '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',
  },
  region: 'eu-central-1',
  hostname: 'bbdd-web.cx4edu1o24re.eu-central-1.rds.amazonaws.com',
  port: 5432,
  username: 'bbdd-web',
}
 
const signer = new RDS.Signer()
 
const getPassword = () => signer.getAuthToken(signerOptions)
 
const pool = new Pool({
  host: signerOptions.hostname,
  port: signerOptions.port,
  user: signerOptions.username,
  database: 'bbdd-web',
  password: getPassword,
})