This directory is responsible for Managing the overall workflow of the password vault including the password creation, retrieval,
updation and deletion along with the password encryption, decryption and exporting.

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

3) class LogDNACloudHandler():
   This class is responsible for logging the application activities on Cloud Platform.
   It has following methods to perform the tasks:
   a)def initiate_cloud_logging(self): This method uses environment information and generates logs for the application.


4) class MatrixTranspositionCypher():
   This class is responsible for a two layer transposition encryption mechanism to encrypt with a transposition cipher
   at the first level. It has following methods to perform individual tasks:
   a) def encrypt(self, plainText, key): This method forms the matrix with size of key columns using the plaintext and key provided.
   b) def decrypt(self, cypherText, key): This method tranverses the matrix in inverse order to get the plaintext from encrypted text.


5) class Vault(BaseModel):
   This class is responsible for determining the fields for the database model formation of the MySQL table
   responsible for storing the user's passwords.
   It has following methods to perform the tasks:
   a) def logo_url(self): This method is responsible for providing the url of the password's website
   b) def password_pwned(self): This method is responsible for checking if the password is compromised or not.
   c) def save(self, *args, **kwargs): This method is responsible for saving the password's cipher text and remainder.

6) class UserSerializer(ModelActionSerializer):
   This class is responsible for sharing user passwords.
   It has following methods to perform the tasks:
   a)def to_representation(self, instance): This method is responsible for sharing data in representation format.

7) class VaultSerializer(ModelActionSerializer):
   This class is responsible for validation, encryption and storage of user's passwords
   It has following method to perform the tasks:
   a)def create(self, validated_data): This method creates ORM(Object Relational Mapping ) vault model for storage of
   User's password.
   b)def update(self, instance, validated_data): This method is used to update the password vault instance.
   c)def set_shared_with(self, instance, shared_with_users): This method is used to create 'shared_with' objects.
   d)def to_representation(self, instance):This method converts ORM data to JSON object.
   e)def get_owner(self, instance): This method is used to confirm if the user is the owner.

8) class AESCipherTestCase(TestCase):
   This class is responsible for performing method level testing on the AES Cipher.

9) class MatrixTranspositionCipherTestCase(TestCase):
   This class is responsible for performing method level testing on the Matrix Transposition Cipher.

10) class VaultTest(TestCase):
    This class is responsible for performing method level testing on the final encryption and decryption.

11) class VaultViewSet(AuthRequiredView, viewsets.ModelViewSet):
    This class performs the API calls required for the CRUD operations.
    It has following methods to perform the tasks:
    a)def get_queryset(self): Display the passwords to the user.
    b)def create(self, request, *args, **kwargs): Create the user's information response.

12) class SharableUserView(AuthRequiredView, generics.ListAPIView):
    This class performs the API calls for sharable users on the platform. It has following methods to perform the task:
    a)def get_queryset(self): This method returns the users based on the query parameters passed.

13) class ExportViewSet(AuthRequiredView, APIView):
    This class is used to generate encrypted file with user password details. It has following methods to perform the tasks.
    a)def get(self, request, *args, **kwargs): This method is used to return base64 string of file and
    send the passwords in the same file.

14) File utils.py:
    This is the chief file responsible for performing two-factor encryption and decryption.Both the other encryption
    algorithms are called from this file.
    It has the following methods to perform the tasks:
    a)def password_encrypt(password): Performs two-level encryption using AES and Matrix Transposition Cipher
    b)def password_decrypt(encrypted_text, cypher_text, remainder): Performs two-level decryption to display the user's
    password
    c)def generate_secure_output(f): This method is used to write the user passwords in a pdf file.
    
    
    


