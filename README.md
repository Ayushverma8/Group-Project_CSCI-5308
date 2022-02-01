
[![N|Solid](https://bit.ly/3saYbUd)]()
# Password Vault
## Developeed by: CSCI-5308 - Group-5

----
Installation
---
System requirements for backend

1. Python3
2. MySQL

This is Django project, so probably you should run it inside virtual environment so that it won't affect your global dependecies. 

steps to start the project 
1. Clone this repo
2. Create virtual environment named `env` (so it will be ignored by git in commits)
3. install the required packages by `pip install -r requirements.txt`
4. Create database named `Password_vault` in your local MySQL
5. Give your MySQL Credentials in config/dev/local_credentials.py file (first time you need to create this file manually for your local. Its not includede in git because everyone will be having different creds)
6. run the migrations by `python3 manage.py migrate`
7. start the server by `python3 manage.py runserver`

NOTE: You might face the errors to setup mysql