from hashlib import sha1
from django.db import models
from django.contrib.auth.models import User
from core.models import BaseModel


class VerifyInformation(BaseModel):
    """
    Model to store the OTP verification upon forgot password

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    verification_code = models.IntegerField()


class UserMpin(BaseModel):
    """
    Model to store the mpin

    @author: Manasvi Sharma <mn838732@dal.ca>
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mpin = models.CharField(max_length=255, null=False, blank=False)
    is_authenticated = models.BooleanField(default=False)

    @staticmethod
    def get_hash(data):
        """
        returns SHA1 hash for given data string.

        @author: Deep Adeshra<dp974154@dal.ca>
        """

        hash_object = sha1(data.encode('utf-8'))
        hash = hash_object.hexdigest()

        return hash

    def check_mpin(self, data):
        """
        checks current mpin is same as given data string or not.

        @author: Deep Adeshra<dp974154@dal.ca>
        """

        hash = UserMpin.get_hash(data)

        return hash == self.mpin

    def save(self, *args, **kwargs):
        """
        Override default save method to encrypt the user's MPIN

        @author: Manasvi Sharma <mn838732@dal.ca>
        """

        self.mpin = UserMpin.get_hash(self.mpin)

        return super().save(*args, **kwargs)

