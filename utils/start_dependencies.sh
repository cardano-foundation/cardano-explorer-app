#!/bin/bash
API_PORT="${API_PORT:-3100}"
API_HOST="${API_HOST:-localhost}"
API_PROTOCOL="${API_PROTOCOL:-http}"

echo "Starting development containers"
API_PORT=$API_PORT docker-compose up -d

echo "Waiting for GraphQL server to be available..."
until $(curl --output /dev/null --silent --get ${API_PROTOCOL}://${API_HOST}:${API_PORT}); do
  sleep 5
done

echo "API now accepting connections"
echo "Generating TypeScript definition from GraphQL server"
SCHEMA_URI="${API_PROTOCOL}://${API_HOST}:${API_PORT}" yarn generate:graphql-typings

echo "Generating local copy of GraphQL schema for development tooling"
SCHEMA_URI="${API_PROTOCOL}://${API_HOST}:${API_PORT}" yarn generate:graphql-schema-reference

echo "GraphQL playground available: ${API_PROTOCOL}://${API_HOST}:${API_PORT}"
echo "Ready 🚀"
docker-compose logs -f

