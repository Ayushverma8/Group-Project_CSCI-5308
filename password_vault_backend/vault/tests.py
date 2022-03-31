from django.conf import settings
from django.test import TestCase

from .Aes import *

pivot = AESCipher(settings.AES_KEY)
string_to_be_encrypted = "Knock Knock! Encrypt this text please"
encrypted_string = pivot.encrypt(string_to_be_encrypted)


class UserProfileAbstractSerializerTestCase(TestCase):
    """
    Testing the serializer for Encryption

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
