from django.db import models

from core.models import BaseModel


# Create your models here.

class TestModel(BaseModel):
    demo = models.CharField(max_length=10)
