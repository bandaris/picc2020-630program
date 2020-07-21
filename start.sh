#!/bin/sh

nginx
nginx -s reload
tail -f /etc/nginx/logs/access.log
sleep 36500d