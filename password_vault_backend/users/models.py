from django.db import models

# Create your models here.


class VerificationCode(models.Model):
    email = models.EmailField()
    verification_code = models.IntegerField()
