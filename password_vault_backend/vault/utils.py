import string
import random

from .Aes import AESCipher
from .MatrixTranspositionCypher import MatrixTranspositionCypher


def password_encrypt(password):
    """
    The method that perform password encryption.

    @author: Shalin Awadiya <shalin.awadiya@dal.ca>
    """
    salt = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase) for i in range(6))
    plaintext = password + salt
    matrixTranspositionCypher = MatrixTranspositionCypher()
    cypherText, remainder = matrixTranspositionCypher.encrypt(salt, [2, 1, 3, 4])
    aes = AESCipher("password-vault")
    encrypted_text = aes.encrypt(plaintext)
    return encrypted_text, cypherText, remainder


def password_decrypt(encrypted_text, cypherText, remainder):
    """
    The method that performs password decryption.

    @author: Shalin Awadiya <shalin.awadiya@dal.ca>
    """
    aes = AESCipher("password-vault")
    matrixTranspositionCypher = MatrixTranspositionCypher()
    decrypted_text = aes.decrypt(encrypted_text)
    intermediate_salt = matrixTranspositionCypher.decrypt(cypherText, [2, 1, 3, 4])
    decrypted_salt = intermediate_salt[:-remainder]
    decrypted_password = decrypted_text[:len(decrypted_text) - len(decrypted_salt)]
    return decrypted_password
