from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Note
from .serializers import NoteSerializer


from core.views import AuthRequiredView


class NoteListAndCreate(generics.ListCreateAPIView, AuthRequiredView):
    """
    This view inherit ListCreateView that perform both get and post method.
    In get method it can provide the list of all the id's, whereas, in post it will insert the data

    @author: Shalin Awadiya <shalin.awadiya@dal.ca>

    """

    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class NoteDetail(generics.RetrieveUpdateDestroyAPIView, AuthRequiredView):
    """
    This view inherit RetrieveUpdateDestroyAPIView that perform methods like
    get, put and delete.

    @author: Shalin Awadiya <shalin.awadiya@dal.ca>

    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

