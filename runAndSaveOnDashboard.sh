#!/usr/bin/env bash

# Export env vars
export $(grep -v '^#' .env | xargs)

yarn cypress run --record --key ${CYPRESS_RECORD_KEY} --tag ${ENVIRONMENT}