#!/bin/bash

# Get the PID of the process listening on port 3000
pid=$(lsof -i :3000 -t)

if [ -z "$pid" ]; then
  echo "No process found on port 3000."
else
  echo "Found process on port 3000 with PID: $pid"
  # Uncomment the next line when you're ready to kill the process
  # kill -9 $pid
fi
