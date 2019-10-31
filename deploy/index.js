const { spawn } = require('child_process')
const upload = require('./upload')

module.exports = async function deploy() {
  const requiredEnvs = [
    'CARDANO_ERA',
    'CARDANO_NETWORK',
    'GRAPHQL_API_PROTOCOL',
    'GRAPHQL_API_HOST',
    'GRAPHQL_PORT',
    'GRAPHQL_WEBSOCKET_PROTOCOL',
    'GRAPHQL_WEBSOCKET_HOST',
  ]

  requiredEnvs.forEach(env => {
    const val = process.env[env]
    if (!val) {
      throw new Error(`Missing ${env} from the environment`)
    }

    console.log(`${env} = ${val}`)
  })

  const builder = spawn(`yarn`, ['static:build'], {
    stdio: ['inherit', 'inherit', 'inherit'],
    env: {
      PATH: process.env.PATH,
      ...process.env
    }
  })

  await new Promise((resolve, reject) => {
    builder.on('close', (code) => {
      if (code !== 0) {
        reject(new Error('Compilation failed'))
      }

      resolve()
    })
  })

  await upload()
}
