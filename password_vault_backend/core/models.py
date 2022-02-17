from django.db import models


# Create your models here.
class BaseModel(models.Model):
    """
    Model to be inherited in entire application so that each row has these two
    required fields for analysis puropose.
    """

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
