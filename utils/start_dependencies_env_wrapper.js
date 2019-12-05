require('dotenv').config()
const { spawn } = require('child_process')

const {
  GRAPHQL_API_HOST,
  GRAPHQL_API_PATH,
  GRAPHQL_API_PROTOCOL,
  GRAPHQL_API_PORT
} = process.env;

const proc = spawn('sh', ['utils/start_dependencies.sh'], {
  env: {
    ...process.env,
    API_HOST: GRAPHQL_API_HOST,
    API_PATH: GRAPHQL_API_PATH,
    API_PROTOCOL: GRAPHQL_API_PROTOCOL,
    API_PORT: GRAPHQL_API_PORT,
  },
});

proc.stdout.on('data', (data) => {
  console.log(data.toString())
});

proc.stderr.on('data', (data) => {
  console.error(data.toString());
});

proc.on('exit', (code) => {
  process.exit(code)
});