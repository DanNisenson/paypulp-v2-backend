const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager')

const test = async () => {
  const config = {
    credentials: {
      accessKeyId: 'Dan',
      secretAccessKey: 'Grupo2PT!',
    },
    region: 'eu-central-1a',
  }

  const input = {
    SecretId: 'rds!db-c01da06c-868e-4f87-9a20-907f86119d8f',
  }

  const client = new SecretsManagerClient(config)
  const command = new GetSecretValueCommand(input)
  const response = await client.send(command)

  console.log('ok', response)
}

test()
