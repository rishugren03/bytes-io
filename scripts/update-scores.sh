#!/bin/bash
# Ping the background sync API
curl -s -X GET http://localhost:3000/api/cron/update-scores >> "/home/rishu/Desktop/Bytes.io/logs/cron.log" 2>&1
echo " - $(date)" >> "/home/rishu/Desktop/Bytes.io/logs/cron.log"
