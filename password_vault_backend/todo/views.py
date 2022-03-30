from re import A
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
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_queryset(self):
        PENDING = '1'
        COMPLETED = '2'

        query_params = self.request.query_params

        qs = super(ToDoViewSet, self).get_queryset()\
            .filter(created_by=self.request.user).order_by('priority')

        if query_params.get('status') == PENDING:
            qs = qs.filter(completed=False)
        elif query_params.get('status') == COMPLETED:
            qs = qs.filter(completed=True)

        return qs
