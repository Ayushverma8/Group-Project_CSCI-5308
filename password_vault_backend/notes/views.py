from rest_framework import viewsets
from .models import Note
from .serializers import NoteSerializer


from core.views import AuthRequiredView


class NotesViewSet(AuthRequiredView, viewsets.ModelViewSet):
    """
    This view inherit ListCreateView that perform both get and post method.
    In get method it can provide the list of all the id's, whereas,
    in post it will insert the data

    @author: Shalin Awadiya <shalin.awadiya@dal.ca>
    """

    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        """
        Filters notes based on created by the users
        """

        return super(NotesViewSet, self).get_queryset()\
            .filter(created_by=self.request.user)
