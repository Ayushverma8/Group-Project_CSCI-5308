from django.db import models
from core.models import BaseModel
from rest_framework.authtoken.admin import User


class Note(BaseModel):
    """
    Model to store the not created by the users

    @author: Shalin Awadiya <shalin.awadiya@dal.ca>
    """

    title = models.CharField(max_length=50)
    text = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, null=False, blank=False,
                                   on_delete=models.CASCADE)
