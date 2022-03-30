# ![Password Vault](https://gcdnb.pbrd.co/images/NfA6svumiXXi.png)
[](SonarQubeURL) [![npm version](https://img.shields.io/badge/Powered%20by-SonarQube-brightgreen)](https://www.npmjs.com/package/@toast-ui/editor) [![license](https://img.shields.io/github/license/nhn/tui.editor.svg)]() [![](https://img.shields.io/badge/AWS-Codedeploy-green.svg)]()
> CSCI 5308 - Group Project - Password Vault
Screenshot here



## 🚩 Table of Contents

- [Dependencies](#-Dependencies)
- [Build Instructions](#-BuildInstructions)
- [Usage scenario](#-features)

## 📦 Dependencies

### Technology Stack

- **Backend** - Django Framework
- **Frontend** - ReactJS
- **Database** - MySQL
- **Cloud** - AWS



### Installation

System requirements for building on local system :

1. Python 3.6
2. MySQL
3. NodeJS

Once prerequisite requirements are satisfied, follow the steps:

1. Git clone the repository and checkout the master branch.
 ```sh
$ git clone https://git.cs.dal.ca/courses/2022-winter/csci-5308/group5
$ git checkout master
```

2. Activate virtual environment
 ```sh
$ virtualenv asdc-group5
$ source  asdc-group5/bin/activate
```

3. Install the requirements

  ```sh
$  pip install -r requirements.txt
```

4. Create a new .env file with contents present in .env.example
  ```sh
$  nano password_vault_backend/.env
```
5.  Add content from .env.example and paste it into .env. Make sure to keep this file in the correct path with no extra white spaces.

6. Run migrations from the root directory. This will populate your database with required tables and values.
```sh
$ python3 password_vault_backend/manage.py migrate
 ````
7. Finally, run the server with
 ```sh
$ python3 password_vault_backend/manage.py runserver
```
9. Open  `127.0.0.1:8080` to view the API specifications. 