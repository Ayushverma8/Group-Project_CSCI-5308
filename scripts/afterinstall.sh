#!/bin/bash
chmod -R 777 /usr/share/nginx/html/
cd /usr/share/nginx/html/
virtualenv asdc-group5
source asdc-group5/bin/activate
pip install -r requirements
python3 password_vault_backend/manage.py  collectstatic --noinput
nohup python3 password_vault_backend/manage.py runserver 0.0.0.0:8000  >/dev/null 2>&1 &