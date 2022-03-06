from django.db import models
from django.contrib.auth.models import User
from core.models import BaseModel
# Create your models here.


class Verification(BaseModel):
    """
    Model to store the OTP verification upon forgot password

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    verification_code = models.IntegerField()
