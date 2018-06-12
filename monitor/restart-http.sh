#!/bin/bash
echo "===================ps all http-server=================="
ps -ef|grep http-server
echo "==================kill all http-server================="
ps -ef | grep http-server | awk '{print $2}' | xargs kill -9
echo "==================show the kill result================="
ps -ef|grep http-server
echo "================restart the http-server================"
(http-server -c-1 &)

