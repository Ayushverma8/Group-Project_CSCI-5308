from rest_framework import viewsets

from core.views import AuthRequiredView
from .models import ToDo
from .serializers import ToDoSerializer


class ToDoViewSet(AuthRequiredView, viewsets.ModelViewSet):
    """
       View to perform todo operation

       @author: Pooja Anandani <pooja.anandani@dal.ca>
       """
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def get_queryset(self):
        return super(ToDoViewSet, self).get_queryset() \
            .filter(created_by=self.request.user).order_by('priority')
