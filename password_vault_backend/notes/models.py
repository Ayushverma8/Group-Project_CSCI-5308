import uuid

from django.db import models
from core.models import BaseModel


class Note(BaseModel):
    """@author: Shalin Awadiya <shalin.awadiya@dal.ca>"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=50)
    text = models.CharField(max_length=500)

