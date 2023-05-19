#!/bin/sh

# stop on errors
set -ex

# start app
exec node dist/app.js