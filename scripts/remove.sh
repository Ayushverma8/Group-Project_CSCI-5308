#!/bin/bash
cd /usr/share/nginx/html/ && find . ! -name '.env.example' -type f -exec rm -r {} +