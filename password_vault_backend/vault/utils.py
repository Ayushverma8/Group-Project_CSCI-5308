import string
import random

from django.conf import settings

from .Aes import AESCipher
from .MatrixTranspositionCypher import MatrixTranspositionCypher


matrix_transposition_cypher = MatrixTranspositionCypher()
aes = AESCipher(settings.AES_KEY)


def password_encrypt(password):
    """
    The method that perform password encryption.

    @author: Shalin Awadiya <shalin.awadiya@dal.ca>
    """

    salt = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase)
                   for i in range(6))
    plaintext = password + salt
    cypher_text, remainder = matrix_transposition_cypher\
        .encrypt(salt, [int(x) for x in str(settings.MATRIX_KEY)])

    encrypted_text = aes.encrypt(plaintext)

    return encrypted_text, cypher_text, remainder


def password_decrypt(encrypted_text, cypher_text, remainder):
    """
    The method that performs password decryption.

    @author: Shalin Awadiya <shalin.awadiya@dal.ca>
    """

    decrypted_text = aes.decrypt(encrypted_text)
    intermediate_salt = matrix_transposition_cypher\
        .decrypt(cypher_text, [int(x) for x in str(settings.MATRIX_KEY)])
    decrypted_salt = intermediate_salt[:-remainder]
    decrypted_password = \
        decrypted_text[:len(decrypted_text) - len(decrypted_salt)]

    return decrypted_password
