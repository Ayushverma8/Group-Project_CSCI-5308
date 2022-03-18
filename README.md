
[![N|Solid](https://bit.ly/3saYbUd)]()
# Password Vault
## Developeed by: CSCI-5308 - Group-5

----
Installation
---
System requirements for backend

1. Python 3.6
2. MySQL

This is Django project, so probably you should run it inside virtual environment,
so that it won't affect your global dependencies. 

**Steps to start the project:** 
1. Clone this repo
2. Create virtual environment named `env` (so it will be ignored by git in commits)
3. Install the packages by `pip install -r requirements.txt`
4. Create database named `password_vault` in your local MySQL
5. Give your local MySQL Credentials in `config/dev/local_credentials.py` file. First time you need 
to create this file manually for your local. It's not included in git because everyone will be having different creds.
6. Run the migrations by `python3 manage.py migrate`
7. Start the server by `python3 manage.py runserver`

**NOTE: You might face few issues while installing mysql client library.**
