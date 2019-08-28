#!/bin/bash
API_PORT="${API_PORT:-3000}"

echo "Pulling most recent containers"
docker-compose pull

echo "Starting development containers"
API_PORT=$API_PORT docker-compose up -d

echo "Waiting for GraphQL server to be available..."
until $(curl --output /dev/null --silent --get http://localhost:${API_PORT}); do
  sleep 5
done

echo "API now accepting connections"
echo "Generating most up to date typings from GraphQL"
SCHEMA_URI="http://localhost:${API_PORT}" npm run generate:graphql-typings

echo "GraphQL playground available: http://localhost:${API_PORT}"
echo "Ready 🚀"

