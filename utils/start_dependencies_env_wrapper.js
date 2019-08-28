require('dotenv').config({ path: '.env.local' })
const { spawn } = require('child_process')

const {
  GRAPHQL_API_PROTOCOL,
  GRAPHQL_API_HOST,
  GRAPHQL_PORT
} = process.env

const proc = spawn('sh', ['utils/start_dependencies.sh'], {
  env: {
    ...process.env,
    API_PORT: GRAPHQL_PORT,
    API_HOST: GRAPHQL_API_HOST,
    API_PROTOCOL: GRAPHQL_API_PROTOCOL,
  },
})

proc.stdout.on('data', (data) => {
  console.log(data.toString())
});

proc.stderr.on('data', (data) => {
  console.error(data.toString());
})

proc.on('exit', (code) => {
  process.exit(code)
})
