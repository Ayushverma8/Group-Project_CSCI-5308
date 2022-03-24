#!/bin/bash
cd /usr/share/nginx/html/ && find . ! -name '.env' -type f -exec rm -r {} +