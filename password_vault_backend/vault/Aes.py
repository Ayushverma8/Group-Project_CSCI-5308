from Crypto.Cipher import AES
from Crypto import Random
import hashlib
from base64 import b64encode, b64decode
import environ

import logging
from logdna import LogDNAHandler
import os
from .logging import LogDNACloudHandler
logging_handler = LogDNACloudHandler()
log = logging_handler.initiate_cloud_logging()

class AESCipher:
    """
    Class which is responsible for Encryption and decryption of the password
    based on the key we have provided.
    """

    def __init__(self, key):
        """
        The key given to the algorithm can be of any length.
        There is no restriction on its size as we will get a fixed hash for that key
        to make the algorithm secure.

        @author: Shalin Awadiya <shalin.awadiya@dal.ca>
        """

        self.block_size = AES.block_size
        self.key = hashlib.sha256(key.encode()).digest()

    def encrypt(self, plain_text):
        """
        We will have to encrypt the plaintext along with the
        padded string so that it can be secured into the database.

        @author: Shalin Awadiya <shalin.awadiya@dal.ca>
        """

        padded_plain_text = self.__pad(plain_text)
        iv = Random.new().read(self.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        encrypted_text = cipher.encrypt(padded_plain_text.encode())
        encrypted_text_decoded = b64encode(iv + encrypted_text).decode("utf-8")
        log.info("Logging the text that needs to be encrypted")
        log.info(encrypted_text_decoded)
        return encrypted_text_decoded

    def decrypt(self, encrypted_text):
        """
        Before returning the password to the user it must be decrypted with the same key
        as AES is a symmetric key algorithm.

        @author: Shalin Awadiya <shalin.awadiya@dal.ca>
        """

        decoded_encrypted_text = b64decode(encrypted_text)
        iv = decoded_encrypted_text[:self.block_size]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        plain_text = cipher.decrypt(decoded_encrypted_text[self.block_size:]).decode("utf-8")
        plaintext_before_padding = self.__unpad(plain_text)
        log.info("Logging the text that needs to be decrypted")
        log.info(plaintext_before_padding)
        return plaintext_before_padding

    def __pad(self, plain_text):
        """
        Padding is performed so that the plaintext gets transformed into the
        block size required by the algorithm.

        @author: Shalin Awadiya <shalin.awadiya@dal.ca>
        """

        count_of_bytes_to_be_padded = self.block_size - len(plain_text) % self.block_size
        character_to_be_padded = chr(count_of_bytes_to_be_padded)
        padding_string = count_of_bytes_to_be_padded * character_to_be_padded
        plaintext_after_padding = plain_text + padding_string
        log.info(plaintext_after_padding)

        return plaintext_after_padding

    def __unpad(self, plain_text):
        """
        Before returning back the plaintext padded value must be
        removed as it was not the part of the original input.

        @author: Shalin Awadiya <shalin.awadiya@dal.ca>
        """

        character_to_be_unpadded = plain_text[len(plain_text) - 1:]
        count_of_bytes_to_be_removed = ord(character_to_be_unpadded)

        return plain_text[:-count_of_bytes_to_be_removed]
