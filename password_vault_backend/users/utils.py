import random


def get_random_number(digits):
    """
    Returns random number based on passed digits

    @author: Deep Adeshra <dp974154@dal.ca>
    """

    start_range = int('1' * digits)
    end_range = int('9' * digits)

    return random.randint(start_range, end_range)
