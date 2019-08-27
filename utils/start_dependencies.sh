#!/bin/bash
echo "Pulling most recent containers"
docker-compose pull

echo "Starting development containers"
docker-compose up -d

echo "Waiting for GraphQL server to be available..."
until $(curl --output /dev/null --silent --get http://localhost:3000); do
  sleep 5
done

echo "API now accepting connections"

echo "Generating most up to date typings from GraphQL"
npm run generate:graphql-typings

echo "GraphQL playground available: http://localhost:3000"
echo "Ready 🚀"

