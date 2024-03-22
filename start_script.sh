#!/bin/zsh


# start docker daemon

# Check if Docker Compose is installed
if ! [[ -x "$(command -v docker compose)" ]]; then
 echo 'Error: Docker Compose is not installed.' >&2
 exit 1
fi

# Check if Docker is installed
if ! [[ -x "$(command -v docker)" ]]; then
 echo 'Error: Docker is not installed.' >&2
 exit 1
fi

echo "Building the Docker containers"
docker compose build

echo "Starting Docker containers"
docker compose up
