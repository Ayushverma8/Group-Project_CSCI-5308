import random
import string

from django.conf import settings
from django.test import TestCase

from .Aes import *
from .MatrixTranspositionCypher import MatrixTranspositionCypher

pivot = AESCipher(settings.AES_KEY)
string_to_be_encrypted = "Knock Knock! Encrypt this text please"
encrypted_string = pivot.encrypt(string_to_be_encrypted)


class AESCipherTestCase(TestCase):
    """
    Testing the serializer for Encryption
    @auhor: Shalin Awadiya <sh290595@dal.ca> and
    @author: Ayush Verma <ayush.verma@dal.ca>
    """

    def test_encryption_success(self):
        # Check weather the encrypted string has some content
        self.assertTrue(encrypted_string)

    def test_decryption_success(self):
        # Passing the encrypted content to the decryption function
        decrypted_message = pivot.decrypt(encrypted_string)
        self.assertEqual(decrypted_message, string_to_be_encrypted)

    def test_decryption_failure(self):
        # Passing the encrypted content to the decryption function
        decrypted_message = pivot.decrypt(encrypted_string)
        self.assertNotEqual(decrypted_message, "Some random string")

    def test_encryption_length(self):
        # Confirm if the encrypted results in 256 SHA hash
        self.assertNotEqual(len(encrypted_string) % 64, 0);

    def test_encryption_return_type(self):
        # Confirm if the encrypted ciphertext is in string and not in AES bytes
        returnError = False
        if isinstance(encrypted_string, bytes):
            returnError = True
        self.assertEqual(returnError, False)

    def test_decryption_return_type(self):
        # Confirm if the decrypted plaintext is in string and not in AES bytes
        decrypted_string = pivot.decrypt(encrypted_string)
        returnError = False
        if isinstance(decrypted_string, bytes):
            returnError = True
        self.assertEqual(returnError, False)


cipher_initializer=MatrixTranspositionCypher();
encryption_string="tvislo"
cipherText,remainder = cipher_initializer.encrypt(encryption_string,[int(x) for x in str(settings.MATRIX_KEY)]);




class MatrixTranspositionCipherTestCase(TestCase):
    """
    Determining working of encryption for Matrix Transposition Cipher

    @author: Shalin Awadiya <sh290595@dal.ca>

    """
    def test_matrix_transposition_encryption_success(self):
        "Determine if encryption success"
        self.assertTrue(cipherText);

    def test_matrix_transposition_decryption_success(self):
        "Determine if decryption success"
        decrypted_string=cipher_initializer.decrypt(cipherText,[int(x) for x in str(settings.MATRIX_KEY)])
        self.assertEqual(decrypted_string[:-remainder], encryption_string);

    def test_matrix_transposition_decryption_failure(self):
        "Determine if decryption results into a failure"
        decrypted_string=cipher_initializer.decrypt(cipherText,[int(x) for x in str(settings.MATRIX_KEY)])
        self.assertNotEqual(decrypted_string[:-remainder],"olsivt");


    def test_matrix_transposition_cipher_remainder(self):
        "Determine if remainder and cipher text are not of same length"
        self.assertNotEqual(cipherText,remainder);


    def test_matrix_transposition_cipher_remainder_length(self):
        "Determine if length of ciphertext and remainder are not same to ensure cipher success"
        self.assertNotEqual(len(cipherText),len(str(remainder)));



    def test_matrix_transposition_cipher_return_type(self):
        "Confirm if return type is in string and not in bytes"
        returnError=False
        if isinstance(cipherText, bytes):
            returnError=True
        self.assertEqual(returnError,False)

    def test_matrix_transposition_cipher_key_length(self):
        "Ensure that the remainder is always less than the length of the encryption string"
        noError=False
        if remainder<len(encryption_string):
            noError=True;
        self.assertEqual(noError,True);

