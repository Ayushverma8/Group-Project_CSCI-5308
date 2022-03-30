from django.contrib.auth.models import User
from django.db import models

from core.models import BaseModel


class Vault(BaseModel):
    """
    Model to store the website specific password created by the users

    @author: Pooja Anandani <pooja.anandani@dal.ca>
    """

    website = models.URLField(max_length=250, null=False, blank=False)
    password = models.TextField(blank=False, null=False)
    encrypted_ciphertext = models.CharField(max_length=255, null=True, blank=True)
    encrypted_remainder = models.IntegerField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
