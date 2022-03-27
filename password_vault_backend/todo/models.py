from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from core.models import BaseModel


class ToDo(BaseModel):
    """
      Model to store the todo list created by the users

      @author: Pooja Anandani <pooja.anandani@dal.ca>
      """

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True)
