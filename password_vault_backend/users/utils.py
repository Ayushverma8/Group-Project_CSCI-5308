import random
from hashlib import sha1


def get_random_number(digits):
    """
    Returns random number based on passed digits

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    start_range = int('1' * digits)
    end_range = int('9' * digits)

    return random.randint(start_range, end_range)


def get_hash(data):
    """
    returns SHA1 hash for given data string.

    @author: Deep Adeshra<dp974154@dal.ca>
    """

    data = str(data)
    hash_object = sha1(data.encode('utf-8'))
    hash = hash_object.hexdigest()

    return hash
