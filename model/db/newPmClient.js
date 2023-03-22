const { Client } = require("pg");
require("dotenv").config();

/**
 * create connection to SQL database
 * 1- define db parameters (user, port, password, ...)
 * 2- create a new connection using "new Client()" from pg library
 * 3- start the connection with the ".connect()" method from the new client
 */
const dbPmConnect = async () => {
  const connectionData = {
    host: process.env.PG_HOST_2,
    port: process.env.PG_PORT_2,
    user: process.env.PG_USER_2,
    password: awsSecret(),
    database: process.env.PG_DATABASE_2,
  };
  const newClient = new Client(connectionData);
  newClient.connect();
  return newClient;
};

const awsSecret = async () => {
  const config = {
    credentials: {
      accessKeyId: process.env.DB_ACCESS_KEY_ID,
      secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
    },
    region: 'eu-central-1a',
  }

  const input = {
    SecretId: process.env.DB_SECRET_ID_2,
  }

  const client = new SecretsManagerClient(config)
  const command = new GetSecretValueCommand(input)
  const response = await client.send(command)

  return response
}

module.exports = dbPmConnect;
