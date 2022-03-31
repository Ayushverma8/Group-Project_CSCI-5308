from django.db import models
from django.contrib.auth.models import User
from core.models import BaseModel


# Create your models here.


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
    encrypted_ciphertext = models.CharField(max_length=255, null=True, blank=True)
    encrypted_remainder = models.IntegerField(null=True, blank=True)


class Media(BaseModel):
    """
    Model to store profile picture of user

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.FileField(max_length=30, null=False, blank=False)
