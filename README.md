# ![Password Vault](https://gcdnb.pbrd.co/images/NfA6svumiXXi.png)
[](SonarQubeURL) [![npm version](https://img.shields.io/badge/Powered%20by-SonarQube-brightgreen)](https://www.npmjs.com/package/@toast-ui/editor) [![license](https://img.shields.io/github/license/nhn/tui.editor.svg)]() [![](https://img.shields.io/badge/AWS-Codedeploy-green.svg)]()
> CSCI 5308 - Group Project - Password Vault
![enter image description here](https://i.imgur.com/wY1WJAq.png)



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
8. Open  `127.0.0.1:8080` to view the API specifications.

### Architecture

*ReactJS Frontend* -

![enter image description here](https://i.imgur.com/bFRLB8j.png)

**Backend Architecture** -

![enter image description here](https://i.imgur.com/gm93zde.png)

### Deployment Instructions

#### Cloud platform used : Amazon Web Services

1. AWS Elastic Compute Cloud (EC2)
2. AWS Simple Secure Storage (S3)
3. AWS CloudDeploy
4. AWS Cloudformation
5. AWS Virtual Private Cloud (VPC)

Start with AWS Cloudformation template present in the `deployment scripts/deploy_to_aws.template` by adding it to the cloudformation runner [here](https://us-east-1.console.aws.amazon.com/cloudformation/home?).

![enter image description here](https://i.imgur.com/cvzeYnr.png)

This will generate our technical stack on AWS which includes all above mentioned services.

![enter image description here](https://i.imgur.com/LIZBuI4.png)

Post that, you can navigate to the AWS Codedeploy page by clicking [here](https://us-east-1.console.aws.amazon.com/codesuite/codedeploy).  You can create a project with the configuration given below.

![enter image description here](https://i.imgur.com/jN2WQt1.png)

Once the deployment succeeds, you can open the URL in the web browser. 