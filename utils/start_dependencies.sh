#!/bin/bash
API_PORT="${API_PORT:-3000}"
API_HOST="${API_HOST:-'localhost'}"
API_PROTOCOL="${API_PROTOCOL:-'http'}"

echo "Pulling most recent containers"
docker-compose pull

echo "Starting development containers"
API_PORT=$API_PORT docker-compose up -d

echo "Waiting for GraphQL server to be available..."
until $(curl --output /dev/null --silent --get ${API_PROTOCOL}://${API_HOST}:${API_PORT}); do
  sleep 5
done

echo "API now accepting connections"
echo "Generating most up to date typings from GraphQL"
SCHEMA_URI="${API_PROTOCOL}://${API_HOST}:${API_PORT}" npm run generate:graphql-typings

echo "GraphQL playground available: ${API_PROTOCOL}://${API_HOST}:${API_PORT}"
echo "Ready 🚀"

