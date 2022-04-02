This directory is responsible for Managing the overall workflow of the password vault including the password creation, retrieval,
updation and deletion along with the password encryption and decryption.

Description of working of each of the Classes and Methods in this directory(along with file utils.py) is provided as below:

1) class AESCipher():
   The class implements AES cipher to encrypt and decrypt the passwords.It has following methods to perform the tasks:
   a) def __init__(self, key): This method initializes the block size of the cipher
   b) def encrypt(self, plain_text): This method converts the plaintext to bytes and encrypts it.
   c) def decrypt(self, encrypted_text): This method converts the byte stream to string text and decrypts it.
   d) def __pad(self, plain_text): This method performs padding to make the plaintext in the size required by the cipher.
   e) def __unpad(self, plain_text): This method unpads the decrypted cyphertext to remove padding bits.


2) class VaultConfig(AppConfig):
   The class initializes a vault model for the Application Configuration Object.


3) class MatrixTranspositionCypher():
   This class is responsible for a two layer transposition encryption mechanism to encrypt with a transposition cipher
   at the first level. It has following methods to perform individual tasks:
   a) def encrypt(self, plainText, key): This method forms the matrix with size of key columns using the plaintext and key provided.
   b) def decrypt(self, cypherText, key): This method tranverses the matrix in inverse order to get the plaintext from encrypted text.


4) class Vault(BaseModel):
   This class is responsible for determining the fields for the database model formation of the MySQL table
   responsible for storing the user's passwords.
   It has following methods to perform the tasks:
   a) def logo_url(self): This method is responsible for providing the url of the password's website
   b) def save(self, *args, **kwargs): This method is responsible for saving the password's cipher text and remainder.


5) class VaultSerializer(ModelActionSerializer):
   This class is responsible for validation, encryption and storage of user's passwords
   It has following method to perform the tasks:
   a)def create(self, validated_data): This method creates ORM(Object Relational Mapping ) vault model for storage of
   User's password.

6) class AESCipherTestCase(TestCase):
   This class is responsible for performing method level testing on the AES Cipher.

7) class VaultViewSet(AuthRequiredView, viewsets.ModelViewSet):
   This class performs the API calls required for the CRUD operations.
   It has following methods to perform the tasks:
   a)def retrieve(self, request, *args, **kwargs): Display the passwords to the user.
   b)def create(self, request, *args, **kwargs): Create the user's information response.

8) File utils.py:
   This is the chief file responsible for performing two-factor encryption and decryption.Both the other encryption
   algorithms are called from this file.
   It has the following methods to perform the tasks:
   a)def password_encrypt(password): Performs two-level encryption using AES and Matrix Transposition Cipher
   b)def password_decrypt(encrypted_text, cypher_text, remainder): Performs two-level decryption to display the user's
   password
    
    
    

