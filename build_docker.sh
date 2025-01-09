#!/bin/bash

VERSION=$(grep -oP '(?<="version": ")[^"]*' package.json)
NAME=$(grep -oP '(?<="name": ")[^"]*' package.json)

docker build -t $NAME:$VERSION -t $NAME:latest .