#!/bin/bash

set -e  # pysäytä jos virhe tulee

echo "Stopping and removing old containers..."
docker compose down

echo ""

# check if todo-frontend/dist not exist
if [ ! -d "./todo-frontend/dist" ]; then
  echo "No 'dist/' folder found in todo-frontend. Building frontend first..."
  cd todo-frontend
  npm install
  npm run build
  cd ..
else
  echo "'dist/' folder exists. No need to rebuild frontend."
fi

echo ""

echo "Building images..."
docker compose build --no-cache

echo ""

echo "Starting containers..."
docker compose up

